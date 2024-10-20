import React, { useEffect, useRef, useState } from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, Modal, Animated} from 'react-native';
import {theme} from "@assets/Theme";
import "@ethersproject/shims";
import {ethers} from "ethers";
import { TouchableOpacity } from "react-native-gesture-handler";

import { GroupCall } from "@utils/GroupService";

/*// 배포 서버 연결
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

const ledgerContractAddress = "0x7C16D9c5db44302a9b0aed4066EB4Aa77FA59f6d"
const ledgerContractABI = [
    "event TransactionCreated(string indexed hGroupId, string groupId, uint256 transactionIndex, bool isDeposit, uint256 amount, string counterparty, string description, uint256 timestamp, string receiptDetails)",
    "event RetrieveBalance(string indexed hGroupId, string groupId, uint256 balance)",
    "function createGroup(string memory _groupId, string memory _name)",
    "function recordDeposit(string memory _groupId, uint256 _amount, string memory _counterparty, string memory _description)",
    "function recordWithdrawal(string memory _groupId, uint256 _amount, string memory _counterparty, string memory _description)",
    "function updateReceiptDetails(string memory _groupId, uint256 _transactionIndex, string memory _receiptDetails)"
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
}*/

//사진 띄우기용 모달
function ReceiptOverlay({overlayVisible, animatedHeight, closeModal, imageuri}){
  
    return(
      <Modal
        transparent={true}
        visible={overlayVisible}
        animationType="None"
        onRequestClose={closeModal}
      >
        <TouchableOpacity onPress={closeModal} activeOpacity={1} style={styles.overlayBackground}>
          <Animated.View style={styles.overlayContainer}>
            <View style={styles.overlayHeaderContainer}>
              <View style={styles.overlayHeaderTextContainer}>
                <Text style={styles.overlayHeaderText}>증빙용 영수증</Text>
              </View>
                
              <TouchableOpacity onPress={closeModal} >
                <Image source={require("@assets/Icons/closeIcon.png")}
                  style={styles.overlayHeaderIcon}
                  />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.quitOverlayContainer}>
              <Image source={require("@assets/Images/Guinguin_Sad.png")}
                style={styles.quitOverlayImage}/>
              <Text style={styles.quitOverlayMainText}>정말 삭제하시겠어요?</Text>
              <Text style={styles.quitOverlayDetailText}>더 즐거운 모임 활동이 당신을 기다려요</Text>
            </View>
            <TouchableOpacity onPress={closeModal}
              style={styles.maintainBtn}>
              <Text style={styles.maintainBtnText}>모임 유지하기</Text>
            </TouchableOpacity>
            <View style={styles.quitBtnContainer}>
              <TouchableOpacity style={styles.quitBtn}
                onPress={()=>navigation.navigate('ConfirmPW')}>
                <Text style={styles.quitBtnText}>모임 삭제하기</Text>
              </TouchableOpacity>
            </View>             */}
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Image
                    source={{ uri: imageuri }}
                    style={styles.receiptImage}
                    resizeMode="contain"
                />
            </View>
            
          </Animated.View>
        </TouchableOpacity>
  
      </Modal>
    )
  }

function Ledger2({navigation}){
    const [balance, setBalance]=useState(0);
    const [datas,setDatas]=useState([]);
    const [transactionIdx, setTransactionIdx] = useState(0);

    //dummy auth
    const [auth, setAuth]=useState("Manager");

    //영수증 사진용 모달
    const [receiptOverlayVisible, setReceiptOverlayVisible]=useState(false);
    const animatedHeight=useRef(new Animated.Value(0)).current;
    const [receiptImageUri, setReceiptImageUri]= useState("")

    const openReceiptModal=({uri})=>{
        setReceiptOverlayVisible(true);
        setReceiptImageUri(uri);
        Animated.timing(animatedHeight, {
            toValue: 500, // 모달의 높이
            duration: 0, // 애니메이션 지속 시간
            useNativeDriver: false
        }).start();
    };
  
    const closeReceiptModal = () => {
      Animated.timing(animatedHeight, {
        toValue: 500,
        duration: 0,
        useNativeDriver: false
      }).start(() => setReceiptOverlayVisible(false));
    };

    /*useEffect(() => {
        const initialize = async () => {
            // 임시 지갑 생성 및 트랜잭션 전송
            const tempWallet = ethers.Wallet.createRandom();
            const senderWallet = new ethers.Wallet("0xfe6f622f37ad5ed4d3da49682069f27976afe19d9b53b98189a16f74ee3b151b", provider);
            const tx = {
                to: tempWallet.address,
                value: ethers.parseEther("1.0")
            };
            try {
                const txResponse = await senderWallet.sendTransaction(tx);
                await txResponse.wait();
                console.log(`Transaction hash: ${txResponse.hash}`);
            } catch (error) {
                console.error("Transaction failed:", error);
            }

            // 이전 거래내역 데이터 가져오기
            getPastEvents("testuuid")
                .then(response => {
                    setDatas(response.reverse());
                });
        };

        initialize();
    }, []);

    // 거래내역 데이터가 변할 때마다 잔액 다시 조회
    useEffect(() => {
        getBalance("testuuid")
            .then(response => {
                console.log(response)
                setBalance(Number(response[0].args[2]))
            })
            .catch(err => {
                console.log(err)
            })
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
    });*/

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
                                        {/* <Image
                                            source= {data.args[8]==="" ? require("../assets/Icons/receiptCheckIcon_Inactive.png")
                                                :require("../assets/Icons/receiptCheckIcon_Active.png")
                                            }
                                            style={styles.iconStyle}
                                        /> */}
                                        {data.args[8]==="" ? 
                                        (auth === "user" ? 
                                          <Image source={require("../assets/Icons/receiptCheckIcon_Inactive.png")} style={styles.iconStyle}/> 
                                          : <View style={{flexDirection:'row'}}>
                                              <Image source={require("../assets/Icons/receiptCheckIcon_Inactive.png")} style={styles.iconStyle}/>
                                              <TouchableOpacity onPress={()=>navigation.navigate('AddReceipt', navigation={navigation})}>
                                                <Image source={require("@assets/Icons/addsquareIcon.png")} style={styles.iconStyle}/>
                                              </TouchableOpacity>
                                            </View>
                                        )
                                        : <TouchableOpacity onPress={()=>openReceiptModal(data.args[8])}>
                                            <Image source={require("../assets/Icons/receiptCheckIcon_Active.png")} style={styles.iconStyle}/>
                                        </TouchableOpacity>

                                        }

                                    </View>
                                    
                                </View>
                            </View>
                        )
                    )
                }
            </View>
            
            <ReceiptOverlay overlayVisible={receiptOverlayVisible}  animatedHeight={animatedHeight} closeModal={closeReceiptModal} imageuri={receiptImageUri}/>
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
    overlayBackground:{
        flex:1, 
        justifyContent: 'flex-end', // 하단 정렬
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
      overlayContainer:{
        backgroundColor:theme.color.white,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        paddingHorizontal:15*theme.width,
        paddingBottom:50*theme.height,
        //justifyContent:'center',
        //alignItems:'center'
        //height:600*theme.height
      },
      overlayHeaderContainer:{
        flexDirection:'row',
        marginBottom:7*theme.height,
        height:68*theme.height,
        justifyContent:'space-between',
        //backgroundColor:'red'
      },
      overlayHeaderTextContainer:{
        flex:1,
        justifyContent:'center',
        marginLeft:24*theme.width,
        alignItems:'center',
        //backgroundColor:'blue'
      },
      overlayHeaderText:{
        //justifyContent:'center'
        fontSize:theme.fontSizes.fontSizes20,
        fontFamily:"Pretendard-SemiBold",
        color:theme.color.black,
      },
      overlayHeaderIcon:{
        height:24*theme.height*theme.width,
        width:24*theme.width*theme.height,
        marginTop:15*theme.height,
      },
      receiptImage:{
        width:300*theme.width,
      }
  
})

export default Ledger2;