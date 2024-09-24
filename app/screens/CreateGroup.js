import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";


const CreateGroup = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>새로운 모임 생성하기</Text>
            <Text style={styles.label}>모임 이름</Text>
            <TextInput
                style={styles.input}
                placeholder="모임의 이름을 입력하세요"
            />
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="생성하기"
                    onPress={() => navigation.navigate('GoHome')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    buttonContainer: {
        marginTop: 10,
    }
});

export default CreateGroup;
