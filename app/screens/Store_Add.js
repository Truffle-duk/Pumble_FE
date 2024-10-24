import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { theme } from "@assets/Theme";
import { call } from '@utils/ApiService';

const category=[
    {
        "name":"커피/디저트",
        "tag":"cafe",
    },
    {
        "name":"프렌차이즈",
        "tag":"franchise",
    },
    {
        "name":"상품/면제권",
        "tag":"voucher",
    },
    {
        "name":"엔터테인",
        "tag":"entertain",
    },
    {
        "name":"기타",
        "tag":"etc",
    },
]

const Store_Add = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [productCategory, setProductCategory]=useState('');

    const isFormComplete= productName !== "" && productDescription !== "" && productPrice !== "" && productCategory !== "";
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
        console.log('카테고리: ', productCategory)
        console.log('첨부된 이미지 URI:', imageUri);

        if (isFormComplete) {
            const api=`/store/1`
            const request={
                name: productName,
                category:productCategory,
                price: productPrice,
                description: productDescription               
            }
            call(api, true, 'POST', request)
                .then(data =>{
                    if(data.code === 200) {
                        alert('상품이 등록되었습니다!');
                    }else{
                        alert('상품 등록을 실패하였습니다');
                    }
                })

        } else {
            alert('폼을 다시 확인해주세요!');
        }       

    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.label}>상품 이름</Text>
                <TextInput
                    style={styles.input}
                    placeholder="상품의 이름을 입력해주세요"
                    value={productName}
                    placeholderTextColor={theme.color.grey1}
                    textAlignVertical='center'
                    onChangeText={setProductName}
                />

                <Text style={styles.label}>상품 설명</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="상품의 상세 설명을 입력해주세요."
                    placeholderTextColor={theme.color.grey1}
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline={true}
                />
                <Text style={styles.label}>카테고리</Text>
                <View style={styles.scrollViewContainer}>
                <ScrollView horizontal={true} contentContainerStyle={styles.categoryContaier} showsHorizontalScrollIndicator={false}>
                    {category.map((data, index)=>
                        <TouchableOpacity style={data.tag===productCategory? styles.categoryBtnSelected: styles.categoryBtn}
                            onPress={() => setProductCategory(data.tag)}>
                            <Text style={data.tag===productCategory? styles.categoryTextSelected: styles.categoryText}>{data.name}</Text>
                       </TouchableOpacity>
                    )}
                </ScrollView>
                </View>
                

                
                <Text style={styles.label}>상품 가격:</Text>
                <View style={styles.priceContainer}>
                    <TextInput
                        style={styles.priceInput}
                        value={productPrice}
                        maxLength={4}
                        placeholder="0"
                        placeholderTextColor={theme.color.grey1}
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
        lineHeight:16*theme.height,
        marginLeft:4*theme.width,
        marginBottom: 10 * theme.height,
    },
    input: {
        height:40*theme.height,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey2,
        borderWidth: 1,
        borderColor: theme.color.grey6,
        borderRadius: 15,
        marginBottom: 25 * theme.height,
        paddingLeft: 20 * theme.width,
        paddingVertical:0
    },
    textArea: {
        height: 126 * theme.height,
        textAlignVertical: 'top',
        paddingVertical:10*theme.height
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25 * theme.height,
        justifyContent: 'flex-end',
    },
    priceInput: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey2,
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
    scrollViewContainer:{
        height:40*theme.height,
        marginBottom: 25 * theme.height,
        alignItems:'center',
    },
    categoryContaier:{
        flexDirection:'row',        
        alignItems:'center',
        
    },
    categoryBtn:{
        height: 30 * theme.height * theme.width,
        width: 75 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.grey1,
        backgroundColor: theme.color.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:20*theme.width,
    },
    categoryText:{
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey1,
    },
    categoryBtnSelected:{
        height: 30 * theme.height * theme.width,
        width: 75 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.main,
        backgroundColor: theme.color.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:20*theme.width,
    },
    categoryTextSelected:{
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.main,
    }
});

export default Store_Add;
