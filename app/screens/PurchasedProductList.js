import {theme} from "@assets/Theme";
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from "react";
import {call} from "@utils/ApiService";
import {getReceiveHistory, getPurchaseHistory} from "@utils/BlockchainFunction";
import {GroupCall} from "@utils/GroupService";

const purchasedProducts = [
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": true,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": true,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": false,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": false,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": true,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": false,
    },
    {
        "Name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": true,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": true,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": false,
    },
    {
        "name": "스타벅스 블루베리 치즈 케이크",
        "date": new Date(),
        "isReceived": false,
    },

]

function Purchased() {
    return (
        <View style={styles.purchasedBtn}>
            <Text style={styles.purchasedBtnText}>구매완료</Text>
        </View>
    )
}

function Receipt() {
    return (
        <View style={styles.receiptBtn}>
            <Text style={styles.receiptBtnText}>수령완료</Text>
        </View>
    )
}

function ProductList({product}) {
    const image = product.image ? {uri: `${product.image}`} : require('@assets/Images/defaultGift.png')
    return (
        <View style={styles.productContainer}>
            <View style={styles.productDetailContainer}>
                <Image source={image} style={styles.productImageContainer}/>
                <View style={styles.productTextContainer}>
                    <Text style={styles.productNameText}>{product.name}</Text>
                    <Text
                        style={styles.productPurchasedDateText}>{`${product.date.getFullYear()}.${product.date.getMonth() + 1}.${product.date.getDate()}`}</Text>
                </View>
            </View>
            {product.isReceived ? <Receipt/> : <Purchased/>}
        </View>
    )
}

export default function PurchasedProductList() {
    const [histories, setHistories] = useState([])
    const [receiveHistories, setReceiveHistories] = useState([])
    const [organizedList, setOrganizedList] = useState([])
    const [MyPurchasedProducts, setMyPurchasedProducts] = useState([]);

    const initialize = async () => {
        let groupId
        await GroupCall("GID")
            .then(async gid => {
                groupId = gid
            })

        let groupUserId
        await call(`/group/${groupId}/profile`, true, 'GET')
            .then(data => {
                groupUserId = data.result.group_user_id
            })

        await getPurchaseHistory(groupId, groupUserId)
            .then(events => {
                setHistories(events)
            })
            .catch(error => console.error("Error fetching purchase history: ", error));

        await getReceiveHistory(groupId, groupUserId)
            .then(events => {
                setReceiveHistories(events)
            })
            .catch(error => console.error("Error fetching receive history: ", error));
    }

    useEffect(() => {
        initialize()
        //setMyPurchasedProducts(purchasedProducts); //뷰 확인을 위한 데모 데이터
    }, [])

    useEffect(() => {
        if (histories.length > 0 && receiveHistories.length > 0) {
            const mergeList = histories.map(item1 => {
                const found = receiveHistories.find(item2 => item1.args[5] === item2.args[5] && item1.args[6] === item2.args[6])
                if (found) {
                    return {itemId: Number(item1.args[5]), timestamp: item1.args[6], isReceived: true}
                } else {
                    return {itemId: Number(item1.args[5]), timestamp: item1.args[6], isReceived: false}
                }
            })
            setOrganizedList(mergeList)
        } else {
            const mappedList = histories.map(item => {
                return {itemId: Number(item.args[5]), timestamp: item.args[6], isReceived: false}
            })
            setOrganizedList(mappedList)
        }
    }, [receiveHistories]);

    useEffect(() => {
        getItemInfoList(organizedList)
    }, [organizedList]);

    const getItemInfoList = async (itemList) => {
        let groupId
        await GroupCall("GID")
            .then(async gid => {
                groupId = gid
            })

        for (let i = 0; i < itemList.length; i++) {
            await call(`/store/${groupId}/item/${itemList[i].itemId}`, true, 'GET')
                .then(data => {
                    const date = new Date(Number(itemList[i].timestamp) * 1000)
                    const item = {
                        itemId: itemList[i].itemId,
                        name: data.result.name,
                        image: data.result.image,
                        date: date,
                        isReceived: itemList[i].isReceived
                    }
                    setMyPurchasedProducts(prevState => [...prevState, item])
                })
        }
    }

    return (
        <View style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.headText}>구매 상품 내역</Text>
                {
                    MyPurchasedProducts.length === 0 ? (
                        <View>
                            <Text>구매한 상품이 없어요....</Text>
                        </View>
                    ) : (
                        MyPurchasedProducts.reverse().map((item, index) =>
                            <ProductList product={item} key={index}/>
                        )
                    )
                }
                {/* <ProductList List={MyPurchasedProducts}/> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme.color.white,

    },
    scrollContainer: {
        paddingTop: 30 * theme.height,
        paddingHorizontal: 16 * theme.width,
        paddingBottom: 92 * theme.height,
    },
    headText: {
        color: theme.color.grey2,
        fontSize: theme.fontSizes.fontSizes18,
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 18,
        //marginBottom:10*theme.height,
    },
    purchasedBtn: {
        height: 25 * theme.height * theme.width,
        width: 60 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.main,
        backgroundColor: theme.color.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    purchasedBtnText: {
        fontFamily: "Pretendard-Medium",
        fontSize: theme.fontSizes.fontSizes12,
        lineHeight: 12 * theme.height,
        color: theme.color.main,
    },
    receiptBtn: {
        height: 25 * theme.height * theme.width,
        width: 60 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.main,
        backgroundColor: theme.color.main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    receiptBtnText: {
        fontFamily: "Pretendard-Medium",
        fontSize: theme.fontSizes.fontSizes12,
        lineHeight: 12 * theme.height,
        color: theme.color.white,
    },
    productContainer: {
        marginTop: 30 * theme.height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productImageContainer: {
        height: 50 * theme.height * theme.width,
        width: 50 * theme.height * theme.width,
        backgroundColor: theme.color.grey6,
        borderRadius: 5,
        marginRight: 15 * theme.width,
    },
    productTextContainer: {
        flexDirection: 'column'
    },
    productNameText: {
        color: theme.color.grey2,
        fontSize: theme.fontSizes.fontSizes15,
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 15,
        marginBottom: 10 * theme.height,
    },
    productPurchasedDateText: {
        color: theme.color.grey10,
        fontSize: theme.fontSizes.fontSizes12,
        fontFamily: 'Pretendard-Regular',
        lineHeight: 12,
    },
    productDetailContainer: {
        flexDirection: 'row',
        alignItems: "center",
    }
})