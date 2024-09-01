import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from "@assets/Theme"; // Assuming you have a theme file

const { width: screenWidth } = Dimensions.get('window');

const Store_Entertainment_Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [money, setMoney] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={product.image} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.categoryText}>커피/디저트</Text>
                    <Text style={styles.productTitle}>{product.description}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.productDescription}>
                        진한 치즈케이크 위에 새콤달콤한 블루베리를 가득 올린 스타벅스의 시그니처 케이크 입니다.
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleModal}>
                        <Text style={styles.buttonText}>구매하기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Image
                        source={money
                            ? require('../assets/Images/present.png')
                            : require('../assets/Images/fail.png')
                        }
                        style={styles.modalImage}
                    />
                    <Text style={styles.modalTitle}>
                        {money ? "구매가 완료되었습니다!" : "구매를 실패했어요..."}
                    </Text>
                    <Text style={styles.modalDescription}>
                        {money ? "모임 운영진에게서 상품을 수령하세요!" : "보유 이더를 확인해주세요!"}
                    </Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        paddingBottom: 77 * theme.height,
    },
    content: {
        paddingBottom: 77 * theme.height,
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 22 * theme.height,
        width: 390 * theme.width,
        height: 390 * theme.height,
    },
    productImage: {
        width: 390 * theme.width,
        height: 390 * theme.height,
        resizeMode: 'contain',
    },
    productInfo: {
        marginBottom: 30 * theme.height,
        paddingHorizontal: 20, // 여유 공간을 위해 패딩 추가
    },
    categoryText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey5,
        marginBottom: 5,
    },
    productTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.grey2,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    productPrice: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.grey2,
        marginBottom: 10,
    },
    productDescription: {
        fontFamily: 'Roboto-Regular',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey1,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center', // 버튼을 가운데 정렬
    },
    button: {
        backgroundColor: theme.color.main,
        width: 358 * theme.width,
        height: 52 * theme.height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.white,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        paddingBottom: 77 * theme.height,
    },
    modalContent: {
        backgroundColor: theme.color.white,
        padding: 20,
        borderRadius: 10,
        height: 390 * theme.height,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 18,
        color: theme.color.grey1,
    },
    modalImage: {
        width: 248 * theme.width,
        height: 248 * theme.height,
        marginBottom: 20,
    },
    modalTitle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes20,
        color: theme.color.grey2,
        marginBottom: 10,
    },
    modalDescription: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey10,
        textAlign: 'center',
    },
});

export default Store_Entertainment_Detail;
