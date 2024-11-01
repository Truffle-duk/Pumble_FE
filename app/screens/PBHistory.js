//import React from "react";
import {theme} from "@assets/Theme";
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {call} from "@utils/ApiService";

/*const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

const privateKey = "0xde49fbfcea11b03f850ca72e5bafa45168963eec8811f506d59f1a4f262a75cc"
const wallet = new ethers.Wallet(privateKey, provider)
const eventContractAddress = "0xA3B55216bc84D56c45b033B11FDc1DA25722b233"
const eventContractABI = [
    "event EventTokenRecords(string indexed hGroupId, uint256 indexed hTimestamp, string indexed hUserId, string userId, uint256 timestamp, uint256 eventId, uint256 tokenNum)",
    "function createEvent(uint256 _eventId, uint256 _maxPpl, uint256 _reward)",
    "function distributeTokens(uint256 _eventId, uint256 _amount, string memory _groupId, string _userId)",
    "function eventOver(uint256 _eventId) public returns (string memory)"
]
const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, wallet)

async function getPBHistory(groupId, groupUserId) {
    const hGroupIdHash = ethers.id(groupId.toString()); // keccak256 해시
    const hGroupUserId = ethers.id(groupUserId.toString())

    // 필터 설정
    const filter = {
        address: eventContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("EventTokenRecords(string,uint256,string,string,uint256,uint256,uint256)"), // 이벤트 시그니처
            hGroupIdHash,
            null,
            hGroupUserId
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(eventContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching token history:", error);
        throw error;
    }
}*/

function PBBalanceCard({balance}) {
    return (
        <View style={styles.PBBalanceCardContainer}>
            <View style={styles.PBBalanceCardTextContainer}>
                <Text style={styles.PBBalanceHeadText}>내 PB</Text>
                <Text style={styles.PBBalanceBalenceText}>+{balance} PB</Text>
            </View>
            <Image source={require("@assets/Images/Piggybank.png")}
                   style={styles.PBBalanceImage}/>
        </View>
    )
}

function PBHistoryList() {
    const [histories, setHistories] = useState([])
    const [titleList, setTitleList] = useState([])
    const [realHistories, setRealHistories] = useState([])
    /*useEffect(() => {
        getPBHistory(1, 2)
            .then(events => {
                console.log(events)
                setHistories(events)
            })
            .catch(error => console.error("Error fetching events: ", error));
    }, []);*/

    useEffect(() => {
        if (histories.length > 0) {
            const {eventIdList} = histories.reduce(
                (acc, num) => {
                    acc.eventIdList.push(Number(num.args[5]))
                    return acc
                }, {eventIdList: []}
            )

            getTitleList(eventIdList)
                .then(result => {
                    console.log(result)
                })
        }
    }, [histories]);

    const getTitleList = async (eventIdList) => {
        for (let i = 0; i < eventIdList.length; i++) {
            await call(`/event/1?id=${eventIdList[i]}`, true, 'GET')
                .then(data => {
                    const title = data.result.title
                    setTitleList(prevState => [...prevState, title])
                })
        }
    }
    return (
        <View>
            <Text style={styles.PBHistoryHeadText}>상세내역</Text>
            {
                histories.length === 0 ? (
                    <View>
                        <View style={styles.line}/>
                        <Text>PB 내역이 없어요...</Text>
                    </View>
                ) : (
                    histories.map((history, index) => {
                            const historyArgs = history.args
                            const date = new Date(Number(historyArgs[4]) * 1000)
                            const dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
                            const token = Number(historyArgs[6])

                            return (
                                <View key={index}>
                                    <View style={styles.line}/>
                                    <View style={styles.PBHistoryContainer}>
                                        <Text style={styles.PBHistoryDateText}>{dateStr}</Text>
                                        <View style={styles.PBHistoryDetailContainer}>
                                            <Text style={styles.PBHistoryContentText}>{titleList[index]}</Text>
                                            <Text style={styles.PBHistoryAmountText}>+ {token} PB</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    )
                )
            }

        </View>
    )
}

export default function PBHistory() {
    const [PBBalance, setPBbalance] = useState(0);

    useEffect(() => {
        call('/group/1/profile', true, 'GET')
            .then(data => {
                setPBbalance(data.result.token)
            })
    }, []);

    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        // </View>
        <View style={styles.background}>
            <ScrollView
                //contentContainerStyle={styles.background}
            >
                <PBBalenceCard balence={PBbalence}/>
                <PBHistoryList histories={PBhistory}/>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme.color.white,
        paddingTop: 30 * theme.height,
        paddingHorizontal: 16 * theme.width,
        paddingBottom: 77 * theme.height,
    },
    PBBalenceCardContainer: {
        backgroundColor: theme.color.mainOpacity10,
        borderRadius: 15,
        height: 90 * theme.height,
        paddingHorizontal: 15 * theme.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 35 * theme.height,
    },
    PBBalenceCardTextContainer: {
        flexDirection: 'column'
    },
    PBBalenceHeadText: {
        color: theme.color.grey10,
        fontSize: theme.fontSizes.fontSizes15,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 15,
        marginBottom: 10 * theme.height,
    },
    PBBalenceBalenceText: {
        color: theme.color.main,
        fontSize: theme.fontSizes.fontSizes25,
        fontFamily: 'Pretendard-Bold',
        lineHeight: 25,
    },
    PBBalenceImage: {
        width: 90 * theme.width * theme.height,
        height: 90 * theme.width * theme.height,
    },
    PBHistoryHeadText: {
        color: theme.color.grey2,
        fontSize: theme.fontSizes.fontSizes18,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 18,
        marginBottom: 15 * theme.height,
    },
    line: {
        height: 1,
        backgroundColor: theme.color.background,
    },
    PBHistoryContainer: {
        paddingVertical: 20 * theme.height,
        paddingHorizontal: 15 * theme.width,
    },
    PBHistoryDateText: {
        color: theme.color.grey1,
        fontSize: theme.fontSizes.fontSizes14,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 15,
    },
    PBHistoryDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15 * theme.height,
    },
    PBHistoryContentText: {
        color: theme.color.grey2,
        fontSize: theme.fontSizes.fontSizes18,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 18,
    },
    PBHistoryAmountText: {
        color: theme.color.main,
        fontSize: theme.fontSizes.fontSizes18,
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 18,
    }
})