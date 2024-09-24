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
                onPress={() => navigation.navigate('JoinGroup')}
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

        alignItems: 'center',
        backgroundColor: theme.color.white,
    },
    title: {
        marginTop : 100*theme.height,
        color: theme.color.main,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes32,
    },
    subtitle: {
        marginTop : 25*theme.height,
        color: theme.color.grey10,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
    },
    image: {
        width: 330*theme.width*theme.height,
        height: 330*theme.height*theme.width,
        marginBottom: 30,
    },
    button: {
        position: 'absolute',
        bottom: 70 * theme.height,
        left: 16*theme.width,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        width: 358 * theme.width,
        height: 50 * theme.height,
        backgroundColor : theme.color.main,
    },
    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
});

export default Start;
