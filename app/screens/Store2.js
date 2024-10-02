import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { theme } from "@assets/Theme";
import {call} from "@utils/ApiService";

const Store2 = ({navigation}) => {
    const [selectedTab, setSelectedTab] = useState('cafe');
    const [items, setItems] = useState([])

    useEffect(() => {
        const api = `/store/1/list?category=${selectedTab}`
        call(api, true, 'GET')
            .then(data => {
                setItems(data.result.items)
            })
    }, [selectedTab]);

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('cafe')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === 'cafe' && styles.activeTabText]}>커피/디저트</Text>
                            {selectedTab === 'cafe' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('fast-food')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === 'fast-food' && styles.activeTabText]}>외식/프랜차이즈</Text>
                            {selectedTab === 'fast-food' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('ticket')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === 'ticket' && styles.activeTabText]}>상품권/면제권</Text>
                            {selectedTab === 'ticket' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('entertain')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === 'entertain' && styles.activeTabText]}>엔터테인</Text>
                            {selectedTab === 'entertain' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('etc')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === 'etc' && styles.activeTabText]}>기타</Text>
                            {selectedTab === 'etc' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.productsSection}>
                    <Text style={styles.sectionTitle}>전체 상품</Text>
                    {items.length !== 0 ?
                        items.map((item, idx) => {
                            if (idx % 2 === 0) {
                                const image1 = item && item.image ? {uri: item.image} : require('@assets/Images/defaultGift.png')
                                const image2 = items[idx + 1] && items[idx + 1].image ? {uri: items[idx + 1].image} : require('@assets/Images/defaultGift.png')

                                return <View key={idx} style={styles.productRow}>
                                    <TouchableOpacity key={item.itemId} style={styles.productCard} onPress={() => navigation.navigate("ItemDetail", {itemId: item.itemId, category: selectedTab})}>
                                        <Image source={image1} style={styles.productImage}/>
                                        <Text style={styles.productText}>{item.price + ' pb'}</Text>
                                        <Text style={styles.productDescription}>{item.name}</Text>
                                    </TouchableOpacity>
                                    {items[idx + 1] && (
                                        <TouchableOpacity key={items[idx + 1].itemId} style={styles.productCard} onPress={() => navigation.navigate("ItemDetail", {itemId: items[idx + 1].itemId, category: selectedTab})}>
                                            <Image source={image2} style={styles.productImage}/>
                                            <Text
                                                style={styles.productText}>{items[idx + 1].price + ' pb'}</Text>
                                            <Text style={styles.productDescription}>{items[idx + 1].name}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            }
                        }) : <View/>
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.white,
        paddingBottom: 77 * theme.height,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: theme.color.grey1,
        marginBottom: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tabContent: {
        alignItems: 'center',
    },
    tabText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey1,
    },
    activeTabText: {
        color: theme.color.black,
    },
    activeTabUnderline: {
        height: 2,
        backgroundColor: theme.color.black,
        marginTop: 5,
        width: '100%',
    },
    scrollContainer: {
        paddingHorizontal: 15,
    },
    productsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        color: theme.color.grey2,
        marginBottom: 10,
    },
    productCard: {
        width: 175 * theme.width,
        marginBottom: 20,
    },
    productImage: {
        width: 175 * theme.width,
        height: 175 * theme.width,
        borderRadius: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#00000022'
    },
    productText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey2,
        alignSelf: 'flex-start',
    },
    productDescription: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes13,
        textAlign: 'center',
        color: theme.color.black,
        alignSelf: 'flex-start',
    },
    productRow : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default Store2;
