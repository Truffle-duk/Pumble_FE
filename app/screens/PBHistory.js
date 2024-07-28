//import React from "react";
import { theme } from "@assets/Theme";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import { create } from "react-test-renderer";


const PBBalence=45;
const PBTransactionHistory=[
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
  {
    "Date":"1/23",
    "Content":"정기모임",
    "Amount":"+ 5"
  },
]

function PBBalenceCard({balence}){
  return(
    <View style={styles.PBBalenceCardContainer}>
      <View style={styles.PBBalenceCardTextContainer}>
        <Text style={styles.PBBalenceHeadText}>내 PB</Text>
        <Text style={styles.PBBalenceBalenceText}>{balence} PB</Text>
      </View>
      <Image source={require("@assets/Images/Piggybank.png")}
        style={styles.PBBalenceImage}/>
    </View>
  )
}

function PBHistoryList({histories}){
  return(
    <View style={{marginBottom:107}}>
      <Text style={styles.PBHistoryHeadText}>상세내역</Text>
      {
        histories.length===0?(
          <View>
            <View style={styles.line}/>
            <Text>PB 내역이 없어요...</Text>
          </View>
        ):(
          histories.map((history,index)=>
            <View>
              <View style={styles.line}/>
              <View style={styles.PBHistoryContainer}>
                <Text style={styles.PBHistoryDateText}>{history.Date}</Text>
                <View style={styles.PBHistoryDetailContainer}>
                  <Text style={styles.PBHistoryContentText}>{history.Content}</Text>
                  <Text style={styles.PBHistoryAmountText}>{history.Amount} PB</Text>
                </View>
              </View>
            </View>
          )
        )
      }

    </View>
  )
}

export default function PBHistory(){
  const [PBbalence,setPBbalence]=useState(0);
  const [PBhistory,setPBhistory]=useState([]);

  useEffect(()=>{
    setPBbalence(PBBalence);
    setPBhistory(PBTransactionHistory);
  },[])

    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        // </View>
        <ScrollView style={styles.background}>
          <PBBalenceCard balence={PBbalence}/>
          <PBHistoryList histories={PBhistory}/>
        </ScrollView>
      );
  }

const styles=StyleSheet.create({
  background:{
    backgroundColor:theme.color.white,
    paddingTop:30*theme.height,
    paddingHorizontal:16*theme.width,
    paddingBottom:107*theme.height,
  },
  PBBalenceCardContainer:{
    backgroundColor:theme.color.mainOpacity10,
    borderRadius:15,
    height:90*theme.height,
    paddingHorizontal:15*theme.width,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:35*theme.height,
  },
  PBBalenceCardTextContainer:{
    flexDirection:'column'
  },
  PBBalenceHeadText:{
    color:theme.color.grey10,
    fontSize:theme.fontSizes.fontSizes15,
    fontFamily:'Pretendard-Medium',
    lineHeight:15,
    marginBottom:10*theme.height,
  },
  PBBalenceBalenceText:{
    color:theme.color.main,
    fontSize:theme.fontSizes.fontSizes25,
    fontFamily:'Pretendard-Bold',
    lineHeight:25,
  },
  PBBalenceImage:{
    width:90*theme.width*theme.height,
    height:90*theme.width*theme.height,
  },
  PBHistoryHeadText:{
    color:theme.color.grey2,
    fontSize:theme.fontSizes.fontSizes18,
    fontFamily:'Pretendard-Medium',
    lineHeight:18,
    marginBottom:15*theme.height,
  },
  line:{
    height:1,
    backgroundColor:theme.color.background,
  },
  PBHistoryContainer:{
    paddingVertical:20*theme.height,
    paddingHorizontal:15*theme.width,
  },
  PBHistoryDateText:{
    color:theme.color.grey1,
    fontSize:theme.fontSizes.fontSizes14,
    fontFamily:'Pretendard-Medium',
    lineHeight:15,
  },
  PBHistoryDetailContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:15*theme.height,
  },
  PBHistoryContentText:{
    color:theme.color.grey2,
    fontSize:theme.fontSizes.fontSizes18,
    fontFamily:'Pretendard-Medium',
    lineHeight:18,
  },
  PBHistoryAmountText:{
    color:theme.color.main,
    fontSize:theme.fontSizes.fontSizes18,
    fontFamily:'Pretendard-SemiBold',
    lineHeight:18,
  }
})