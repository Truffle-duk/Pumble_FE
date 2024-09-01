import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const NoticeDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { notice } = route.params;

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{notice.title}</Text>
            <View style={styles.authorDateContainer}>
                <Text style={styles.author}>{notice.author}</Text>
                <Text style={styles.date}>{notice.date}</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.content}>공지사항의 본문 내용이 여기에 표시됩니다.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        padding: 20,
    },
    title: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.grey10,
        textAlign: 'left',
        marginVertical: 10,
    },
    authorDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    author: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey1,
    },
    date: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey1,
    },
    separator: {
        borderBottomColor: theme.color.grey6,
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    content: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
    },
});

export default NoticeDetail;
