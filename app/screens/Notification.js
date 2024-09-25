import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";
import * as Keychain from 'react-native-keychain';

// const notices = [
//     { id: 1, title: "캣 페스타 일정 변경 관련 공지", author: "관리 회장", date: "2024.07.06" },
//     { id: 2, title: "캣 페스타 시간 변경", author: "관리 회장", date: "2024.07.05" },
//     { id: 3, title: "캣 페스타 장소 안내", author: "관리 회장", date: "2024.07.04" },
//     { id: 4, title: "새로운 공지사항입니다.", author: "관리 회장", date: "2024.07.03" },
//     { id: 5, title: "이전 공지사항 다시 확인해주세요", author: "관리 회장", date: "2024.07.02" },
//     { id: 6, title: "캣 페스타 관련 추가 안내", author: "관리 회장", date: "2024.07.01" },
//     { id: 7, title: "공지사항 테스트", author: "관리 회장", date: "2024.06.30" },
//     { id: 8, title: "공지사항 테스트2", author: "관리 회장", date: "2024.06.29" },
// ];

const URL="https://www.pumble.site/api/community/1/notice/list?page=1"

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


const isAdmin = false; // 관리자 모드를 제어하는 플래그


const fetchData = async () => {
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
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // 응답을 JSON으로 변환
        //console.log('Response Data:', data.result.noticeList.noticeList);
        return(data);

    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

const Noticefication = () => {
    const navigation = useNavigation();
    const [notiList, setNotiList]=useState([])

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await fetchData(); 

            setNotiList(data.result.noticeList); 
            
        };
        
        fetchNotifications(); // 비동기 함수 호출
        console.log(notiList)
    }, []);
    

    const handleNoticePress = (noticeId) => {
        console.log(noticeId);
        navigation.navigate('NoticeDetail', { noticeId });
    };

    const handleWritePress = () => {
        navigation.navigate('NoticeWrite');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.mainNotice} onPress={() => handleNoticePress(notices[0])}>
                    <View style={styles.mainNoticeContent}>
                        <Image source={require('../assets/Icons/megaphone.png')} style={styles.megaphoneIcon} />
                        {/*<Text style={styles.mainNoticeText}>{notiList[0].notice.title}</Text>*/}
                        <Text style={styles.mainNoticeText}>공지사항 입니다.</Text>
                        <Image source={require('../assets/Icons/arrow-Down.png')} style={styles.arrowDownIcon} />
                    </View>
                </TouchableOpacity>

                {/* 나머지 공지사항들을 표시 */}
                {notiList.length===0?(
                    <Text>공지가 없어요..ㅜㅜ</Text>
                ):(
                    notiList.map((notice,index) => (
                        <TouchableOpacity key={notice.id} style={styles.noticeItem} onPress={() => handleNoticePress(notice.notice.noticeId)}>
                            <View style={styles.noticeContent}>
                                <View style={styles.noticeTextContainer}>
                                    <Text style={styles.noticeTitle}>{notice.notice.title}</Text>
                                    <Text style={styles.noticeAuthor}>{notice.writer.nickname}</Text>
                                    <Text style={styles.noticeDate}>{notice.notice.createdAt.split('T')[0]}</Text>
                                </View>
                                <Image source={require('../assets/Icons/arrow-Right.png')} style={styles.arrowIcon} />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
                
            </ScrollView>

            {/* 관리자 모드일 때 글쓰기 버튼 표시 */}
            {isAdmin && (
                <TouchableOpacity style={styles.writeButton} onPress={handleWritePress}>
                    <Image source={require('../assets/Icons/write.png')} style={styles.writeIcon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const convertHexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
        paddingBottom: 77 * theme.height,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    mainNotice: {
        backgroundColor: convertHexToRGBA(theme.color.main, 0.07),
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainNoticeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    megaphoneIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    mainNoticeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.main,
        flex: 1,
    },
    arrowDownIcon: {
        width: 15 * theme.width,
        height: 15 * theme.height,
    },
    noticeItem: {
        backgroundColor: theme.color.white,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        // 그림자 추가
        shadowColor: theme.color.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android용 그림자
    },
    noticeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    noticeTextContainer: {
        flex: 1,
    },
    noticeTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey2,
    },
    noticeAuthor: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
    },
    noticeDate: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
    },
    arrowIcon: {
        width: 15 * theme.width,
        height: 15 * theme.height,
    },
    writeButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: theme.color.main,
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    writeIcon: {
        width: 24,
        height: 24,
    },
});

export default Noticefication;
