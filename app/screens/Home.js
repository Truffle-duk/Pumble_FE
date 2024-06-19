import { theme } from "@assets/Theme";
import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth=Dimensions.get('screen').width; 
const screenHeight = Dimensions.get('screen').height;


function LedgerCard({navigation}){
  return(
    <View style={styles.ledgerContainer}>
      <View style={styles.ledgerDetailContainer}>
        <View style={styles.ledgerDetailTextContainer}>
          <Text style={styles.ledgerHeadText}>공금</Text>
          <View style={styles.ledgerBalanceTextContainer}>
            <Text style={styles.ledgerBalanceText}>잔액</Text>
            <Text style={styles.ledgerBalanceTotalText}>1,000,000원</Text>
          </View>          
        </View>
        <Image source={require("../assets/Images/Guinguin_Coin.png")}
          style={styles.ledgerImageStyle}
        />
      </View>
      <View style={styles.ledgerLine}/>
      <View style={styles.ledgerGotoLedgerContainer}>
        <TouchableOpacity style={styles.ledgerGotoLedgerTouch}
          onPress={()=>navigation.navigate('Ledger2')}>
          <Text style={styles.ledgerGotoLedgerText}>내역 보러가기</Text>
          <Image source={require("@assets/Icons/dropdownIcon.png")}
            style={styles.ledgerGotoLedgerIcon}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Home({navigation}){
    return (
      <>
        {/* <StatusBar
        backgroundColor={theme.color.main}/> */}
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Ledger"
            onPress={()=>navigation.navigate('Ledger2')}/>
          
        </View> */}

        <ScrollView contentContainerStyle={styles.background}>
          <LedgerCard navigation={navigation}/>
        </ScrollView>
      </>
      );
}

const styles=StyleSheet.create({
  background:{
    backgroundColor:theme.color.background,
    paddingBottom:77*theme.height,
    paddingHorizontal:16*theme.width,
    paddingTop:30*theme.height,
  },
  ledgerContainer:{
    backgroundColor:theme.color.white,
    marginBottom:30*theme.height,
    height:153*theme.height,
    borderRadius:15,
    flexDirection:'column',
  },
  ledgerDetailContainer:{
    flexDirection:'row',
    height: 100*theme.height,
    alignItems: 'flex-end',
    justifyContent:'space-between'
  },
  ledgerDetailTextContainer:{ 
    //backgroundColor:'red',   
    height: 100*theme.height,
    marginLeft:15*theme.width,
    paddingTop:15*theme.height,
  },
  ledgerBalanceTextContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10*theme.height,
  },
  ledgerImageStyle:{
    height:93.5*theme.height*theme.width,
    width:107*theme.width*theme.height,
    marginRight:20*theme.width
    // position:'absolute',
    // left:screenWidth-190*theme.width,
  },
  ledgerHeadText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes20,
    color:theme.color.main,
    lineHeight:22*theme.height,
  },
  ledgerBalanceText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.grey9,
    lineHeight:22*theme.height,
    marginRight:10*theme.width,
    marginLeft:2*theme.width,
  },
  ledgerBalanceTotalText:{
    fontFamily:'Pretendard-ExtraBold',
    fontSize:theme.fontSizes.fontSizes20,
    color:theme.color.grey2,
    lineHeight:22*theme.height,
  },
  ledgerLine:{
    height:1*theme.height,
    marginHorizontal:15*theme.width,
    backgroundColor:theme.color.grey11
  },
  ledgerGotoLedgerContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  ledgerGotoLedgerTouch:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  ledgerGotoLedgerText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.grey4,
    lineHeight:22*theme.height,
  },
  ledgerGotoLedgerIcon:{
    height:12*theme.height*theme.width,
    width:12*theme.width*theme.height,
    marginLeft:5*theme.width
  }


})