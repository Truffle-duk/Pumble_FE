import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";


const CreateGroup = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
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
            />
            <Text style={styles.helperText}>* 최대 12자까지</Text>
            <Text style={styles.inputLabel}>비밀번호</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.color.grey1}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
            />
            <Text style={styles.helperText}>* 영문, 숫자, 특수문자를 포함한 8자리 이상</Text>
            <Text style={styles.inputLabel}>비밀번호 확인</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.color.grey1}
                placeholder="비밀번호를 다시 입력하세요"
                secureTextEntry
            />
            
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('GoHome')}
                //disabled={!isFormComplete}
            >
                <Text style={styles.buttonText}>생성하기</Text>
            </TouchableOpacity>
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
        borderRadius: 5,
        paddingHorizontal: 20*theme.width,
        //paddingVertical: 14*theme.width,
        fontSize: theme.fontSizes.fontSizes16,
        backgroundColor: theme.color.background,
        color: theme.color.grey10,
    },
    helperText: {
        color: theme.color.grey6,
        fontSize: theme.fontSizes.fontSizes12,
        marginTop: 5 * theme.height,
    },
    button: {
        position: 'absolute',
        left: 16 * theme.width,
        bottom: 107 * theme.height,
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
