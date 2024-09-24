import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const Join2 = () => {
    const [email, setEmail] = useState('');
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const handleEmailSubmit = () => {
        // 이메일 중복 확인 로직 (임시로 이메일이 특정 값일 때 에러 메시지 표시)
        if (email === "already@used.com") {
            setErrorMessage("이미 사용중인 이메일이에요.");
        } else {
            setErrorMessage('');
            navigation.navigate('Join3');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>이메일 인증하기</Text>
            <Text style={styles.subtitle}>인증을 위해 유효한 이메일을 입력해주세요</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholderVisible ? "GuinGuin@pumble.com" : ""}
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setPlaceholderVisible(false)}
                onBlur={() => setPlaceholderVisible(email === '')}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: email ? theme.color.main : '#CCC' }]}
                    onPress={handleEmailSubmit}
                    disabled={!email}
                >
                    <Text style={styles.buttonText}>인증 메일 전송</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes26,
    },
    subtitle: {
        color: theme.color.grey1,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
    },
    input: {
        width: 358 * theme.width,
        height: 52 * theme.height,
        borderColor: theme.color.grey6,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: theme.color.grey6,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    bottomContainer: {
        flex: 1,

    },
    button: {

        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        width: 358 * theme.width,
        height: 50 * theme.height,
        top: 400 * theme.height,

    },
    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
});

export default Join2;
