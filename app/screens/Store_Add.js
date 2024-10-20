import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { theme } from "@assets/Theme";

const Store_Add = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [imageUri, setImageUri] = useState(null);

    // 사진 선택 함수
    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
            }
        });
    };

    // 이미지 삭제 함수
    const handleImageRemove = () => {
        setImageUri(null);
    };

    const handleCompletePress = () => {
        // 상품 등록 로직
        console.log('상품 이름:', productName);
        console.log('상품 설명:', productDescription);
        console.log('상품 가격:', productPrice);
        console.log('첨부된 이미지 URI:', imageUri);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.label}>상품 이름</Text>
                <TextInput
                    style={styles.input}
                    placeholder="상품의 이름을 입력해주세요"
                    value={productName}
                    onChangeText={setProductName}
                />

                <Text style={styles.label}>상품 설명</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="상품의 상세 설명을 입력해주세요."
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline={true}
                />

                <Text style={styles.label}>상품 가격:</Text>
                <View style={styles.priceContainer}>
                    <TextInput
                        style={styles.priceInput}
                        value={productPrice}
                        onChangeText={setProductPrice}
                        keyboardType="numeric"
                    />
                    <Text style={styles.priceLabel}>PB</Text>
                </View>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
                    <Image
                        source={require('../assets/Icons/blackadd.png')}
                        style={styles.imageIcon}
                    />
                    <Text style={styles.imagePickerText}>사진 첨부하기</Text>
                </TouchableOpacity>

                {imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.imageFileName}>{imageUri.split('/').pop()}</Text>
                        <TouchableOpacity onPress={handleImageRemove}>
                            <Image
                                source={require('../assets/Icons/x.png')} // X 이미지 추가
                                style={styles.removeImage}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity style={styles.completeButton} onPress={handleCompletePress}>
                    <Text style={styles.completeButtonText}>완료</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        padding: 20 * theme.width,
    },
    label: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey10,
        marginBottom: 10 * theme.height,
    },
    input: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey1,
        borderWidth: 1,
        borderColor: theme.color.grey6,
        borderRadius: 15,
        marginBottom: 20 * theme.height,
        paddingLeft: 20 * theme.width,
    },
    textArea: {
        height: 126 * theme.height,
        textAlignVertical: 'top',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20 * theme.height,
        justifyContent: 'flex-end',
    },
    priceInput: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey1,
        borderBottomWidth: 1,
        borderBottomColor: theme.color.grey1,
        paddingVertical: 5,
        width: 100 * theme.width,
        marginRight: 10 * theme.width,
        textAlign: 'right',
    },
    priceLabel: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey1,
        lineHeight: 30,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: theme.color.grey6,
        marginBottom: 20 * theme.height,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageIcon: {
        width: 22 * theme.width,
        height: 22 * theme.height,
        marginRight: 10,
    },
    imagePickerText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey10,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: theme.color.background,
        padding: 10,
        borderRadius: 15,
    },
    imageFileName: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
        flex: 1,
    },
    removeImage: {
        width: 24 * theme.width,
        height: 24 * theme.height,
    },
    completeButton: {
        backgroundColor: theme.color.main,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    completeButtonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.white,
    },
});

export default Store_Add;
