import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";
import {call} from "@utils/ApiService";

const Join4 = ({route}) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState(route.params.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [arePasswordsSame, setArePasswordsSame] = useState(true)
    const [isValidNickname, setIsValidNickname] = useState(true)

    const isFormComplete = email !== '' && password !== '' && confirmPassword !== '' && nickname !== '';

    const handleSignup = () => {
        if (isFormComplete && isValidNickname && isValidPassword && arePasswordsSame) {
            const signUpApi = '/auth/signUp'
            const signUpRequest = {
                email: email,
                password: password,
                name: nickname
            }
            call(signUpApi, false, 'POST', signUpRequest)
                .then(data => {
                    if (data.code === 200) {
                        navigation.navigate('Start', { nickname: nickname });
                    }
                })
        } else {
            alert('모든 항목을 다시 한 번 확인해주세요.');
        }
    };

    const checkPassword = () => {
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
        setIsValidPassword(passwordRegExp.test(password))
    }

    const checkPasswords = () => {
        if (confirmPassword && password !== confirmPassword) {
            setArePasswordsSame(false)
        }
    }

    const checkNickname = () => {
        if (nickname.length > 12) {
            setIsValidNickname(false)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>가입 정보 입력하기</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이메일 주소</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="이메일 주소"
                    value={email}
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="비밀번호"
                    value={password}
                    placeholderTextColor={theme.color.grey1}
                    secureTextEntry
                    onChangeText={setPassword}
                    onEndEditing={checkPassword}
                    autoCapitalize='none'
                />
                <Text style={isValidPassword ? styles.helperText : styles.errorText}>* 영문, 숫자, 특수문자를 포함한 8자리 이상</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호 확인</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="비밀번호 확인"
                    placeholderTextColor={theme.color.grey1}
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                    onEndEditing={checkPasswords}
                    autoCapitalize='none'
                />
                {!arePasswordsSame ? <Text style={styles.errorText}>비밀번호와 일치하지 않습니다.</Text> : <></>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>닉네임</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="닉네임 입력"
                    placeholderTextColor={theme.color.grey1}
                    value={nickname}
                    onChangeText={setNickname}
                    onEndEditing={checkNickname}
                    autoCapitalize='none'
                />
                <Text style={isValidNickname ? styles.helperText : styles.errorText}>* 최대 12자까지</Text>
            </View>

            <TouchableOpacity
                style={[styles.button, !isFormComplete && styles.buttonDisabled]}
                onPress={handleSignup}
                disabled={!isFormComplete}
            >
                <Text style={styles.buttonText}>회원가입 하기</Text>
            </TouchableOpacity>
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
        marginTop : 30*theme.height,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes26,
        marginBottom:20*theme.height
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
        borderRadius: 5,
        paddingHorizontal: 20*theme.width,
        paddingVertical: 14*theme.width,
        fontSize: theme.fontSizes.fontSizes16,
        backgroundColor: theme.color.background,
        color: theme.color.grey10,
    },
    helperText: {
        color: theme.color.grey6,
        fontSize: theme.fontSizes.fontSizes12,
        marginTop: 5 * theme.height,
    },
    errorText: {
        color: theme.color.red,
        fontSize: theme.fontSizes.fontSizes12,
        marginTop: 5 * theme.height,
    },
    button: {
        position: 'absolute',
        left: 16 * theme.width,
        bottom: 70 * theme.height,
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
    backIcon:{
        width:26*theme.height*theme.width,
        height:26*theme.height*theme.width,
    }
});

export default Join4;
