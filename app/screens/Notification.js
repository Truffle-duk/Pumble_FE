import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {theme} from "@assets/Theme";
import * as Keychain from 'react-native-keychain';
import {call} from "@utils/ApiService";
import { GroupCall } from '@utils/GroupService';

const isAdmin = true; // 관리자 모드를 제어하는 플래그

const Notification = () => {
    const navigation = useNavigation();
    const [notiList, setNotiList] = useState([{
        notice: {noticeId: 0, title: "", createdAt: ""},
        writer: {nickname: "", hasAuthority: false}
    }])

    useFocusEffect(
        useCallback(() => {
            GroupCall("GID")
          .then(async id=>{
            const api = `/community/${id}/notice/list?page=1`
            call(api, true, 'GET')
                .then(data => {
                    setNotiList(data.result.noticeList)
                })
                .catch(err => {
                    console.log("Error occurred at Notification")
                })
          })
        }, [])
    )

    const handleNoticePress = (noticeId) => {
        navigation.navigate('NoticeDetail', {noticeId: noticeId});
    };

    const handleWritePress = () => {
        navigation.navigate('NoticeWrite');
    };

    const handleDeletePress = async (noticeId) => {
        GroupCall("GID")
          .then(async id=>{
            // console.log(noticeId)
            // console.log("notifi GID", id)
            const dapi = `/community/${id}/notice/${noticeId}`
            //const dapi=`/community/1/notice/12`
            return await call(dapi, true, 'DELETE')
                .then(data => {
                    console.log(data)
                    if (data.code === 200) {
                        alert('공지가 삭제되었습니다.');
                    } else {
                        alert("공지 삭제를 실패했습니다.")
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log("Error occurred at delete notification")
                })
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {notiList.length===0?<View></View>:
                <TouchableOpacity style={styles.mainNotice}
                                  onPress={() => handleNoticePress(notiList[0].notice.noticeId)}>
                    <View style={styles.mainNoticeContent}>
                        <Image source={require('../assets/Icons/megaphone.png')} style={styles.megaphoneIcon}/>
                        <Text style={styles.mainNoticeText}>{notiList[0].notice.title}</Text>
                        <Image source={require('../assets/Icons/arrow-Down.png')} style={styles.arrowDownIcon}/>
                    </View>
                </TouchableOpacity>
                }

                {/* 나머지 공지사항들을 표시 */}
                {notiList.length === 0 ? (
                    <Text>공지가 없어요..ㅜㅜ</Text>
                ) : (
                    notiList.map((notice, index) => (
                        <TouchableOpacity //key={notice.noticeId} 
                            key={index} style={styles.noticeItem}
                            onPress={() => handleNoticePress(notice.notice.noticeId)}>
                            <View style={styles.noticeContent}>
                                {/* <View style={styles.noticeTextContainer}>
                                    <Text style={styles.noticeTitle}>{notice.notice.title}</Text>
                                    <Text style={styles.noticeAuthor}>{notice.writer.nickname}</Text>
                                    <Text style={styles.noticeDate}>{notice.notice.createdAt.split('T')[0]}</Text>
                                </View>
                                <Image source={require('../assets/Icons/arrow-Right.png')} style={styles.arrowIcon} /> */}
                                <View style={styles.noticeTextContainer}>
                                    <Text style={styles.noticeTitle}>{notice.notice.title}</Text>
                                    <Image source={require('../assets/Icons/arrow-Right.png')}
                                           style={styles.arrowIcon}/>
                                </View>
                                <Text style={styles.noticeAuthor}>{notice.writer.nickname}</Text>
                                <View style={styles.noticeTextContainer}>
                                    <Text style={styles.noticeDate}>{notice.notice.createdAt.split('T')[0]}</Text>
                                    {isAdmin && (
                                        <TouchableOpacity onPress={() => handleDeletePress(notice.notice.noticeId)}>
                                            <Image source={require('@assets/Icons/trash.png')}
                                                   style={styles.trashIcon}/>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}

            </ScrollView>

            {/* 관리자 모드일 때 글쓰기 버튼 표시 */}
            {isAdmin && (
                <TouchableOpacity style={styles.writeButton} onPress={handleWritePress}>
                    <Image source={require('../assets/Icons/writePen.png')} style={styles.writeIcon}/>
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
        paddingHorizontal: 16 * theme.width,
        paddingBottom: 20 * theme.height,
    },
    mainNotice: {
        backgroundColor: convertHexToRGBA(theme.color.main, 0.07),
        borderRadius: 15,
        paddingVertical: 10 * theme.height,
        paddingHorizontal: 15 * theme.width,
        marginVertical: 15 * theme.height,
        //marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainNoticeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    megaphoneIcon: {
        width: 20 * theme.width * theme.height,
        height: 20 * theme.width * theme.height,
        marginRight: 10 * theme.width,
    },
    mainNoticeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.main,
        flex: 1,
    },
    arrowDownIcon: {
        width: 15 * theme.width * theme.height,
        height: 15 * theme.height * theme.width,
    },
    noticeItem: {
        backgroundColor: theme.color.white,
        borderRadius: 15,
        paddingVertical: 20 * theme.height,
        paddingHorizontal: 15 * theme.width,
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
        //flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'space-between',
    },
    noticeTextContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noticeTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey2,
        lineHeight: 20
    },
    noticeAuthor: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
        marginTop: 10 * theme.height,
        marginBottom: 5 * theme.height,
        lineHeight: 15
    },
    noticeDate: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
        lineHeight: 15
    },
    arrowIcon: {
        width: 15 * theme.width * theme.height,
        height: 15 * theme.height * theme.width,
    },
    writeButton: {
        position: 'absolute',
        right: 20 * theme.width,
        bottom: 97 * theme.height,
        backgroundColor: theme.color.main,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
        //elevation: 5,
    },
    writeIcon: {
        width: 35 * theme.width * theme.height,
        height: 35 * theme.width * theme.height,
    },
    trashIcon: {
        width: 20 * theme.width * theme.height,
        height: 20 * theme.width * theme.height,
    }
});

export default Notification;
