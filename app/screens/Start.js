import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const Start = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Alarm5 페이지에서 전달된 닉네임 사용
    const { nickname } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nickname}님 환영해요!</Text>
            <Text style={styles.subtitle}>펌블과 함께 모임 활동에 참여해보세요!</Text>

            {/* 펭귄 이미지 */}
            <Image
                source={require('../assets/Images/congratulation1.png')}
                style={styles.image}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('JoinGroup')} // Alarm7 페이지로 이동
            >
                <Text style={styles.buttonText}>모임 참여하기</Text>
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
        color: '#4A90E2',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Start;
