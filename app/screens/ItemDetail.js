import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, Animated, TextInput} from 'react-native';
import { theme } from "@assets/Theme";
import {call} from "@utils/ApiService";

const { width: screenWidth } = Dimensions.get('window');
const imageSize = screenWidth

const ItemDetail = ({route}) => {
    const {itemId, category} = route.params
    const [isModalVisible, setModalVisible] = useState(false);
    const [product, setProduct] = useState({name: "", price: 0, image: null, itemId: 0})
    const [money, setMoney] = useState(true);
    const [itemCategory, setItemCategory] = useState("")

    useEffect(() => {
        switch (category) {
            case 'cafe':
                setItemCategory('카페/디저트')
                break
            case 'fast-food':
                setItemCategory('프렌차이즈')
                break
            case 'ticket':
                setItemCategory('상품/면제권')
                break
            case 'entertain':
                setItemCategory('엔터테인')
                break
            case 'etc':
                setItemCategory('기타')
                break
        }

        const api = `/store/1/item/${itemId}`
        call(api, true, 'GET')
            .then(data => {
                setProduct(data.result)
            })
            .catch(err => {
                console.log("Error occurred at ItemDetail: " + err)
            })
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const image = product.image ? {uri: `${product.image}`} : require('@assets/Images/defaultGift.png')

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.categoryText}>{itemCategory}</Text>
                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price + ' pb'}</Text>
                    <Text style={styles.productDescription}>
                        원두의 풍미가 가득한 스타벅스의 아메리카노를 시원하게 즐겨보세요.
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleModal}>
                        <Text style={styles.buttonText}>구매하기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal transparent={true} visible={isModalVisible} animationType="None" onRequestClose={toggleModal}>
                <TouchableOpacity onPress={toggleModal} activeOpacity={1} style={styles.overlayBackground}>
                    <Animated.View style={styles.overlayContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                                <Text style={styles.closeButtonText}>×</Text>
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
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

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
        width: imageSize,
        height: imageSize,
    },
    productImage: {
        width: imageSize,
        height: imageSize
    },
    productInfo: {
        marginBottom: 30 * theme.height,
        paddingHorizontal: 20,
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
        padding: 10,
        borderRadius: 10,
        height: 390 * theme.height,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: theme.fontSizes.fontSizes36,
        color: theme.color.grey4,
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
    overlayBackground: {
        flex: 1,
        justifyContent: 'flex-end', // 하단 정렬
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    overlayContainer: {
        backgroundColor: theme.color.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 10 * theme.width,
        paddingBottom: 50 * theme.height,
    },
});

export default ItemDetail