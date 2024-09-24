import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const Login = () => {
    const navigation = useNavigation();

    const handleSignUpPress = () => {
        navigation.navigate('Join1');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Icons/pumble.png')} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="아이디/이메일"
                placeholderTextColor={theme.color.grey1}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor={theme.color.grey1}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.signUpButton}
            onPress={()=>navigation.navigate('GoHome')}>
                <Text style={styles.signUpButtonText}>로그인 하기</Text>
            </TouchableOpacity>

            <View style={styles.footerLinks}>
                <TouchableOpacity >
                    <Text style={styles.footerLinkText}>비밀번호 찾기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUpPress}>
                    <Text style={styles.footerLinkText}>회원가입 하기</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.socialLoginText}>간편 로그인</Text>
            <View style={styles.socialLoginButtons}>
                <TouchableOpacity>
                    <Image source={require('../assets/Icons/kakao.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/Icons/google.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/Icons/naver.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        alignItems: 'center',

    },
    logo: {
        width: 180 * theme.width,
        height: 73.83 * theme.height,
        resizeMode: 'contain',
        marginBottom: 40 * theme.height,
        marginTop: 80 * theme.height,
    },
    input: {
        width: 358 * theme.width,
        height: 52 * theme.height,
        borderColor: theme.color.grey6,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 20*theme.width,
        marginTop: 20 * theme.height,
        backgroundColor: theme.color.background,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey10,
    },
    signUpButton: {
        width: 358 * theme.width,
        height: 52 * theme.height,
        backgroundColor: theme.color.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30* theme.height,
        marginTop: 20 * theme.height,
    },
    signUpButtonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 260 * theme.width,
        marginBottom: 50*theme.height,
    },
    footerLinkText: {
        color: theme.color.grey1,
        fontSize: theme.fontSizes.fontSizes14,
        fontFamily: 'Pretendard-Medium',
    },
    socialLoginText: {
        fontSize: theme.fontSizes.fontSizes14,
        fontFamily: 'Pretendard-Medium',
        color: theme.color.grey2,
        marginBottom: 20*theme.height,
    },
    socialLoginButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
    },
    socialIcon: {
        width: 50 * theme.width,
        height: 50 * theme.height,
    },
});

export default Login;
