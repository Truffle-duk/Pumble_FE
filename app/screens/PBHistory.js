//import React from "react";
import {theme} from "@assets/Theme";
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from "react";
import {getPBHistory} from "@utils/BlockchainFunction";
import {call} from "@utils/ApiService";
import {GroupCall} from "@utils/GroupService";

function PBBalanceCard({balance}) {
    console.log(balance)
    return (
        <View style={styles.PBBalanceCardContainer}>
            <View style={styles.PBBalanceCardTextContainer}>
                <Text style={styles.PBBalanceHeadText}>내 PB</Text>
                <Text style={styles.PBBalanceBalenceText}>{balance ? `+${balance} PB` : '+0 PB'}</Text>
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

    const initialize = async () => {
        let groupId
        await GroupCall("GID")
            .then(async gid => {
                groupId = gid
            })

        let groupUserId
        await call(`/group/${groupId}/profile`, true, 'GET')
            .then(data => {
                groupUserId = data.result.group_user_id
            })

        getPBHistory(groupId, groupUserId)
            .then(events => {
                setHistories(events)
            })
            .catch(error => console.error("Error fetching events: ", error));
    }

    useEffect(() => {
        initialize()
    }, []);

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
        let groupId
        await GroupCall("GID")
            .then(async gid => {
                groupId = gid
            })

        for (let i = 0; i < eventIdList.length; i++) {
            await call(`/event/${groupId}?id=${eventIdList[i]}`, true, 'GET')
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

    const initialize = async () => {
        let groupId
        await GroupCall("GID")
            .then(async gid => {
                groupId = gid
            })

        await call(`/group/${groupId}/profile`, true, 'GET')
            .then(data => {
                setPBbalance(data.result.token)
            })
    }

    useEffect(() => {
        initialize()
    }, []);

    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        // </View>
        <View style={styles.background}>
            <ScrollView
                //contentContainerStyle={styles.background}
            >
                <PBBalanceCard balance={PBBalance}/>
                <PBHistoryList />
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
    PBBalanceCardContainer: {
        backgroundColor: theme.color.mainOpacity10,
        borderRadius: 15,
        height: 90 * theme.height,
        paddingHorizontal: 15 * theme.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 35 * theme.height,
    },
    PBBalanceCardTextContainer: {
        flexDirection: 'column'
    },
    PBBalanceHeadText: {
        color: theme.color.grey10,
        fontSize: theme.fontSizes.fontSizes15,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 15,
        marginBottom: 10 * theme.height,
    },
    PBBalanceBalenceText: {
        color: theme.color.main,
        fontSize: theme.fontSizes.fontSizes25,
        fontFamily: 'Pretendard-Bold',
        lineHeight: 25,
    },
    PBBalanceImage: {
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