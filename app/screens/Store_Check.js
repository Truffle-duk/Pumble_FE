import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from "@assets/Theme";
import {getReceiveHistoryAll, getPurchaseHistoryAll, receiveItem} from "@utils/BlockchainFunction";
import {call} from "@utils/ApiService";

const Store_Check = () => {
    const [purchaseList, setPurchaseList] = useState([])
    const [receiveList, setReceiveList] = useState([])
    const [organizedList, setOrganizedList] = useState([])
    const [finalList, setFinalList] = useState([])

    useEffect(() => {
        /*getPurchaseHistoryAll(1)
            .then(events => {
                setPurchaseList(events)
            })
            .catch(error => console.error("Error fetching purchase history: ", error));

        getReceiveHistoryAll(1)
            .then(events => {
                setReceiveList(events)
            })
            .catch(error => console.error("Error fetching receive history: ", error));*/

    }, []);

    useEffect(() => {
        if (purchaseList.length > 0 && receiveList.length > 0) { // 구매 내역, 수령 내역 둘 다 값이 있을 때만 새 배열 생성
            const mergeList = purchaseList.map(item1 => {
                const found = receiveList.find(item2 => item1.args[5] === item2.args[5] && item1.args[6] === item2.args[6])
                if (found) {
                    return {itemId: Number(item1.args[5]), timestamp: item1.args[6], isReceived: true, buyerId: Number(item1.args[4])}
                } else {
                    return {itemId: Number(item1.args[5]), timestamp: item1.args[6], isReceived: false, buyerId: Number(item1.args[4])}
                }
            })
            setOrganizedList(mergeList)

        } else {
            const mappedList = purchaseList.map(item => {
                return {itemId: Number(item.args[5]), timestamp: item.args[6], isReceived: false, buyerId: Number(item.args[4])}
            })
            setOrganizedList(mappedList)
        }
    }, [receiveList]);

    useEffect(() => {
        if (organizedList.length > 0) {
            getItemInfoList(organizedList)
        }
    }, [organizedList]);

    const getItemInfoList = async (itemList) => {
        for (let i = 0; i < itemList.length; i++) {
            let nickname
            await call(`/store/1/buyer/${itemList[i].buyerId}`, true, 'GET')
                .then(data => {
                    nickname = data.result.nickname
                })
            await call(`/store/1/item/${itemList[i].itemId}`, true, 'GET')
                .then(data => {
                    const item = {
                        itemId: itemList[i].itemId,
                        name: data.result.name,
                        image: data.result.image,
                        timestamp: itemList[i].timestamp,
                        isReceived: itemList[i].isReceived,
                        buyerName: nickname
                    }
                    setFinalList(prevState => [...prevState, item])
                })
        }
    }

    const handlePurchaseComplete = async (id, timestamp) => {
        /*await receiveItem (1, 2, timestamp)
            .then(log => {
                if (log === "Success!") {
                    alert('수령 완료', '수령 완료 처리되었습니다.');
                    setFinalList((prevProducts) =>
                        prevProducts.map((product) =>
                            product.itemId === id ? { ...product, isReceived: true } : product
                        )
                    );
                }
            })*/
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.pageTitle}>상품 수령 내역</Text>
                {finalList.map((product, index) => {
                    const image = product.image ? {uri: `${product.image}`} : require('@assets/Images/defaultGift.png')
                    const date = new Date(Number(product.timestamp) * 1000)
                    return (
                        <View key={index} style={styles.productContainer}>
                            <Image
                                source={image}
                                style={styles.productImage}
                            />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <View style={styles.productMetaData}>
                                    <Text style={styles.productSeller}>{product.buyerName}</Text>
                                    <Text style={styles.productDate}>{`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    product.isReceived ? styles.receivedButton : styles.completeButton
                                ]}
                                onPress={() => handlePurchaseComplete(product.id, product.timestamp)}
                                disabled={product.isReceived}
                            >
                                <Text style={styles.statusButtonText}>{product.isReceived ? "수령 완료" : "수령 처리"}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
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
