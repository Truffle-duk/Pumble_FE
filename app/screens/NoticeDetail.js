import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";
import * as Keychain from 'react-native-keychain';

const getAccessToken = async () => {
    try {
        const credentials = await Keychain.getInternetCredentials("AccessToken");
        if (credentials) {
            //console.log("AccessToken:", credentials.password);
            return credentials.password; // AccessToken 반환
        } else {
            console.log('No access token found');
        }
    } catch (error) {
        console.error('Error retrieving access token:', error);
    }
};

const getRefreshToken = async () => {
    try {
        const credentials = await Keychain.getInternetCredentials("RefreshToken");
        if (credentials) {
            //console.log("RefreshToken:", credentials.password);
            return credentials.password; // RefreshToken 반환
        } else {
            console.log('No refresh token found');
        }
    } catch (error) {
        console.error('Error retrieving refresh token:', error);
    }
};


const fetchData = async ({no}) => {
    const URL=`https://www.pumble.site/api/community/1/notice/${no}`
    const token= await getAccessToken();
    try {
        const response = await fetch(URL, {
            method: 'GET', // 생략 가능
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // 필요하다면 토큰 추가
            }
        });

        if (!response.ok) {
            console.log(no)
            console.log('Response Data:', response);
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // 응답을 JSON으로 변환
        console.log('Response Data:', data);
        return(data);

    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

const NoticeDetail = (noticeId) => {
    const route = useRoute();
    const navigation = useNavigation();
    const { notice } = route.params;

    const [noti, setNoti]=useState(null)

    useEffect(() => {
        const fetchNotifications = async () => {
            //console.log("notice1d:",noticeId)
            const { route } = noticeId; // noticeId로 받은 객체에서 route 추출
            const notiId = route.params.noticeId;

            // console.log("notice1d:", noticeId)
            // console.log("notice1d2:", notiId)
            const data = await fetchData({no: notiId}); 
            console.log("tttt",data.result)
            setNoti(data.result);
        };
        
        fetchNotifications()
        .then( _ => {
            console.log("noti",noti)
        }); // 비동기 함수 호출
        //console.log("noti",noti)
    }, []);

    const handleBackPress = () => {
        navigation.goBack();
    };

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
