import React, {useCallback, useEffect, useRef, useState} from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, Modal, Animated} from 'react-native';
import {theme} from "@assets/Theme";
import "@ethersproject/shims";
import {getBalance, getPastEvents, ledgerContract} from "@utils/BlockchainFunction";
import {TouchableOpacity} from "react-native-gesture-handler";

import {GroupCall} from "@utils/GroupService";
import {useFocusEffect} from "@react-navigation/native";
import {UUID} from '@env'


//사진 띄우기용 모달
function ReceiptOverlay({overlayVisible, animatedHeight, closeModal, imageuri}) {
    return (
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

                        <TouchableOpacity onPress={closeModal}>
                            <Image source={require("@assets/Icons/closeIcon.png")}
                                   style={styles.overlayHeaderIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={{uri: `${imageuri}`}}
                            style={styles.receiptImage}
                        />
                    </View>

                </Animated.View>
            </TouchableOpacity>
        </Modal>
    )
}

function Ledger2({navigation}) {
    const [balance, setBalance] = useState(0);
    const [datas, setDatas] = useState([]);
    const [transactionIdx, setTransactionIdx] = useState(0);

    //dummy auth
    const [auth, setAuth] = useState("member");

    //영수증 사진용 모달
    const [receiptOverlayVisible, setReceiptOverlayVisible] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const [receiptImageUri, setReceiptImageUri] = useState("")

    const openReceiptModal = (uri) => {
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

    const initialize = async () => {
        // 임시 지갑 생성 및 트랜잭션 전송
        /*const tempWallet = ethers.Wallet.createRandom();
        const senderWallet = new ethers.Wallet("0x5d225315bb68e16f4345c24697c374bcd426afcad3dfb6ec0e6d4087eddffef8", provider);
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
        }*/

        // 이전 거래내역 데이터 가져오기
        getPastEvents(UUID)
            .then(response => {
                const filteredData = response.reduce((acc, item) => {
                    const transactionIndex = item.args[3]; // args[3]이 트랜잭션 인덱스
                    const existingIndex = acc.findIndex(existingItem => existingItem.args[3] === transactionIndex);

                    if (existingIndex === -1) {
                        // acc에 해당 transactionIndex가 없으면 추가
                        console.log(item)
                        acc.push(item);
                    } else if (item.args[9] !== "" && acc[existingIndex].args[9] === "") {
                        // 기존 요소의 args[9]가 비어 있고 현재 item의 args[9]가 비어 있지 않으면 교체
                        acc[existingIndex] = item;
                    }

                    return acc;
                }, []);
                setDatas(filteredData.reverse());
            });
    };
    const fetchAuth = async () => {
        try {
            const userauth = await GroupCall('GAUTH')
            setAuth(userauth);
        } catch (err) {
            console.log("something wrong on fetch user auth", err)
        }
    }

    useFocusEffect(
        useCallback(() => {
            initialize().then(_ => {
                console.log("Ledger Initialize")
            })
            fetchAuth();
        }, [])
    )

    // 거래내역 데이터가 변할 때마다 잔액 다시 조회
    useEffect(() => {
        getBalance(UUID)
            .then(response => {
                setBalance(Number(response[response.length - 1].args[3]).toLocaleString())
            })
            .catch(err => {
                console.log(err)
            })
    }, [datas]);

    ledgerContract.on("TransactionCreated", (hGroupId, category, groupId, transactionIndex, isDeposit, amount, counterparty, description, timestamp, receiptDetails, event) => {
        setTransactionIdx(transactionIndex)
        setDatas(prevState => {
            const eventExists = prevState.find(data => data.args[3].toString() === transactionIndex.toString());
            if (!eventExists) {
                return [{"args": [hGroupId, category, groupId, transactionIndex, isDeposit, amount, counterparty, description, timestamp, receiptDetails]}, ...prevState];
            }
            return prevState;
        });
    });

    const formatDateForTop = (bigintDate) => {
        const recordDate = new Date(Number(bigintDate) * 1000)
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
        const recordDate = new Date(Number(bigintDate) * 1000)
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

    const renderReceiptView = (auth, info) => {
        if (info.receiptUrl === "" && auth === 'member') { // 영수증 X, 일반 유저
            return (
                <Image
                    source={require("../assets/Icons/receiptCheckIcon_Inactive.png")}
                    style={styles.iconStyle}
                />
            )
        } else if (info.receiptUrl === "" && auth !== 'member') { // 영수증 X, 운영진 이상
            return (
                <View style={{flexDirection: 'row'}}>
                    <Image
                        source={require("../assets/Icons/receiptCheckIcon_Inactive.png")}
                        style={styles.iconStyle}/>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddReceipt', {
                            transactionInfo: JSON.stringify(info)
                        })}>
                        <Image source={require("@assets/Icons/addsquareIcon.png")}
                               style={styles.iconStyle}/>
                    </TouchableOpacity>
                </View>
            )
        } else if (info.receiptUrl !== "" && auth === 'member') { // 영수증 O, 일반 유저
            return (
                <TouchableOpacity onPress={() => openReceiptModal(info)}>
                    <Image
                        source={require("../assets/Icons/receiptCheckIcon_Active.png")}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
            )
        } else { // 영수증 O, 운영진 이상
            return (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => openReceiptModal(info.receiptUrl)}>
                        <Image
                            source={require("../assets/Icons/receiptCheckIcon_Active.png")}
                            style={styles.iconStyle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddReceipt', {
                            transactionInfo: JSON.stringify(info)
                        })}>
                        <Image source={require("@assets/Icons/addsquareIcon.png")}
                               style={styles.iconStyle}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View style={styles.background2}>
            <ScrollView contentContainerStyle={styles.background}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceHeadText}>공금 잔액</Text>
                    <Text style={styles.ledgerText}>{balance.toLocaleString()}원</Text>
                </View>
                <View style={styles.transactionHistoryContainer}>
                    <View style={styles.transactionHistoryHeaderContainer}>
                        <Text style={styles.transactionHistoryHeaderText}>상세 내역</Text>
                    </View>

                    {
                        datas.length === 0 ? (
                            <View style={styles.activityIndicatorView}>
                                <ActivityIndicator color={theme.color.grey1} size="large"/>
                            </View>
                        ) : (
                            datas.map((data, index) => {
                                    let amount = data.args[4] ? Number(data.args[5]) : -1 * Number(data.args[5])
                                    const transactionInfo = {
                                        transactionIdx: data.args[3].toString(),
                                        counterparty: data.args[6],
                                        description: data.args[7],
                                        date: data.args[8].toString(),
                                        amount: amount,
                                        receiptUrl: data.args[9]
                                    }
                                    return (
                                        <View key={index} style={styles.historyItemContainer}>
                                            <Text
                                                style={styles.historyItemDateText}>{formatDateForTop(transactionInfo.date)}</Text>
                                            <View style={styles.historyItemDetailContainer}>
                                                <View style={styles.historyItemViewDetail}>
                                                    <View style={styles.historyItemImage}>
                                                        <Image source={
                                                            index % 6 === 0
                                                                ? require('@assets/Icons/ledgerIcon1.png')
                                                                : index % 6 === 1
                                                                    ? require('@assets/Icons/ledgerIcon2.png')
                                                                    : index % 6 === 2
                                                                        ? require('@assets/Icons/ledgerIcon3.png')
                                                                        : index % 6 === 3
                                                                            ? require('@assets/Icons/ledgerIcon4.png')
                                                                            : index % 6 === 4
                                                                                ? require('@assets/Icons/ledgerIcon5.png')
                                                                                : require('@assets/Icons/ledgerIcon6.png')
                                                        } style={styles.historyItemIcon}/>
                                                    </View>
                                                    <View>
                                                        <Text
                                                            style={styles.counterpartyText}>{transactionInfo.counterparty}</Text>
                                                        <Text
                                                            style={styles.timeText}>{formatDateForBottom(transactionInfo.date)}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.detailContainer}>
                                                    <Text style={styles.amountText}>{`${amount.toLocaleString()}원`}</Text>
                                                    {renderReceiptView(auth, transactionInfo)}
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            )
                        )
                    }
                </View>
            </ScrollView>
            <ReceiptOverlay overlayVisible={receiptOverlayVisible} animatedHeight={animatedHeight}
                            closeModal={closeReceiptModal} imageuri={receiptImageUri}/>
        </View>

    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.color.background,
        paddingBottom: 77 * theme.height
    },
    background2: {
        flex: 1,
        backgroundColor: theme.color.background,
        paddingBottom: 77 * theme.height
    },
    balanceHeadText: {
        color: theme.color.main,
        fontSize: theme.fontSizes.fontSizes20,
        fontFamily: 'Pretendard-SemiBold',
        marginLeft: 15 * theme.width,
        marginTop: 18 * theme.height,
        marginBottom: 5 * theme.height,
        lineHeight: 22 * theme.height,
    },
    ledgerText: {
        fontFamily: 'Pretendard-ExtraBold',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.grey2,
        marginLeft: 15 * theme.width,
        marginBottom: 18 * theme.height,
        marginTop: 5 * theme.height,
        lineHeight: 22 * theme.height,
    },
    balanceContainer: {
        backgroundColor: theme.color.white,
        marginHorizontal: 16 * theme.width,
        marginVertical: 30 * theme.height,
        height: 90 * theme.height,
        borderRadius: 15,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    transactionHistoryContainer: {
        backgroundColor: theme.color.white,
        marginHorizontal: 16 * theme.width,
        marginBottom: 30 * theme.height,
        paddingBottom: 15 * theme.height,
        borderRadius: 15,
    },
    transactionHistoryHeaderContainer: {
        flexDirection: 'row',
        marginHorizontal: 15 * theme.width,
        marginTop: 15 * theme.height,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    transactionHistoryHeaderText: {
        color: theme.color.main,
        fontSize: theme.fontSizes.fontSizes20,
        fontFamily: 'Pretendard-SemiBold',
    },
    transactionHistoryFilterText: {
        color: theme.color.grey10,
        fontSize: theme.fontSizes.fontSizes12,
        fontFamily: 'Pretendard-Medium',
    },
    iconStyle: {
        width: 22 * theme.width * theme.height,
        height: 22 * theme.height * theme.width,
        marginLeft: 15 * theme.width,
    },
    activityIndicatorView: {
        height: 200 * theme.height,
        justifyContent: "center"
    },
    historyItemContainer: {
        flexDirection: 'column',
        marginHorizontal: 15 * theme.width,
        marginTop: 15 * theme.height
    },
    historyItemDateText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey10,
    },
    historyItemImage: {
        height: 50 * theme.width * theme.height,
        width: 50 * theme.width * theme.height,
        backgroundColor: theme.color.background,
        borderRadius: 100,
        marginRight: 10 * theme.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyItemIcon: {
        height: 33 * theme.width * theme.height,
        width: 33 * theme.width * theme.height,
    },
    historyItemDetailContainer: {
        flexDirection: 'row',
        marginTop: 15 * theme.height,
        justifyContent: "space-between",
        alignItems: 'center',
    },
    historyItemViewDetail: {
        flexDirection: "row",
        alignItems: 'center',
    },
    counterpartyText: {
        fontFamily: "Pretendard-Medium",
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
        lineHeight: 22 * theme.height,
    },
    timeText: {
        fontFamily: "Pretendard-Regular",
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey10,
        lineHeight: 22 * theme.height,
    },
    amountText: {
        fontFamily: "Pretendard-Medium",
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
    },
    overlayBackground: {
        justifyContent: 'flex-end', // 하단 정렬
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    overlayContainer: {
        backgroundColor: theme.color.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15 * theme.width,
        paddingBottom: 50 * theme.height,
        //justifyContent:'center',
        //alignItems:'center'
        //height:600*theme.height
    },
    overlayHeaderContainer: {
        flexDirection: 'row',
        marginBottom: 7 * theme.height,
        height: 68 * theme.height,
        justifyContent: 'space-between',
        //backgroundColor:'red'
    },
    overlayHeaderTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 24 * theme.width,
        alignItems: 'center',
        //backgroundColor:'blue'
    },
    overlayHeaderText: {
        //justifyContent:'center'
        fontSize: theme.fontSizes.fontSizes20,
        fontFamily: "Pretendard-SemiBold",
        color: theme.color.black,
    },
    overlayHeaderIcon: {
        height: 24 * theme.height * theme.width,
        width: 24 * theme.width * theme.height,
        marginTop: 15 * theme.height,
    },
    receiptImage: {
        width: 300 * theme.height * theme.width,
        height: "60%",
        resizeMode: "contain",
    },
    detailContainer: {
        flexDirection: "row"
    },
})

export default Ledger2;