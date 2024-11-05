import { theme } from "@assets/Theme";
import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {GroupCall} from "@utils/GroupService";
import {call} from "@utils/ApiService";

const alarmList = [
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
    {
        "Lable": 1,
        "content": "별다방"
    },
    {
        "Lable": 2,
        "content": "일하는거 너무 고되다... 에효에효에효에효에효에효에효에효"
    },
    {
        "Lable": 3,
        "content": "봉사시간 관련 필독 사항"
    },
];

function Alarm({navigation}) {
    const [datas, setDatas] = useState([]);

    const initialize = async () => {
        let groupId
        await GroupCall("GID")
            .then(gid => {
                groupId = gid
            })

        await call(`/notification/${groupId}`, true, 'GET')
            .then(data => {
                setDatas(data.result)
            })
    }

    useEffect(() => {
        initialize()
    }, []);

    const renderContent = (data) => {
        if (data.type === 'receipt') {
            return (
                <TouchableOpacity style={styles.contentContainer} onPress={() => navigation.navigate('Ledger2')}>
                    <View style={styles.iconView}>
                        <Image style={styles.icon} source={require("@assets/Icons/receiptEditIcon.png")} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.headerLable}>🧾 새로운 영수증이 등록됐어요.</Text>
                        <Text style={styles.contentLable}>장부에서 확인해볼까요?</Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (data.type === 'notice') {
            return (
                <TouchableOpacity style={styles.contentContainer} onPress={() => navigation.navigate('NoticeDetail', {noticeId: data.notice_id})}>
                    <View style={styles.iconView}>
                        <Image style={styles.icon} source={require("@assets/Icons/editPen3.png")} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.headerLable}>🚨 새로운 공지가 등록됐어요.</Text>
                        <Text style={styles.contentLable}>지금 바로 확인하러 가봅시다!</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.contentContainer2}>
            <View>
                {datas.length === 0 ? (
                    <View style={{ alignItems: 'center', padding: 20 }}>
                        <Text style={styles.headerLable}>아직 알림이 없어요!</Text>
                    </View>
                ) : (
                    datas.map((data, index) => (
                        <View key={index}>
                            {renderContent(data)}
                            <View style={styles.lineHorizontal} />
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        //flex:1,
        backgroundColor: theme.color.white,
        paddingBottom:77
    },
    contentContainer2: {
        flexGrow: 1, // 컨텐츠가 없을 때도 배경색을 적용
        //justifyContent: 'center', // 컨텐츠가 없을 때 중앙 배치
        backgroundColor: theme.color.white, // 배경색 설정
        paddingBottom:77*theme.height
    },
    lineHorizontal: {
        height: 1,
        backgroundColor: theme.color.background,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20 * theme.height,
        marginHorizontal: 16*theme.width,
    },
    textContainer: {
        marginLeft: 10 * theme.width,
    },
    headerLable: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
        lineHeight: 15,
    },
    contentLable: {
        width: 304 * theme.width,
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey2,
        lineHeight: 15,
        marginTop: 10 * theme.height,
    },
    iconView: {
        height: 45 * theme.height * theme.width,
        width: 45 * theme.height * theme.width,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.color.grey1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 25 * theme.width * theme.height,
        height: 25 * theme.width * theme.height,
    },
});

export default Alarm;
