import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from "@assets/Theme";

const Store_Check = () => {
    const [products, setProducts] = useState([
        { id: 1, name: '스타벅스 블루베리 치즈 케이크', seller: '권진 더 쿨 팽권', date: '2024.01.23', status: '수령완료' },
        { id: 2, name: '스타벅스 블루베리 치즈 케이크', seller: '권진 더 쿨 팽권', date: '2024.01.23', status: '구매완료' },
        { id: 3, name: '스타벅스 블루베리 치즈 케이크', seller: '권진 더 쿨 팽권', date: '2024.01.23', status: '구매완료' },
        { id: 4, name: '스타벅스 블루베리 치즈 케이크', seller: '권진 더 쿨 팽권', date: '2024.01.23', status: '구매완료' },
        { id: 5, name: '스타벅스 블루베리 치즈 케이크', seller: '권진 더 쿨 팽권', date: '2024.01.23', status: '구매완료' },
    ]);

    const handlePurchaseComplete = (id) => {
        Alert.alert('구매 완료', '구매가 완료되었습니다.');
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, status: '수령완료' } : product
            )
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.pageTitle}>상품 수령 내역</Text>
                {products.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <Image
                            source={require('../assets/Images/store_blank.png')}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <View style={styles.productMetaData}>
                                <Text style={styles.productSeller}>{product.seller}</Text>
                                <Text style={styles.productDate}>{product.date}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.statusButton,
                                product.status === '구매완료' ? styles.completeButton : styles.receivedButton
                            ]}
                            onPress={() => handlePurchaseComplete(product.id)}
                            disabled={product.status === '수령완료'}
                        >
                            <Text style={styles.statusButtonText}>{product.status}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    pageTitle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey2,
        marginBottom: 30*theme.height,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 358 * theme.width,
        height: 50 * theme.height,
        marginBottom: 37*theme.height,
        backgroundColor: theme.color.white,
        borderColor: theme.color.white,
    },
    productImage: {
        width: 50 * theme.width,
        height: 50 * theme.height,
        borderRadius: 8,
        marginRight: 15,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
    },
     productMetaData: {
            flexDirection: 'row',
     },
    productSeller: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey2,
        marginRight: 10 * theme.width,
    },
    productDate: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey10,
    },
    statusButton: {
        width: 57 * theme.width,
        height: 25 * theme.height,
        borderRadius: 15,
        marginRight : 16*theme.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completeButton: {
        backgroundColor: theme.color.main,
    },
    receivedButton: {
        backgroundColor: theme.color.grey1,
    },
    statusButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.white,
    },
});

export default Store_Check;
