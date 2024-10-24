import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
>>>>>>> temp
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const JoinGroup = () => {
    const [meetingCode, setMeetingCode] = useState('');
    const navigation = useNavigation();

    const isButtonDisabled = meetingCode.trim() === '';

    const handleCompletePress = () => {
        alert("참여 완료", "모임에 성공적으로 참여하였습니다!")
        navigation.navigate('GoHome');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>모임 코드로 참여하기</Text>
            <Text style={styles.subtitle}>모임 코드를 입력하여 모임에 참여하세요</Text>

            <TextInput
                style={styles.input}
                placeholder="모임 코드 입력"
                value={meetingCode}
                onChangeText={setMeetingCode}
            />

            <TouchableOpacity
                style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
                onPress={handleCompletePress}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>입력 완료</Text>
            </TouchableOpacity>

            {/* 추가된 두 문장 */}
            <Text style={styles.infoText}>모임 코드가 없다면?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Text style={styles.linkText}>새 모임 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: isButtonDisabled ? theme.color.grey6 : theme.color.main, }]}
                onPress={handleCompletePress}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>참여하기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height:theme.height*844,
        padding: 16*theme.width,

        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
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
    container2:{
        position: 'absolute',
        //justifyContent:'center',
        alignItems:'center',
        bottom: 153 * theme.height,
        left:16*theme.width,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#B0C4DE',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
        color: '#333',
        marginTop: 20,
    },
    linkText: {
        fontSize: 14,
        color: '#4A90E2',
        textDecorationLine: 'underline',  // 밑줄 추가
        marginTop: 5,
    },
});

export default JoinGroup;
