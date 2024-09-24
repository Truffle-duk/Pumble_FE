import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
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
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>이메일 인증하기</Text>
            <Text style={styles.subtitle}>인증을 위해 유효한 이메일을 입력해주세요</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholderVisible ? "GuinGuin@pumble.com" : ""}
                value={email}
                placeholderTextColor={theme.color.grey1}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setPlaceholderVisible(false)}
                onBlur={() => setPlaceholderVisible(email === '')}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: email ? theme.color.main : theme.color.grey6, }]}
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
        backgroundColor: theme.color.white,
        padding:20,
    },
    title: {
        marginTop : 30*theme.height,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes26,
    },
    subtitle: {
        marginTop : 15*theme.height,
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
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    bottomContainer: {
        flex: 1,

    },
    button: {
        position: 'absolute',
        bottom: 70 * theme.height,

        alignItems: 'center',
        borderRadius: 5,
        width: 358*theme.width,
        height: 50 * theme.height,
        justifyContent: 'center', // 버튼 안의 텍스트를 가운데 정렬

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

export default Join2;
