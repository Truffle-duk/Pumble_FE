import { theme } from "@assets/Theme";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, ScrollView, Modal, Animated,} from 'react-native';
import { call } from "@utils/ApiService";

export default function ConfirmPW({route, navigation}){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [arePasswordsSame, setArePasswordsSame] = useState(true)

    const [arePasswordRight, setArePasswordsRight] = useState(false); //기존 패스워드가 맞는지

    const {gid}=route.params
    const isFormComplete = password !== '' && confirmPassword !== '';

    
    const handleCheckPw = () => {
        //console.log(gid, " ", password, " ", confirmPassword, " ", isFormComplete, " ", arePasswordsSame)
        if (isFormComplete && arePasswordsSame) {
            //console.log(gid, " ", password, " ", confirmPassword, " ", isFormComplete, " ", arePasswordsSame)
            const checkPwApi = `/group/${gid}/password`
            const checkPwRequest = {
                password: password,
            }
            call(checkPwApi, true, 'POST', checkPwRequest)
                .then(async data => {
                    if (data.code === 200) {
                        //navigation.navigate('Start', { nickname: nickname });
                        setArePasswordsRight(true);
                    }else{
                        console.log(gid)
                    }
                })
        } else {
            alert('패스워드를 다시 확인해주세요!');
        }
    };

    const handleDeleteGroup = () => {
        handleCheckPw()
        if (arePasswordRight) {
            const api=`/group/${gid}/delete`
            const request={
                password: password
            }
            call(api, true, 'DELETE', request)
                .then(data => {
                    if (data.code === 200){
                        alert('모임이 삭제되었습니다!');
                        navigation.goBack();
                    }else{
                        alert('삭제 과정에서 오류가 발생했습니다 :(');
                    }
                })
        }
    }
    // const handleChangePw = () => {
    //     if (isFormComplete && isValidPassword && arePasswordsSame) {
    //         const changePwApi = '/auth/signUp'
    //         const changePwRequest = {
    //             password: password,
    //             newPW: newPw
    //         }
    //         call(changePwApi, true, 'FETCH', changePwRequest)
    //             .then(data => {
    //                 if (data.code === 200) {
    //                     //navigation.navigate('Start', { nickname: nickname });
    //                      alert('비밀번호가 변경되었습니다.');
    //                      navigation.goBack();
    //                 }
    //             })
    //     } else {
    //         alert('모든 항목을 다시 한 번 확인해주세요.');
    //     }
    // };

    // 새로운 패스워드 유효성 검증
    const checkNewPassword = () => {
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
        setIsValidPassword(passwordRegExp.test(newPw))
    }

    const checkPasswords = () => {
        if (confirmPassword && password !== confirmPassword) {
            setArePasswordsSame(false)
        }
    }

    return(
        <View style={styles.background}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>기존 비밀번호 입력</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="모임 비밀번호 입력"
                    value={password}
                    placeholderTextColor={theme.color.grey1}
                    secureTextEntry
                    onChangeText={setPassword}
                    //onEndEditing={checkPassword}
                    multiline={false}
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>모임 비밀번호 재입력</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="모임 비밀번호 재입력"
                    value={confirmPassword}
                    placeholderTextColor={theme.color.grey1}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                    onEndEditing={checkPasswords}
                    multiline={false}
                    autoCapitalize='none'
                />
            </View>

            <TouchableOpacity
                style={[styles.button, !isFormComplete && styles.buttonDisabled]}
                onPress={handleDeleteGroup}
                disabled={!isFormComplete}
            >
                <Text style={styles.buttonText}>모임 삭제하기</Text>
            </TouchableOpacity>

        </View>


    )
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:77*theme.height,
        paddingHorizontal:16*theme.width,
        paddingTop:5*theme.height,
    },
    inputContainer: {
        marginTop: 20 * theme.height,
    },
    inputLabel: {
        color: theme.color.grey10,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        marginBottom: 10 * theme.height,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: theme.color.grey6,
        height: 52 * theme.height,
        borderRadius: 5,
        paddingHorizontal: 20*theme.width,
        //paddingVertical: 14*theme.width,
        fontSize: theme.fontSizes.fontSizes16,
        fontFamily: 'Pretendard-SemiBold',
        backgroundColor: theme.color.background,
        color: theme.color.grey10,
    },
    helperText: {
        color: theme.color.grey6,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes12,
        marginTop: 5 * theme.height,
    },
    errorText: {
        color: theme.color.red,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes12,
        marginTop: 5 * theme.height,
    },
    button: {
        position: 'absolute',
        left: 16 * theme.width,
        bottom: 107 * theme.height,
        //paddingVertical: 15,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        width: 358 * theme.width,
        height: 50 * theme.height,
        backgroundColor: theme.color.main,
    },
    buttonDisabled: {
        backgroundColor: theme.color.grey1,
    },
    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
})