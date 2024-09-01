import { theme } from "@assets/Theme";
import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Store_GiftCard = () => {
    const navigation = useNavigation();

    const products = [
        {
            id: 1,
            price: '12 pb',
            description: '스타벅스 아이스 아메리카노',
            image: require('../assets/Images/gift_sample.png')
        },
        {
            id: 2,
            price: '15 pb',
            description: '스타벅스 카라멜 마키아또',
            image: require('../assets/Images/gift_sample.png')
        },
        {
            id: 3,
            price: '13 pb',
            description: '스타벅스 카페 모카',
            image: require('../assets/Images/gift_sample.png')
        },
        {
            id: 4,
            price: '20 pb',
            description: '아이스 스타벅스 돌체라떼 T',
            image: require('../assets/Images/gift_sample.png')
        },
        {
            id: 5,
            price: '17 pb',
            description: '스타벅스 블루베리 치즈 케이크',
            image: require('../assets/Images/gift_sample.png')
        },
        {
            id: 6,
            price: '1 pb',
            description: '아이스 스타벅스 돌체라떼 T',
            image: require('../assets/Images/gift_sample.png')
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.productsSection}>
                {products.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        style={styles.productCard}
                        onPress={() => navigation.navigate('Store_Entertainment_Detail', { product })}
                    >
                        <Image source={product.image} style={styles.productImage} />
                        <Text style={styles.productText}>{product.price}</Text>
                        <Text style={styles.productDescription}>{product.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 15,
    },
    productsSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%', // Adjusted to fit two cards in a row with some margin
        marginBottom: 20,
    },
    productImage: {
        width: '100%',
        height: 174 * theme.height,
        borderRadius: 15,
        marginBottom: 10,
    },
    productText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey2,
        alignSelf: 'flex-start',
    },
    productDescription: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes12,
        textAlign: 'center',
        color: theme.color.black,
        alignSelf: 'flex-start',
    },
});

export default Store_GiftCard;
