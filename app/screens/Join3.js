import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";
import {call} from "@utils/ApiService";

const Join3 = ({route}) => {
    const navigation = useNavigation()
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
            const inputCode = parseInt(code.join(''))
            const verifyApi = '/auth/verifyEmail'
            const email = route.params.email
            call(verifyApi, false, 'POST', {email: email, code: inputCode})
                .then(data => {
                    if (data.result.isMatched) {
                        setIsVerified(true);  // 인증을 성공한 것으로 처리
                        alert('인증 성공!');
                        navigation.navigate('Join4', {email: email}); // 인증 성공 시 다음 페이지로 이동
                    } else {
                        alert('인증 코드가 맞지 않거나 시간이 만료되었습니다.');
                    }
                })
        } else {
            alert('인증 코드가 맞지 않거나 시간이 만료되었습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
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
            <View style={{alignItems:'center'}}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timer}>
                        {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)} {/* 00:00 형식 */}
                    </Text>
                </View>
            </View>
            
            
            <View style={styles.instructionContainer}>
                <Text style={styles.instruction}>- 유효 시간이 지났을 경우 인증 메일을 다시 보내주세요.</Text>
                <Text style={styles.instruction}>- 하루동안 5번까지 새로운 인증 코드를 받을 수 있습니다.</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isCodeComplete && isTimerActive ? theme.color.main : theme.color.grey1 },
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
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30*theme.height,
        marginHorizontal :20*theme.width,
    },
    codeInput: {
        marginTop: 60*theme.height,
        borderBottomWidth: 2,
        borderColor: theme.color.grey1,
        color: theme.color.grey2,
        fontFamily: 'Roboto-Bold',
        fontSize: theme.fontSizes.fontSizes36,
        textAlign: 'center',
        width: 36*theme.width, // 코드 입력 칸 크기 조정
        paddingVertical: 10,
    },
    timerContainer:{
        width:70*theme.width,
        height:32*theme.height,
        borderRadius:5,
        backgroundColor:theme.color.mainOpacity10,
        alignItems:'center',
        justifyContent:'center',
    },
    timer: {
        fontFamily: 'Roboto-Medium',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.main,
        //textAlign: 'center',
    },
    instructionContainer: {
        marginTop: 50*theme.height,
        alignItems: 'flex-start', 
    },
    instruction: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey1,
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 70 * theme.height,
        left: 16*theme.width,
        //paddingVertical: 15,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        width: 358 * theme.width,
        height: 50 * theme.height,
    },
    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
    buttonDisabled: {
        backgroundColor: theme.color.grey1,
    },
    backIcon:{
        width:26*theme.height*theme.width,
        height:26*theme.height*theme.width,
    }

});

export default Join3;
