import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const Join4 = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('GuinGuin@pumble.com');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const isFormComplete = email !== '' && password !== '' && confirmPassword !== '' && nickname !== '';

    const handleEmailFocus = () => {
        if (email === 'GuinGuin@pumble.com') {
            setEmail('');
        }
    };

    const handleSignup = () => {
        if (isFormComplete) {
            navigation.navigate('Start', { nickname });  // 닉네임을 Alarm6로 전달
        } else {
            alert('모든 항목을 입력해주세요.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>가입 정보 입력하기</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이메일 주소</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="이메일 주소"
                    value={email}
                    onFocus={handleEmailFocus}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="비밀번호"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Text style={styles.helperText}>* 영문, 숫자, 특수문자를 포함한 8자리 이상</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호 확인</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>닉네임</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="닉네임 입력"
                    value={nickname}
                    onChangeText={setNickname}
                />
                <Text style={styles.helperText}>* 최대 12자까지</Text>
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
        marginTop : 76*theme.height,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes26,
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
        paddingHorizontal: 12*theme.height,
        paddingVertical: 14*theme.width,
        fontSize: theme.fontSizes.fontSizes16,
        backgroundColor: theme.color.backgroundColor,
    },
    helperText: {
        color: theme.color.grey3,
        fontSize: theme.fontSizes.fontSizes12,
        marginTop: 5 * theme.height,
    },
    button: {
        position: 'absolute',
        left: 16 * theme.width,
        bottom: 70 * theme.height,
        paddingVertical: 15,
        alignItems: 'center',
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
});

export default Join4;
