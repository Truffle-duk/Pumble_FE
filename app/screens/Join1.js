import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { theme } from "@assets/Theme";

const Join1 = () => {
    const navigation = useNavigation();
    const [allChecked, setAllChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [ageChecked, setAgeChecked] = useState(false);

    // 전체 동의 체크박스 핸들러
    const handleAllChecked = () => {
        const newValue = !allChecked;
        setAllChecked(newValue);
        setTermsChecked(newValue);
        setPrivacyChecked(newValue);
        setAgeChecked(newValue);
    };

    // 개별 체크박스 핸들러
    const handleIndividualCheck = (setter, value) => {
        setter(!value);
    };

    // 위의 세 체크박스 상태가 변경될 때마다 전체 동의 상태를 자동으로 업데이트
    useEffect(() => {
        if (termsChecked && privacyChecked && ageChecked) {
            setAllChecked(true);
        } else {
            setAllChecked(false);
        }
    }, [termsChecked, privacyChecked, ageChecked]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}>
                <Image source={require('@assets/Icons/backArrow2.png')}
                style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>약관 동의하기</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={termsChecked}
                    onValueChange={() => handleIndividualCheck(setTermsChecked, termsChecked)}
                    tintColors={{ true: theme.color.main, false: theme.color.grey6 }} // 색상 추가
                />
                <Text style={styles.label}>서비스 이용 약관 (필수)</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={privacyChecked}
                    onValueChange={() => handleIndividualCheck(setPrivacyChecked, privacyChecked)}
                    tintColors={{ true: theme.color.main, false: theme.color.grey6 }} // 색상 추가
                />
                <Text style={styles.label}>개인정보 수집 및 이용 동의 (필수)</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={ageChecked}
                    onValueChange={() => handleIndividualCheck(setAgeChecked, ageChecked)}
                    tintColors={{ true: theme.color.main, false: theme.color.grey6 }} // 색상 추가
                />
                <Text style={styles.label}>만 14세 이상 확인 (필수)</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={allChecked}
                    onValueChange={handleAllChecked}
                    tintColors={{ true: theme.color.main, false: theme.color.main }} // 색상 추가
                />
                <Text style={styles.label}>전체 동의</Text>
            </View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: allChecked ? theme.color.main : theme.color.grey6 }]}
                onPress={() => {
                    if (allChecked) {
                        navigation.navigate('Join2');
                    }
                }}
                disabled={!allChecked}
            >
                <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        padding : 20
    },
    title: {
        marginTop : 30*theme.height,
        marginBottom: 40*theme.height,
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes26,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',  // 'left' -> 'center' 또는 'flex-start'
        marginBottom: 15,      // 체크박스 항목 간의 간격 조정

    },
    label: {
        color: theme.color.grey10,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
        marginLeft: 10,        // 체크박스와 텍스트 사이 간격 조정
    },
    button: {
        position: 'absolute',
        bottom: 70 * theme.height,
        left : 16*theme.width,
        alignItems: 'center',
        borderRadius: 5,
        width: 358*theme.width,
        height: 50 * theme.height,
        justifyContent: 'center', // 버튼 안의 텍스트를 가운데 정렬
    },
    buttonText: {
        color: theme.color.white,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
    },
    backIcon:{
        width:26*theme.height*theme.width,
        height:26*theme.height*theme.width,
    }
});

export default Join1;
