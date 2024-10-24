import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { call } from '@utils/ApiService';
import { theme } from "@assets/Theme";


const CreateGroup = () => {
    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [groupname, setGroupname] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [arePasswordsSame, setArePasswordsSame] = useState(true)
    const [isValidGroupname, setIsValidGroupname] = useState(true)

    const isFormComplete = password !== '' && confirmPassword !== '' && groupname !== '';

    const checkPassword = () => {
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
        setIsValidPassword(passwordRegExp.test(password))
    }

    const checkPasswords = () => {
        if (confirmPassword && password !== confirmPassword) {
            setArePasswordsSame(false)
        }
    }

    const checkGroupname = () => {
        if (groupname.length > 12) {
            setIsValidGroupname(false)
        }
    }

    const handleCompletePress = () => {
        if (isFormComplete) {
            const createGroup = '/home/group/create'
            const groupInfo = {
                name:groupname,
                password:password
            }
            call(createGroup, true, 'POST', groupInfo)
                .then(async data => {
                    if (data.code === 200) {
                        const userAuth="leader"
                        const gid=data.result.newGroupId
                        //await Keychain.setInternetCredentials("GroupInfo", userAuth, gid);
                        alert("생성 완료", "모임이 성공적으로 참여하였습니다!")
                        navigation.navigate('GoHome');
                        //navigation.navigate('Start', { nickname: nickname });
                        //setArePasswordsSame(true);
                    }
                })
        } else {
            alert('폼을 다시 확인해주세요!');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>새로운 모임 생성하기</Text>
            <Text style={styles.subtitle}>새로운 모임을 생성하여 펌블을 시작해보세요!</Text>
            <Text style={styles.inputLabel}>모임 이름</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.color.grey1}
                placeholder="모임의 이름을 입력하세요"
                value={groupname}
                onChangeText={setGroupname}
                onEndEditing={checkGroupname}
                autoCapitalize='none'
            />
            <Text style={styles.helperText}>* 최대 12자까지</Text>
            <Text style={styles.inputLabel}>비밀번호</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.color.grey1}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onEndEditing={checkPassword}
                autoCapitalize='none'
            />
            <Text style={styles.helperText}>* 영문, 숫자, 특수문자를 포함한 8자리 이상</Text>
            <Text style={styles.inputLabel}>비밀번호 확인</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.color.grey1}
                placeholder="비밀번호를 다시 입력하세요"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onEndEditing={checkPasswords}
                autoCapitalize='none'
                
            />
            
            <TouchableOpacity
                style={[styles.button, !isFormComplete && styles.buttonDisabled]}
                onPress={handleCompletePress}
                disabled={!isFormComplete}
            >
                <Text style={styles.buttonText}>생성하기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height:theme.height*844,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        marginTop:30*theme.height,
        marginLeft:4*theme.width,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes28,
        //marginBottom: 10,
    },
    subtitle: {
        marginTop : 15*theme.height,
        marginLeft:4*theme.width,
        marginBottom:10*theme.height,
        color: theme.color.grey1,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
    },
    inputLabel: {
        color: theme.color.grey10,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        marginBottom: 10 * theme.height,
        marginTop:20*theme.height,
        marginLeft:4*theme.width
    },
    input: {
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
        fontSize: theme.fontSizes.fontSizes12,
        fontFamily: 'Pretendard-Medium',
        marginTop: 5 * theme.height,
    },
    button: {
        position: 'absolute',
        left: 16 * theme.width,
        bottom: 153 * theme.height,
        //paddingVertical: 15,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        width: 358 * theme.width,
        height: 50 * theme.height,
        backgroundColor: theme.color.main,
    },
    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
    buttonDisabled: {
        backgroundColor: theme.color.grey1,
    },
    buttonContainer: {
        marginTop: 10,
    },
    backIcon:{
        width:26*theme.height*theme.width,
        height:26*theme.height*theme.width,
        marginTop:4*theme.height
    }
});

export default CreateGroup;