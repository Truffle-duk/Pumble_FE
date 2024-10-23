import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { call } from '@utils/ApiService';
import { theme } from "@assets/Theme";

const JoinGroup = () => {
    const [meetingCode, setMeetingCode] = useState('');
    const navigation = useNavigation();

    const isButtonDisabled = meetingCode.trim() === '';

    const handleCompletePress = () => {
        if (!isButtonDisabled) {
            const checkMeetingCode = '/home/group/join'
            const joincode = {
                code: meetingCode,
            }
            call(checkMeetingCode, true, 'POST', joincode)
                .then(async data => {
                    if (data.code === 200) {
                        const userAuth="member"
                        const gid=data.result.groupId
                        //await Keychain.setInternetCredentials("GroupInfo", userAuth, gid);// 어떻게...?
                        alert("참여 완료", "모임에 성공적으로 참여하였습니다!")
                        navigation.navigate('GoHome');
                        //navigation.navigate('Start', { nickname: nickname });
                        //setArePasswordsSame(true);
                    }
                })
        } else {
            alert('모임코드를 다시 확인해주세요!');
        }
        
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>모임 코드로 참여하기</Text>
            <Text style={styles.subtitle}>모임 코드를 입력하여 모임에 참여하세요</Text>

            <TextInput
                style={styles.input}
                placeholder="모임 코드 입력"
                placeholderTextColor={theme.color.grey1}
                value={meetingCode}
                onChangeText={setMeetingCode}
            />

            

            {/* 추가된 두 문장 */}
            <View style={styles.container2}>
            <Text style={styles.infoText}>모임 코드가 없다면?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Text style={styles.linkText}>새 모임 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: isButtonDisabled ? theme.color.grey6 : theme.color.main, }]}
                onPress={handleCompletePress}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>참여하기</Text>
            </TouchableOpacity>
            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height:theme.height*844,
        padding: 16*theme.width,

        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        marginTop:30*theme.height,
        marginLeft:4*theme.width,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes28,
        //marginBottom: 10,
    },
    subtitle: {
        marginTop : 15*theme.height,
        marginLeft:4*theme.width,
        color: theme.color.grey1,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
    },
    input: {
        width: 358 * theme.width,
        height: 52 * theme.height,
        marginTop: 30*theme.height,
        borderColor: theme.color.grey6,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft:20*theme.width,
        backgroundColor: theme.color.background,
        color: theme.color.grey10,
    },
    container2:{
        position: 'absolute',
        //justifyContent:'center',
        alignItems:'center',
        bottom: 153 * theme.height,
        left:16*theme.width,
    },
    button: {                
        alignItems: 'center',
        borderRadius: 5,
        width: 358*theme.width,
        height: 50 * theme.height,
        justifyContent: 'center',
    },

    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
    infoText: {
        color: theme.color.grey1,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
        marginBottom:5*theme.height
    },
    linkText: {
        color: theme.color.grey1,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
        marginBottom:30*theme.height,
        textDecorationLine: 'underline',  // 밑줄 추가
        //marginTop: 5,
    },
    backIcon:{
        width:26*theme.height*theme.width,
        height:26*theme.height*theme.width,
        marginTop:4*theme.height
    }
});

export default JoinGroup;
