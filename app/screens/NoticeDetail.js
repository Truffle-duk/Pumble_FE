import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";
import * as Keychain from 'react-native-keychain';
import {call} from "@utils/ApiService";

const NoticeDetail = () => {
    const route = useRoute();
    const { noticeId } = route.params;

    const [noti, setNoti]=useState(null)

    useEffect(() => {
        const noticeDetailApi = `/community/1/notice/${noticeId}`
        call(noticeDetailApi, true, 'GET')
            .then(data => {
                setNoti(data.result)
            })
    }, []);

    return (
        <View style={styles.container}>
            {
                noti===null?(
                    <Text>...</Text>
                ):(
                    <View>
                        <Text style={styles.title}>{noti.post.title}</Text>
                        <View style={styles.authorDateContainer}>
                            <Text style={styles.author}>{noti.writer.nickname}</Text>
                            <Text style={styles.date}>{noti.post.createdAt.split('T')[0]}</Text>
                        </View>
                        <View style={styles.separator} />
                        <Text style={styles.content}>{noti.post.content}</Text>
                    </View>
                    
                )
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        padding: 20,
    },
    title: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.grey10,
        textAlign: 'left',
        lineHeight:20
    },
    authorDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15*theme.height,
    },
    author: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey1,
        lineHeight:15
    },
    date: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey1,
        lineHeight:15
    },
    separator: {
        borderBottomColor: theme.color.grey6,
        borderBottomWidth: 1,
        marginVertical: 20*theme.height,
    },
    content: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
        lineHeight:20
    },
});

export default NoticeDetail;
