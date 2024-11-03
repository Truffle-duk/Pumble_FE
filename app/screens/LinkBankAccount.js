import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {call} from '@utils/ApiService';
import {theme} from "@assets/Theme";

function LinkBankAccounts({route, navigate}){
    const [account, setAccount] = useState('');
    const [bank, setBank]=useState('');
    const navigation = useNavigation();

    const isButtonDisabled = account.trim() === '' && bank.trim() === '';

    const handleCompletePress = () => {
        if (!isButtonDisabled) {
            const checkMeetingCode = '/home/group/join'
            const joincode = {
                //code: meetingCode,
            }
            call(checkMeetingCode, true, 'POST', joincode)
                .then(async data => {
                    if (data.code === 200) {
                        const userAuth = "member"
                        const gid = data.result.groupId
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
                onPress={() => navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                       style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>모임 계좌번호 입력하기</Text>
            <Text style={styles.subtitle}>새로운 모임의 계좌를 연동해</Text>
            <Text style={styles.subtitle}>펌블에서 쉽게 공금을 관리해요</Text>

            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder="계좌번호 입력"
                placeholderTextColor={theme.color.grey1}
                value={account}
                onChangeText={setAccount}
            />
            <TextInput
                style={styles.input}
                placeholder="은행 입력"
                placeholderTextColor={theme.color.grey1}
                value={bank}
                onChangeText={setBank}
            />

            {/* 추가된 두 문장 */}
            <View style={styles.container2}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: isButtonDisabled ? theme.color.grey6 : theme.color.main,}]}
                    //onPress={handleCompletePress}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.buttonText}>연결하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: theme.height * 844,
        padding: 16 * theme.width,

        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        marginTop: 30 * theme.height,
        marginBottom:15*theme.height,
        marginLeft: 4 * theme.width,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes28,
        //marginBottom: 10,
    },
    subtitle: {
        //marginTop: 15 * theme.height,
        marginLeft: 4 * theme.width,
        color: theme.color.grey1,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
        lineHeight:22
    },
    input: {
        width: 358 * theme.width,
        height: 52 * theme.height,
        marginTop: 30 * theme.height,
        borderColor: theme.color.grey6,
        borderBottomWidth: 1,
        //borderRadius: 5,
        paddingLeft: 4 * theme.width,
        //backgroundColor: theme.color.background,
        color: theme.color.grey10,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes22,
        lineHeight:22
    },
    container2: {
        position: 'absolute',
        //justifyContent:'center',
        alignItems: 'center',
        bottom: 153 * theme.height,
        left: 16 * theme.width,
    },

    button: {
        alignItems: 'center',
        borderRadius: 5,
        width: 358 * theme.width,
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
        marginBottom: 5 * theme.height
    },
    linkText: {
        color: theme.color.grey1,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
        marginBottom: 30 * theme.height,
        textDecorationLine: 'underline',  // 밑줄 추가
        //marginTop: 5,
    },
    backIcon: {
        width: 26 * theme.height * theme.width,
        height: 26 * theme.height * theme.width,
        marginTop: 4 * theme.height
    }
});

export default LinkBankAccounts;