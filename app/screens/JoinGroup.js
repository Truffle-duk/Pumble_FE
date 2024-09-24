import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
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
