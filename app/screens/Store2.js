import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { theme } from "@assets/Theme";

import Store_CoffeeDessert from '@screens/Store_CoffeeDessert';
import Store_FoodFranchise from '@screens/Store_FoodFranchise';
import Store_GiftCard from '@screens/Store_GiftCard';
import Store_Entertainment from '@screens/Store_Entertainment';
import Store_Ect from '@screens/Store_Ect';

const Store2 = () => {
    const route = useRoute();
    const { initialTab } = route.params || { initialTab: 'default' };


    const [selectedTab, setSelectedTab] = useState(initialTab || '커피/디저트');

    useEffect(() => {
        if (initialTab) {
            setSelectedTab(initialTab);
        }
    }, [initialTab]);

    const renderSelectedTab = () => {
        switch (selectedTab) {
            case '커피/디저트':
                return <Store_CoffeeDessert />;
            case '외식/프랜차이즈':
                return <Store_FoodFranchise />;
            case '상품권/면제권':
                return <Store_GiftCard />;
            case '엔터테인':
                return <Store_Entertainment />;
            case '기타' :
                return <Store_Ect />;
            default:
                return <Store_CoffeeDessert />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('커피/디저트')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === '커피/디저트' && styles.activeTabText]}>커피/디저트</Text>
                            {selectedTab === '커피/디저트' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('외식/프랜차이즈')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === '외식/프랜차이즈' && styles.activeTabText]}>외식/프랜차이즈</Text>
                            {selectedTab === '외식/프랜차이즈' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('상품권/면제권')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === '상품권/면제권' && styles.activeTabText]}>상품권/면제권</Text>
                            {selectedTab === '상품권/면제권' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('엔터테인')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === '엔터테인' && styles.activeTabText]}>엔터테인</Text>
                            {selectedTab === '엔터테인' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('기타')}>
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabText, selectedTab === '기타' && styles.activeTabText]}>기타</Text>
                            {selectedTab === '기타' && <View style={styles.activeTabUnderline} />}
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.productsSection}>
                    <Text style={styles.sectionTitle}>전체 상품</Text>
                    {renderSelectedTab()}
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
});

export default Store2;
