import { theme } from "@assets/Theme";
import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const Store = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.banner}>
                    <Image
                        source={require('../assets/Images/store_banner.png')}
                        style={styles.bannerImage}
                    />
                </View>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Store2', { initialTab: '커피/디저트' })}>
                        <Image source={require('../assets/Icons/coffe.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>커피/디저트</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Store2', { initialTab: '외식/프랜차이즈' })}>
                        <Image source={require('../assets/Icons/hamburger.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>프랜차이즈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Store2', { initialTab: '상품권/면제권' })}>
                        <Image source={require('../assets/Icons/ticket.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>상품/면제권</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Store2', { initialTab: '엔터테인' })}>
                        <Image source={require('../assets/Icons/game.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>엔터테인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Store2', { initialTab: '기타' })}>
                        <Image source={require('../assets/Icons/shoppingbag.png')} style={styles.icon} />
                        <Text style={styles.iconLabel}>기타</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productsSection}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.sectionTitle}>최신 상품</Text>
                        <TouchableOpacity style={styles.moreButton} onPress={() => navigation.navigate('Store2')}>
                            <Text style={styles.moreButtonText}>더보기 ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productRow}>
                        <View style={styles.productCard}>
                            <Image
                                source={require('../assets/Images/ice_sample.png')}
                                style={styles.productImage}
                            />
                            <Text style={styles.productText}>12 pb</Text>
                            <Text style={styles.productDescription}>스타벅스 아이스 아메리카노</Text>
                        </View>
                        <View style={styles.productCard}>
                            <Image
                                source={require('../assets/Images/ice_sample.png')}
                                style={styles.productImage}
                            />
                            <Text style={styles.productText}>10 pb</Text>
                            <Text style={styles.productDescription}>스타벅스 아이스 아메리카노</Text>
                        </View>
                    </View>
                    <View style={styles.productRow}>
                        <View style={styles.productCard}>
                            <Image
                                source={require('../assets/Images/ice_sample.png')}
                                style={styles.productImage}
                            />
                            <Text style={styles.productText}>12 pb</Text>
                            <Text style={styles.productDescription}>스타벅스 아이스 아메리카노</Text>
                        </View>
                        <View style={styles.productCard}>
                            <Image
                                source={require('../assets/Images/ice_sample.png')}
                                style={styles.productImage}
                            />
                            <Text style={styles.productText}>10 pb</Text>
                            <Text style={styles.productDescription}>스타벅스 아이스 아메리카노</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        paddingBottom: 77 * theme.height
    },
    scrollContainer: {
        paddingHorizontal: 15,
    },
    banner: {
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerImage: {
        width: 390 * theme.width,
        height: 294 * theme.height,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 50 * theme.width,
        height: 50 * theme.height,
    },
    iconLabel: {
        fontSize: theme.fontSizes.fontSizes11,
        fontFamily: 'Pretendard-Medium',
        textAlign: 'center',
    },
    productsSection: {
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey2,
        marginBottom: 10,
    },
    moreButton: {
        backgroundColor: theme.color.white,
    },
    moreButtonText: {
        fontFamily: 'Pretendard-Regular',
        color: theme.color.grey10,
        textAlign: 'center',
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productCard: {
        width: 174 * theme.width,
        height: 223 * theme.height,
        borderRadius: 15,
        alignItems: 'center',
    },
    productImage: {
        width: 174 * theme.width,
        height: 174 * theme.height,
        borderRadius: 15,
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

export default Store;
