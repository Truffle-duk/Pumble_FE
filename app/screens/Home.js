import { theme } from "@assets/Theme";
import { ThemeProvider } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import {ethers} from "ethers";

const screenWidth=Dimensions.get('screen').width; 
const screenHeight = Dimensions.get('screen').height;

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const ledgerContractAddress = "0x7C16D9c5db44302a9b0aed4066EB4Aa77FA59f6d"
const ledgerContractABI = ["event RetrieveBalance(string indexed hGroupId, string groupId, uint256 balance)"];
/*async function getBalance(groupId) {
  const hGroupIdHash = ethers.id(groupId); // keccak256 해시

  // 필터 설정
  const filter = {
    address: ledgerContractAddress,
    fromBlock: 'latest',
    toBlock: 'latest',
    topics: [
      ethers.id("RetrieveBalance(string,string,uint256)"), // 이벤트 시그니처
      hGroupIdHash
    ]
  };

  try {
    const logs = await provider.getLogs(filter)

    // 로그를 이벤트 객체로 디코딩
    const iface = new ethers.Interface(ledgerContractABI);
    const events = logs.map(log => iface.parseLog(log))

    return events;
  } catch (error) {
    console.error("Error fetching getBalance events:", error);
    throw error;
  }
}*/


function LedgerCard({navigation}){
  const [balance, setBalance] = useState(1000000)

  /*useEffect(() => {
    getBalance("testuuid")
        .then(response => {
          console.log(response)
          setBalance(Number(response[0].args[2]))
        })
        .catch(err => {
          console.log(err)
        })
  }, []);*/
  return(
    <View style={styles.ledgerContainer}>
      <View style={styles.ledgerDetailContainer}>
        <View style={styles.ledgerDetailTextContainer}>
          <Text style={styles.ledgerHeadText}>공금</Text>
          <View style={styles.ledgerBalanceTextContainer}>
            <Text style={styles.ledgerBalanceText}>잔액</Text>
            <Text style={styles.ledgerBalanceTotalText}>{balance.toLocaleString() + '원'}</Text>
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

function NotificationCard({navigation}){
  return(
    <TouchableOpacity style={styles.navigationCard}
      onPress={()=>navigation.navigate('Notification')} // 나중에 Notification 페이지 생성 시, 연결
      >
      <Text style={styles.navigationCardTitleText}>공지사항</Text>
        <Text style={styles.navigationCardDetailText}>바로 확인 가능해요</Text>
        <View style={styles.navigationCardImageContainer}>
          <Image 
            source={require("@assets/Images/Speaker.png")}
            style={styles.navigationCardImage}/>
        </View>
    </TouchableOpacity>
  )
}

function CommunityCard({navigation}){
  return(
    <TouchableOpacity style={styles.navigationCard}
      onPress={()=>navigation.navigate('Community')}  //나중에 community 페이지 생성 시, 연결
      >
      <Text style={styles.navigationCardTitleText}>커뮤니티</Text>
        <Text style={styles.navigationCardDetailText}>모두와 소통해요</Text>
        <View style={styles.navigationCardImageContainer}>
          <Image 
            source={require("@assets/Images/Calendar.png")}
            style={styles.navigationCardImage}/>
        </View>
    </TouchableOpacity>
  )
}

function RewardBanner({navigation}){
  return(
    <View style={styles.rewardBannerContainer}>
      <View style={styles.rewardTextContainer}>
        <Text style={styles.rewardBannerText}>모임 활동에 참여하면 </Text> 
        <Text style={styles.rewardBannerHightlightText}>리워드</Text> 
        <Text style={styles.rewardBannerText}>를 드려요!</Text>
      </View>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Event')}>
        <Image source={require("@assets/Icons/arrow1_Right.png")}
          style={styles.rewardBannerIcon}/>
      </TouchableOpacity>
      
    </View>
  )
}

function RewardStoreCard({}){
  return(
    <View style={styles.rewardStoreCard}>
      <View style={styles.rewardStoreHeaderContainer}>
        <Text style={styles.rewardStoreHeaderText}>리워드 스토어</Text>
        <TouchableOpacity style={styles.rewardStoreCardNavigationContainer}>
          <Text style={styles.rewardStoreCardNavigationText}>더보기</Text>
          <Image source={require('@assets/Icons/arrow1_Right.png')}
            style={styles.rewardStoreCardNavigationIcon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.rewardStoreBannerContianer}>
        <Image source={require('@assets/Images/RewardStore_Banner.png')} 
          style={styles.rewardStoreBannerImage}
          />
        <Text style={styles.rewardStoreBannerText}>커피/케이크</Text>
      </View>
      <View style={styles.rewardStoreProductListContainer}>
        <View style={styles.rewardStoreItemContainer}>
          <View style={styles.rewardStoreItemDetailContainer}>
            <Image source={require('@assets/Images/ProductImage1.png')}
              style={styles.rewardStoreItemImage}/>
            <View>
              <Text style={styles.rewardStoreItemNameText}>스타벅스 블루베리 치즈 케이크</Text>
              <Text style={styles.rewardStoreItemPriceText}>12 PB</Text>
            </View>            
          </View>
          <TouchableOpacity>
            <Image source={require('@assets/Icons/addsquareIcon.png')}
              style={styles.rewardStoreItemAddIcon}/>
          </TouchableOpacity>          
        </View>
        <View style={styles.rewardStoreItemContainer}>
          <View style={styles.rewardStoreItemDetailContainer}>
            <Image source={require('@assets/Images/ProductImage2.png')}
              style={styles.rewardStoreItemImage}/>
            <View>
              <Text style={styles.rewardStoreItemNameText}>아이스 스타벅스 돌체라떼 T</Text>
              <Text style={styles.rewardStoreItemPriceText}>10 PB</Text>
            </View>            
          </View>
          <TouchableOpacity>
            <Image source={require('@assets/Icons/addsquareIcon.png')}
              style={styles.rewardStoreItemAddIcon}/>
          </TouchableOpacity>          
        </View>
      </View>
    </View>

  )
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
          <View style={styles.navigationCardContainer}>
            <NotificationCard navigation={navigation}/>
            <CommunityCard navigation={navigation}/>
          </View>
          <RewardBanner navigation={navigation}/>
          <RewardStoreCard/>
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
    marginBottom:15*theme.height,
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
  },
  navigationCardContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    marginBottom:30*theme.height,
  },
  navigationCard:{
    flexDirection:'column',
    width:174*theme.width,
    height:150*theme.height,
    backgroundColor:theme.color.white,
    borderRadius:15,
    paddingTop:15*theme.height,
    paddingLeft:15*theme.width
  },
  navigationCardImage:{
    width:88*theme.height*theme.width,
    height:88*theme.height*theme.width,
  },
  navigationCardImageContainer:{
    flexDirection:'row-reverse',
    flex:1, 
    alignItems:'flex-end', 
  },
  navigationCardTitleText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes18,
    lineHeight:22*theme.height,
    color:theme.color.main
  },
  navigationCardDetailText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes14,
    lineHeight:22*theme.height,
    color:theme.color.grey3
  },
  rewardBannerContainer:{
    backgroundColor:theme.color.mainOpacity10,
    borderRadius:8,
    height:42*theme.height,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:30*theme.width,
  },
  rewardBannerIcon:{
    height:20*theme.height*theme.width,
    width:20*theme.height*theme.width,
  },
  rewardTextContainer:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    marginLeft:20*theme.height*theme.width,
    //backgroundColor:'red'
  },
  rewardBannerText:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.grey2,
    lineHeight:22*theme.height,
  },
  rewardBannerHightlightText:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.main,
    lineHeight:22*theme.height,
  },
  rewardStoreCard:{
    backgroundColor:theme.color.white,
    marginVertical:30*theme.height,
    borderRadius:15,
    paddingBottom:15*theme.height,
  },
  rewardStoreHeaderContainer:{ 
    height:47*theme.height,
    marginHorizontal:15*theme.width,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    //backgroundColor:'red',
  },
  rewardStoreHeaderText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes18,
    color:theme.color.grey2,
    lineHeight:17*theme.height
  },
  rewardStoreCardNavigationContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  rewardStoreCardNavigationText:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes12,
    color:theme.color.grey10,
    lineHeight:17*theme.height
  },
  rewardStoreCardNavigationIcon:{
    height:17*theme.width*theme.height,
    width:17*theme.width*theme.height,
  },
  rewardStoreBannerContianer:{
    position:'relative',
    flexDirection:'column',
    height: 202*theme.height,
    //alignItems:'baseline',
    justifyContent:'flex-end',
    //backgroundColor:'red',
    //flex:1
  },
  rewardStoreBannerImage:{
    position:'absolute',
    // height: 202 *theme.height,
    // width: 358 *theme.width,
    height:'100%',
    width:'100%',
  },
  rewardStoreBannerText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:17*theme.height,
    color:theme.color.white,
    marginLeft:15*theme.width,
    marginBottom:15*theme.height,
  },
  rewardStoreProductListContainer:{
    flexDirection:'column',
    marginHorizontal:15*theme.width,
    marginTop:15*theme.height,
  },
  rewardStoreItemContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:15*theme.height,
  },
  rewardStoreItemImage:{
    height:70*theme.height*theme.width,
    width:70*theme.height*theme.width, 
    borderRadius:5,
    borderColor:theme.color.grey7,
    borderWidth:1,
    marginRight:15*theme.width
  },
  rewardStoreItemDetailContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  rewardStoreItemNameText:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes14,
    lineHeight:17*theme.height,
    color:theme.color.grey2
  },
  rewardStoreItemPriceText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes14,
    lineHeight:17*theme.height,
    color:theme.color.grey2
  },
  rewardStoreItemAddIcon:{
    width:20*theme.height*theme.width,
    height:20*theme.height*theme.width,
  }


})