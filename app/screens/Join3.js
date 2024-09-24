import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const Join3 = () => {
    const navigation = useNavigation();

    // 입력된 6자리 코드 상태
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [timeLeft, setTimeLeft] = useState(300); // 5분 타이머 (300초)
    const inputRefs = useRef([]);

    const [isVerified, setIsVerified] = useState(false); // 검증 상태

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                setIsTimerActive(false); // 타이머가 0이 되면 인증하기 버튼 비활성화
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleInputChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // 자동으로 다음 입력 칸으로 이동
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // 마지막 숫자까지 입력되면 다음으로 이동
        if (index === 5 && value) {
            inputRefs.current[index].blur();
        }
    };

    const isCodeComplete = code.every(digit => digit !== '');

    const handleVerification = () => {
        if (isCodeComplete && isTimerActive) {
            setIsVerified(true);  // 인증을 성공한 것으로 처리
            alert('인증 성공!');
            navigation.navigate('Join4'); // 인증 성공 시 다음 페이지로 이동
        } else {
            alert('인증 코드가 맞지 않거나 시간이 만료되었습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>인증 코드 입력하기</Text>
            <Text style={styles.subtitle}>인증을 위해 전송된 코드를 입력해주세요</Text>

            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={el => (inputRefs.current[index] = el)}
                        style={styles.codeInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={value => handleInputChange(value, index)}
                    />
                ))}
            </View>

            <Text style={styles.timer}>
                {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)} {/* 00:00 형식 */}
            </Text>

            <Text style={styles.instruction}>- 유효 시간이 지났을 경우 인증 메일을 다시 보내주세요.</Text>
            <Text style={styles.instruction}>- 하루동안 5번까지 새로운 인증 코드를 받을 수 있습니다.</Text>

            <TouchableOpacity
                style={[
                    styles.button,
                    (!isCodeComplete || !isTimerActive) && styles.buttonDisabled,
                ]}
                onPress={handleVerification}
                disabled={!isCodeComplete || !isTimerActive}  // 숫자 6개 미완성 또는 타이머가 0이면 버튼 비활성화
            >
                <Text style={styles.buttonText}>인증하기</Text>
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
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes26,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    codeInput: {
        borderBottomWidth: 2,
        borderColor: '#ddd',
        fontSize: 24,
        textAlign: 'center',
        width: 40,
        paddingVertical: 10,
    },
    timer: {
        fontSize: 18,
        color: '#4A90E2',
        textAlign: 'center',
        marginBottom: 20,
    },
    instruction: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
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
    buttonDisabled: {
        backgroundColor: '#aaa',
    },

});

export default Join3;
