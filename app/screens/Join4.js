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

            <TextInput
                style={styles.input}
                placeholder="이메일 주소"
                value={email}
                onFocus={handleEmailFocus}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="닉네임 입력"
                value={nickname}
                onChangeText={setNickname}
            />

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
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        paddingVertical: 10,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Join4;
