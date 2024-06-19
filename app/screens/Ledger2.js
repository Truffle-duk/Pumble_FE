import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { theme } from "@assets/Theme";

// struct Transaction {
//     uint256 amount;
//     bool isDeposit; // true for deposit, false for withdrawal
//     string counterparty
//     string description;
//     uint256 timestamp;
//     string receiptDetails;
// }  

//dummy data
const groupBalance = 1000000
const groupTransactionHistory=[
    {
        "counterparty":"별다방",
        "isDeposit":false,
        "description": "",  
        "amount": 45000,
        "timestamp": "2024-02-21 16:24",    //타임 스탬프의 형식은 임의 지정
        "receiptDetails":""                 
    },
    {
        "counterparty":"빽다방",
        "isDeposit":false,
        "description": "",
        "amount": 55000,
        "timestamp": "2024-02-20 13:14",
        "receiptDetails":"111"              //추후 영수증 사진 url 형식 검증
    },
    {
        "counterparty":"이디야",
        "isDeposit":false,
        "description": "",
        "amount": 32000,
        "timestamp": "2024-01-21 13:02",
        "receiptDetails":"555"
    },
    {
        "counterparty":"별다방",
        "isDeposit":false,
        "description": "",
        "amount": 45000,
        "timestamp": "2024-02-21 16:24",
        "receiptDetails":""
    },
    {
        "counterparty":"별다방2",
        "isDeposit":false,
        "description": "",
        "amount": 45000,
        "timestamp": "2024-02-21 16:24",
        "receiptDetails":""
    },
    {
        "counterparty":"별다방3",
        "isDeposit":false,
        "description": "",
        "amount": 45000,
        "timestamp": "2024-02-21 16:24",
        "receiptDetails":""
    }


]

function Ledger2({navigate}){
    const [balance, setBalance]=useState(2344440);
    const [datas,setDatas]=useState([]);

    useEffect(()=>{
        setBalance(groupBalance);
        setDatas(groupTransactionHistory);
    },[])
    
    

    return (
        <ScrollView contentContainerStyle={styles.background}>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceHeadText}>공금 잔액</Text>
                <Text style={styles.ledgerText}>{balance}원</Text>
            </View>
            <View style={styles.transactionHistoryContainer}>
                <View style={styles.transactionHistoryHeaderContainer}>
                    <Text style={styles.transactionHistoryHeaderText}>상세 내역</Text>
                    <Text style={styles.transactionHistoryFilterText}>1개월</Text>
                </View>
                
                {
                    datas.length===0?(
                        <View style={styles.activityIndicatorView}>
                            <ActivityIndicator color={theme.color.grey1} size="large"/>
                        </View>
                    ):(
                        datas.map((data, index)=>
                            <View key={index} style={styles.historyItemContainer}>
                                <Text style={styles.historyItemDateText}>{data.timestamp.split(" ")[0].split("-")[1]}월 {data.timestamp.split(" ")[0].split("-")[2]}일</Text>
                                <View style={styles.historyItemDetailContainer}>
                                    {/* 이미지 삽입 */}
                                    <View style={styles.historyItemViewDetail}>
                                        <View style={styles.historyItemImage}/> 
                                        <View>
                                            <Text style={styles.counterpartyText}>{data.counterparty}</Text>
                                            <Text style={styles.timeText}>{data.timestamp.split(" ")[1]}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.historyItemViewDetail}>
                                        {data.isDeposit? <Text style={styles.amountText}>{data.amount}원</Text>
                                            : <Text style={styles.amountText}>-{data.amount}원</Text>}
                                        {/* 영수증디테일이 빈 문자열이면 체크 아이콘 회색,아니면 메인컬러 */}
                                        {/* {data.receiptDetails===""?<Image />} */}
                                        <Image
                                            source= {data.receiptDetails==="" ? require("../assets/Icons/receiptCheckIcon_Inactive.png")
                                                :require("../assets/Icons/receiptCheckIcon_Active.png")
                                            }
                                            style={styles.iconStyle}
                                        />
                                    </View>
                                    
                                </View>
                            </View>
                        )
                    )
                }
            </View>
            

        </ScrollView>
        
        );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor:theme.color.background,
    paddingBottom:77*theme.height,
    paddingHorizontal:16*theme.width,
    paddingTop:30*theme.height,
  },
  balanceHeadText:{
    color:theme.color.main,
    fontSize:theme.fontSizes.fontSizes20,
    fontFamily:'Pretendard-SemiBold',
    marginLeft:15*theme.width,
    marginTop:18*theme.height,
    marginBottom:5*theme.height,
    lineHeight:22*theme.height,
  },
  ledgerText:{
    fontFamily:'Pretendard-ExtraBold',
    fontSize:theme.fontSizes.fontSizes20,
    color: theme.color.grey2,
    marginLeft:15*theme.width,
    marginBottom:18*theme.height,
    marginTop:5*theme.height,
    lineHeight:22*theme.height,
  },
  balanceContainer:{
    backgroundColor:theme.color.white,
    marginBottom:30*theme.height,
    height:90*theme.height,
    borderRadius:15,
    flexDirection:'column',
    justifyContent:'center'
  },
  transactionHistoryContainer:{
    backgroundColor:theme.color.white,
    marginBottom:30*theme.height,
    paddingBottom:15*theme.height,
    borderRadius:15,
  },
  transactionHistoryHeaderContainer:{
    flexDirection:'row',
    marginHorizontal:15*theme.width,
    marginTop:15*theme.height,
    alignItems:'center',
    justifyContent:'space-between'
  },
  transactionHistoryHeaderText:{
    color:theme.color.main,
    fontSize:theme.fontSizes.fontSizes20,
    fontFamily:'Pretendard-SemiBold',    
  },
  transactionHistoryFilterText:{
    color:theme.color.grey10,
    fontSize:theme.fontSizes.fontSizes12,
    fontFamily:'Pretendard-Medium',
  },
  iconStyle:{
    width:22*theme.width*theme.height,
    height:22*theme.height*theme.width,
    marginLeft:15*theme.width,
  },
  activityIndicatorView:{
    height:200*theme.height,
    justifyContent:"center"
  },
  historyItemContainer:{
    flexDirection:'column',
    marginHorizontal:15*theme.width,
    marginTop:15*theme.height
  },
  historyItemDateText:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes12,
    color:theme.color.grey10,
  },
  historyItemImage:{
    height:50*theme.width*theme.height,
    width:50*theme.width*theme.height,
    backgroundColor:theme.color.background,
    borderRadius:100,
    marginRight:10*theme.width,
  },
  historyItemDetailContainer:{
    flexDirection:'row',
    marginTop:15*theme.height,
    justifyContent:"space-between",
    alignItems:'center',
  },
  historyItemViewDetail:{
    flexDirection:"row",
    alignItems:'center',
  },
  counterpartyText:{
    //fontFamily:"Pretendard-Medium",
    fontFamily:"Pretendard-SemiBold",
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey2,
    lineHeight:22*theme.height,
  },
  timeText:{
    fontFamily:"Pretendard-Regular",
    fontSize:theme.fontSizes.fontSizes12,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
  },
  amountText:{
    fontFamily:"Pretendard-Medium",
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey2,
  },
  
})

export default Ledger2;