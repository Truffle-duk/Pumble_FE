import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {theme} from "@assets/Theme";
import "@ethersproject/shims";
import {ethers} from "ethers";
import {response} from "../../.yarn/releases/yarn-1.22.22";
import dotenv from "dotenv"

dotenv.config()

// 배포 서버 연결
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

/*//함수 호출을 위한 지갑 발급(추후 RN_keychain에 있는 걸로 변경)
const tempWallet = ethers.Wallet.createRandom();
const senderWallet = new ethers.Wallet(process.env.senderAddr, provider);
const tx = {
    to: tempWallet.address,
    value: ethers.parseEther("1.0")
};
const txResponse = await senderWallet.sendTransaction(tx);
await txResponse.wait();
console.log(`Transaction hash: ${txResponse.hash}`);
const connectedWallet = tempWallet.connect(provider);*/

const ledgerContractAddress = process.env.ledgerContractAddr
const ledgerContractABI = [
    "event TransactionCreated(string indexed hGroupId, string groupId, uint256 transactionIndex, bool isDeposit, uint256 amount, string counterparty, string description, uint256 indexed timestamp, string receiptDetails)",
    "event RetrieveBalance(string indexed hGroupId, string groupId, uint256 balance)",
    "function createGroup(string _groupId, string _name)",
    "function recordDeposit(string _groupId, uint256 _amount, string _counterparty, string _description)",
    "function recordWithdrawal(string _groupId, uint256 _amount, string _counterparty, string _description)",
    "function updateReceiptDetails(string _groupId, uint256 _transactionIndex, string _receiptDetails)",
    "function getGroupBalance(string _groupId)"
];
const ledgerContract = new ethers.Contract(ledgerContractAddress, ledgerContractABI, provider)

async function getBalance(groupId) {
    const hGroupIdHash = ethers.id(groupId); // keccak256 해시

    // 필터 설정
    const filter = {
        address: ledgerContractAddress,
        fromBlock: 'latest',
        toBlock: 'latest',
        topics: [
            ethers.id("RetrieveBalance(string,string,uint256)"), // 이벤트 시그니처
            hGroupIdHash
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(ledgerContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching getBalance events:", error);
        throw error;
    }
}

async function getPastEvents(groupId) {
    const hGroupIdHash = ethers.id(groupId); // keccak256 해시

    // 필터 설정
    const filter = {
        address: ledgerContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("TransactionCreated(string,string,uint256,bool,uint256,string,string,uint256,string)"), // 이벤트 시그니처
            hGroupIdHash
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(ledgerContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching past events:", error);
        throw error;
    }
}

function Ledger2(){
    const [balance, setBalance]=useState(0);
    const [datas,setDatas]=useState([]);
    const [transactionIdx, setTransactionIdx] = useState();

    // 초기화
    useEffect(()=>{
        // 이전 거래내역 데이터 가져오기
        //TODO: 날짜 범위 필터링 필요
        getPastEvents("testuuid")
            .then(response => {
                setDatas(response.reverse())
            })
    },[])

    // 거래내역 데이터가 변할 때마다 잔액 다시 조회
    useEffect(() => {
        getBalance("testuuid")
            .then(response => setBalance(Number(response[0].args[2])))
    }, [datas]);

    ledgerContract.on("TransactionCreated", (hGroupId, groupId, transactionIndex, isDeposit, amount, counterparty, description, timestamp, receiptDetails, event) => {
        console.log(event)
        setTransactionIdx(transactionIndex)
        setDatas(prevState => {
            const eventExists = prevState.some(data => data.args[2].toString() === transactionIndex.toString());
            if (!eventExists) {
                return [{"args": [hGroupId, groupId, transactionIndex, isDeposit, amount, counterparty, description, timestamp, receiptDetails]}, ...prevState];
            }
            return prevState;
        });
    });

    const formatDateForTop = (bigintDate) => {
        const recordDate = new Date(Number(bigintDate)*1000)
        let month, date;

        if (recordDate.getMonth() + 1 < 10) {
            month = `0${recordDate.getMonth() + 1}`
        } else {
            month = `${recordDate.getMonth() + 1}`
        }

        if (recordDate.getDate() < 10) {
            date = `0${recordDate.getDate()}`
        } else {
            date = `${recordDate.getDate()}`
        }

        return `${month}월 ${date}일`
    }

    const formatDateForBottom = (bigintDate) => {
        const recordDate = new Date(Number(bigintDate)*1000)
        let hour, minute;

        if (recordDate.getHours() < 10) {
            hour = `0${recordDate.getHours()}`
        } else {
            hour = `${recordDate.getHours()}`
        }

        if (recordDate.getMinutes() < 10) {
            minute = `0${recordDate.getMinutes()}`
        } else {
            minute = `${recordDate.getMinutes()}`
        }

        return `${hour}:${minute}`
    }

    return (
        <ScrollView contentContainerStyle={styles.background}>
            <Text>{"\n"}    새로 추가된 트랜잭션의 Index: {Number(transactionIdx)}</Text>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceHeadText}>공금 잔액</Text>
                <Text style={styles.ledgerText}>{balance.toLocaleString()}원</Text>
            </View>
            <View style={styles.transactionHistoryContainer}>
                <View style={styles.transactionHistoryHeaderContainer}>
                    <Text style={styles.transactionHistoryHeaderText}>상세 내역</Text>
                    <Text style={styles.transactionHistoryFilterText}>1개월</Text>
                </View>
                
                {
                    datas.length===0?(
                        <View style={styles.activityIndicatorView}>
                            <ActivityIndicator color={theme.color.grey1} size="large"/>
                        </View>
                    ):(
                        datas.map((data, index)=>
                            <View key={index} style={styles.historyItemContainer}>
                                <Text style={styles.historyItemDateText}>{formatDateForTop(data.args[7])}</Text>
                                <View style={styles.historyItemDetailContainer}>
                                    {/* 이미지 삽입 */}
                                    <View style={styles.historyItemViewDetail}>
                                        <View style={styles.historyItemImage}/> 
                                        <View>
                                            <Text style={styles.counterpartyText}>{data.args[5]}</Text>
                                            <Text style={styles.timeText}>{formatDateForBottom(data.args[7])}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.historyItemViewDetail}>
                                        {data.args[3]? <Text style={styles.amountText}>{Number(data.args[4]).toLocaleString()}원</Text>
                                            : <Text style={styles.amountText}>-{Number(data.args[4]).toLocaleString()}원</Text>}
                                        {/* 영수증디테일이 빈 문자열이면 체크 아이콘 회색,아니면 메인컬러 */}
                                        {/* {data.receiptDetails===""?<Image />} */}
                                        <Image
                                            source= {data.args[8]==="" ? require("../assets/Icons/receiptCheckIcon_Inactive.png")
                                                :require("../assets/Icons/receiptCheckIcon_Active.png")
                                            }
                                            style={styles.iconStyle}
                                        />
                                    </View>
                                    
                                </View>
                            </View>
                        )
                    )
                }
            </View>
            

        </ScrollView>
        
        );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor:theme.color.background,
        paddingBottom:77*theme.height
    },
    balanceHeadText:{
        color:theme.color.main,
        fontSize:theme.fontSizes.fontSizes20,
        fontFamily:'Pretendard-SemiBold',
        marginLeft:15*theme.width,
        marginTop:18*theme.height,
        marginBottom:5*theme.height,
        lineHeight:22*theme.height,
    },
    ledgerText:{
        fontFamily:'Pretendard-ExtraBold',
        fontSize:theme.fontSizes.fontSizes20,
        color: theme.color.grey2,
        marginLeft:15*theme.width,
        marginBottom:18*theme.height,
        marginTop:5*theme.height,
        lineHeight:22*theme.height,
    },
    balanceContainer:{
        backgroundColor:theme.color.white,
        marginHorizontal:16*theme.width,
        marginVertical:30*theme.height,
        height:90*theme.height,
        borderRadius:15,
        flexDirection:'column',
        justifyContent:'center'
    },
    transactionHistoryContainer:{
        backgroundColor:theme.color.white,
        marginHorizontal:16*theme.width,
        marginBottom:30*theme.height,
        paddingBottom:15*theme.height,
        borderRadius:15,
    },
    transactionHistoryHeaderContainer:{
        flexDirection:'row',
        marginHorizontal:15*theme.width,
        marginTop:15*theme.height,
        alignItems:'center',
        justifyContent:'space-between'
    },
    transactionHistoryHeaderText:{
        color:theme.color.main,
        fontSize:theme.fontSizes.fontSizes20,
        fontFamily:'Pretendard-SemiBold',
    },
    transactionHistoryFilterText:{
        color:theme.color.grey10,
        fontSize:theme.fontSizes.fontSizes12,
        fontFamily:'Pretendard-Medium',
    },
    iconStyle:{
        width:22*theme.width*theme.height,
        height:22*theme.height*theme.width,
        marginLeft:15*theme.width,
    },
    activityIndicatorView:{
        height:200*theme.height,
        justifyContent:"center"
    },
    historyItemContainer:{
        flexDirection:'column',
        marginHorizontal:15*theme.width,
        marginTop:15*theme.height
    },
    historyItemDateText:{
        fontFamily:'Pretendard-Regular',
        fontSize:theme.fontSizes.fontSizes12,
        color:theme.color.grey10,
    },
    historyItemImage:{
        height:50*theme.width*theme.height,
        width:50*theme.width*theme.height,
        backgroundColor:theme.color.background,
        borderRadius:100,
        marginRight:10*theme.width,
    },
    historyItemDetailContainer:{
        flexDirection:'row',
        marginTop:15*theme.height,
        justifyContent:"space-between",
        alignItems:'center',
    },
    historyItemViewDetail:{
        flexDirection:"row",
        alignItems:'center',
    },
    counterpartyText:{
        fontFamily:"Pretendard-Medium",
        fontSize:theme.fontSizes.fontSizes15,
        color:theme.color.grey2,
        lineHeight:22*theme.height,
    },
    timeText:{
        fontFamily:"Pretendard-Regular",
        fontSize:theme.fontSizes.fontSizes12,
        color:theme.color.grey10,
        lineHeight:22*theme.height,
    },
    amountText:{
        fontFamily:"Pretendard-Medium",
        fontSize:theme.fontSizes.fontSizes15,
        color:theme.color.grey2,
    },
  
})

export default Ledger2;