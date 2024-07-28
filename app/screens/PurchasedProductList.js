import { theme } from "@assets/Theme";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "@react-navigation/native";

const purchasedProducts = [
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":true,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":true,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":false,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":false,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":true,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":false,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":true,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":true,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":false,
  },
  {
    "Name":"스타벅스 블루베리 치즈 케이크",
    "Date":"2024.01.23",
    "isReceived":false,
  },

]

function Purchased(){
  return(
    <View style={styles.purchasedBtn}>
      <Text style={styles.purchasedBtnText}>구매완료</Text>
    </View>
  )
}

function Receipt(){
  return(
    <View style={styles.receiptBtn}>
      <Text style={styles.receiptBtnText}>수령완료</Text>
    </View>
  )
}

function ProductList({product}){
  return(
    <View style={styles.productContainer}>
      <View style={styles.productDetailContainer}>
        <View style={styles.productImageContainer}></View>
        <View style={styles.productTextContainer}>
          <Text style={styles.productNameText}>{product.Name}</Text>
          <Text style={styles.productPurchasedDateText}>{product.Date}</Text>
        </View>
      </View>
      {product.isReceived?<Receipt/>:<Purchased/>}      
    </View>
  )
}

export default function PurchasedProductList(){
    const [MyPurchasedProducts,setMyPurchasedProducts]=useState([]);

    useEffect(()=>{
      setMyPurchasedProducts(purchasedProducts);
    },[])

    return (
        <ScrollView style={styles.background}>
          <Text style={styles.headText}>구매 상품 내역</Text>
          {
            MyPurchasedProducts.length===0?(
              <View>
                <Text>구매한 상품이 없어요....</Text>
              </View>
            ):(
              MyPurchasedProducts.map((item,index)=>
                <ProductList product={item}/>
              )
            )
          }
          {/* <ProductList List={MyPurchasedProducts}/> */}
        </ScrollView>
      );
  }

const styles=StyleSheet.create({
  background:{
    backgroundColor:theme.color.white,
    paddingTop:30*theme.height,
    paddingHorizontal:16*theme.width,
    paddingBottom:77*theme.height,
  },
  headText:{
    color:theme.color.grey2,
    fontSize:theme.fontSizes.fontSizes18,
    fontFamily:'Pretendard-SemiBold',
    lineHeight:18,
    //marginBottom:10*theme.height,
  },
  purchasedBtn:{
    height:25*theme.height*theme.width,
    width:60*theme.width*theme.height,
    borderRadius:15,
    borderWidth:1,
    borderColor:theme.color.main,
    backgroundColor:theme.color.white,
    alignItems:'center',
    justifyContent:'center',
  },
  purchasedBtnText:{
    fontFamily:"Pretendard-Medium",
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:12*theme.height,
    color:theme.color.main,
  },
  receiptBtn:{
    height:25*theme.height*theme.width,
    width:60*theme.width*theme.height,
    borderRadius:15,
    borderWidth:1,
    borderColor:theme.color.main,
    backgroundColor:theme.color.main,
    alignItems:'center',
    justifyContent:'center',
  },
  receiptBtnText:{
    fontFamily:"Pretendard-Medium",
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:12*theme.height,
    color:theme.color.white,
  },
  productContainer:{
    marginTop:30*theme.height,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  productImageContainer:{
    height:50*theme.height*theme.width,
    width:50*theme.height*theme.width,
    backgroundColor:theme.color.grey6,
    borderRadius:5,
    marginRight:15*theme.width,
  },
  productTextContainer:{
    flexDirection:'column'
  },
  productNameText:{
    color:theme.color.grey2,
    fontSize:theme.fontSizes.fontSizes15,
    fontFamily:'Pretendard-SemiBold',
    lineHeight:15,
    marginBottom:10*theme.height,
  },
  productPurchasedDateText:{
    color:theme.color.grey10,
    fontSize:theme.fontSizes.fontSizes12,
    fontFamily:'Pretendard-Regular',
    lineHeight:12, 
  },
  productDetailContainer:{
    flexDirection:'row',
    alignItems:"center",
  }


})