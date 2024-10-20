import { theme } from "@assets/Theme";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, ScrollView, Modal, Animated,} from 'react-native';

function ProfileView({navigation, wallet}){
  return(
    <View style={styles.profileViewContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={require('@assets/Images/Guinguin_Face.png')}
            style={styles.profileImage}/>
        </View>
        <View>
          <Text style={styles.profileNameText}>귄귄쓰 더 큐티 펭귄</Text>
          <View style={styles.profileRoleContainer}>
            {/* <Image source={require('@assets/Icons/crownIcon1.png')}
              style={styles.profileRoleIcon}/> */}
            <Text style={styles.profileRoleText}>Queenguin01@gmail.com</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.modifyProfileBtn}
        onPress={()=>navigation.navigate('ModifyProfile2')} 
        >
        <Text style={styles.modifyProfileText}>프로필 수정</Text>
      </TouchableOpacity>
      <View style={styles.lineHorizontal}/>
      <View style={styles.walletContainer}>
        <Text style={styles.walletTitle}>내 지갑</Text>
        <Text style={styles.walletAddress}>{wallet}</Text>
      </View>
    </View>
  )
}

// function MyPageBanner(){
//   return(
//     <View style={styles.mypageBanner}>
//       <View style={styles.mypageBannerTextContainer}>
//         <Text style={styles.mypageBannerText}>모임 행사를 참여 완료 하면 </Text>
//         <Text style={styles.mypageBannerHighlightText}>이더를 받을수있어요!</Text>
//       </View>
//       <View style={styles.mypageBannerImageContainer}>
//         <Image source={require('@assets/Images/Coin1.png')}
//           style={styles.mypageBannerImage}/>
//       </View>
//     </View>
//   )
// }

// function CheckPBHistory({navigation}){
//   return(
//     <View style={styles.mypageCheckDetailContainer}>
//       <Text style={styles.mypageCheckDetailTitle}>내 PB</Text>
//       <TouchableOpacity style={styles.mypageCheckDetailNavigate}
//         onPress={()=>navigation.navigate('PBHistory')}
//         >
//         <Text style={styles.mypageCheckDetailNavigateText}>PB 내역 확인하기</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// function CheckPurchasedProductList({navigation}){
//   return(
//     <View style={styles.mypageCheckDetailContainer}>
//       <Text style={styles.mypageCheckDetailTitle}>구매 상품</Text>
//       <TouchableOpacity style={styles.mypageCheckDetailNavigate}
//         onPress={()=>navigation.navigate('PurchasedProductList')}
//         >
//         <Text style={styles.mypageCheckDetailNavigateText}>구매 상품 내역 확인하기</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

function ManageGroup({navigation}){
  return(
    <View style={styles.mypageCheckDetailContainer}>
      <Text style={styles.mypageCheckDetailTitle}>나의 모임</Text>
      <TouchableOpacity style={styles.mypageCheckDetailNavigate}
        onPress={()=>navigation.navigate('AppManageGroup')}
        >
        <Text style={styles.mypageCheckDetailNavigateText}>모임 관리하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mypageCheckDetailNavigate}
        onPress={()=>navigation.navigate('JoinGroup')}
        >
        <Text style={styles.mypageCheckDetailNavigateText}>모임 연결하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mypageCheckDetailNavigate}
        onPress={()=>navigation.navigate('CreateGroup')}
        >
        <Text style={styles.mypageCheckDetailNavigateText}>새 모임 만들기</Text>
      </TouchableOpacity>
    </View>
  )
}

function ManageAccount({openLogoutOverlay, openQuitOverlay}){
  return(
    <View style={styles.mypageCheckDetailContainer}>
      <Text style={styles.mypageCheckDetailTitle}>계정 관리</Text>
      <TouchableOpacity style={styles.mypageCheckDetailNavigate}
        onPress={()=>openLogoutOverlay()}>
        <Text style={styles.mypageCheckDetailNavigateText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mypageCheckDetailNavigate}
        onPress={()=>openQuitOverlay()}>
        <Text style={styles.mypageCheckDetailNavigateText}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  )
}

function LogoutOverlay({overlayVisible, animatedHeight, closeModal}){
  const [isLogout,setIsLogout]=useState(false);

  return(
    <Modal
      transparent={true}
      visible={overlayVisible}
      animationType="None"
      onRequestClose={closeModal}
    >
      <TouchableOpacity onPress={closeModal} activeOpacity={1} style={styles.overlayBackground}>
        <Animated.View style={styles.overlayContainer}>

          <View style={styles.overlayHeaderContainer}>
            <View style={styles.overlayHeaderTextContainer}>
              <Text style={styles.overlayHeaderText}>로그아웃</Text>
            </View>
            
            <TouchableOpacity onPress={closeModal} >
                <Image source={require("@assets/Icons/closeIcon.png")}
                  style={styles.overlayHeaderIcon}
                  />
            </TouchableOpacity>
          </View>
          <View style={styles.logoutTextContainer}>
            <Text style={styles.logoutText}>로그아웃 하시겠어요?</Text>
            <Text style={styles.logoutDetailText}>나중에 다시 로그인 할 수 있어요!</Text>
          </View>          

          <TouchableOpacity style={styles.logoutBtn}
            onPress={()=>setIsLogout(true)}>
            <Text style={styles.logoutBtnText}>로그아웃 하기</Text>
          </TouchableOpacity>

        </Animated.View>
      </TouchableOpacity>
    </Modal>

  );
}

function QuitOverlay({overlayVisible, animatedHeight, closeModal}){
  const [isQuit,setIsQuit]=useState(false);

  return(
    <Modal
      transparent={true}
      visible={overlayVisible}
      animationType="None"
      onRequestClose={closeModal}
    >
      <TouchableOpacity onPress={closeModal} activeOpacity={1} style={styles.overlayBackground}>
        <Animated.View style={styles.overlayContainer}>
          <View style={styles.overlayHeaderContainer}>
            <View style={styles.overlayHeaderTextContainer}>
              <Text style={styles.overlayHeaderText}>탈퇴하기</Text>
            </View>
              
            <TouchableOpacity onPress={closeModal} >
              <Image source={require("@assets/Icons/closeIcon.png")}
                style={styles.overlayHeaderIcon}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.quitOverlayContainer}>
            <Image source={require("@assets/Images/Guinguin_Sad.png")}
              style={styles.quitOverlayImage}/>
            <Text style={styles.quitOverlayMainText}>정말 탈퇴하시겠어요?</Text>
            <Text style={styles.quitOverlayDetailText}>더 즐거운 모임 활동이 당신을 기다려요</Text>
          </View>
          <TouchableOpacity onPress={closeModal}
            style={styles.maintainBtn}>
            <Text style={styles.maintainBtnText}>유지하기</Text>
          </TouchableOpacity>
          <View style={styles.quitBtnContainer}>
            <TouchableOpacity style={styles.quitBtn}
              onPress={()=>setIsQuit(true)}>
              <Text style={styles.quitBtnText}>탈퇴하기</Text>
            </TouchableOpacity>
          </View>            
        </Animated.View>
      </TouchableOpacity>

    </Modal>
  )
}

export default function AppMyPage({navigation}){
  const [wallet, setWallet]=useState("");

  const [logoutOverlayVisible, setLogoutOverlayVisible]=useState(false);
  const [quitOverlayVisible, setQuitOverlayVisible]=useState(false);
  const animatedHeight=useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    setWallet("0xB1a7218C36E8fd07FC9fdE33074eDaCc5dcB4ED5")
  },[]);


  const openLogoutModal=()=>{
    setLogoutOverlayVisible(true);
    Animated.timing(animatedHeight, {
      toValue: 287, // 모달의 높이
      duration: 0, // 애니메이션 지속 시간
      useNativeDriver: false
    }).start();
  };

  const closeLogoutModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 287,
      duration: 0,
      useNativeDriver: false
    }).start(() => setLogoutOverlayVisible(false));
  };

  const openQuitModal=()=>{
    setQuitOverlayVisible(true);
    Animated.timing(animatedHeight, {
      toValue: 500, // 모달의 높이
      duration: 0, // 애니메이션 지속 시간
      useNativeDriver: false
    }).start();
  };

  const closeQuitModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 500,
      duration: 0,
      useNativeDriver: false
    }).start(() => setQuitOverlayVisible(false));
  };

    return (
      <>
        {/* <StatusBar
        backgroundColor={theme.color.white}/> */}
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Mypage!</Text>
        </View> */}
        <View style={styles.background}>
          <ProfileView navigation={navigation} wallet={wallet}/>
          {/* <MyPageBanner/>
          <View style={styles.lineHorizontal}/>
          <CheckPBHistory navigation={navigation}/>
          <View style={styles.lineHorizontal}/>
          <CheckPurchasedProductList navigation={navigation}/> */}
          <ManageGroup navigation={navigation}/>
          <View style={styles.lineHorizontal}/>
          <ManageAccount openLogoutOverlay={openLogoutModal} openQuitOverlay={openQuitModal}/>
          <LogoutOverlay overlayVisible={logoutOverlayVisible} animatedHeight={animatedHeight} closeModal={closeLogoutModal}/>
          <QuitOverlay overlayVisible={quitOverlayVisible}  animatedHeight={animatedHeight} closeModal={closeQuitModal}/>
        </View>
      </>
      );
}

const styles=StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:theme.color.white,
    paddingBottom:77*theme.height,
    paddingHorizontal:16*theme.width,
    paddingTop:30*theme.height,
  },
  profileViewContainer:{
    borderWidth:1,
    borderColor:theme.color.background,
    paddingTop:15*theme.height,
    paddingBottom:15*theme.height,
    paddingHorizontal:15*theme.width,
  },
  profileContainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:5*theme.width
  },
  profileImageContainer:{
    borderRadius:100,
    backgroundColor:theme.color.mainOpacity10,
    height:80*theme.height*theme.width,
    width:80*theme.width*theme.height,
    marginRight:20*theme.width,
    overflow:'hidden'
  },
  profileImage:{
    height:'100%',
    width:'100%',
  },
  profileNameText:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes20,
    color:theme.color.black,
    lineHeight:22*theme.height,
    marginBottom:10*theme.height
  },
  profileRoleContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  profileRoleText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey1,
    lineHeight:22*theme.height,
  },
  profileRoleIcon:{
    height:20*theme.height*theme.width,
    width:20*theme.height*theme.width,
    marginRight:5*theme.width,
  },
  modifyProfileBtn:{
    backgroundColor:theme.color.background,
    borderRadius:100,
    height:40*theme.height,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:15*theme.height
  },
  modifyProfileText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
  },
  lineHorizontal:{
    height:1,
    backgroundColor:theme.color.background,
  },
  profileDetailContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignContent:'center',
    paddingTop:10*theme.height,
  },
  lineVertical:{
    width:1,
    backgroundColor:theme.color.background,
  },
  profileDetailTextContainer:{
    marginVertical:5*theme.height,
    flexDirection:'column',
    alignItems:'center'
  },
  profileDetailNumText:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes20,
    color:theme.color.main,
    lineHeight:22*theme.height,
    marginBottom:5*theme.height
  },
  profileDetailText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
  },
  mypageBanner:{
    backgroundColor:theme.color.mainOpacity20,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:15*theme.height
  },
  mypageBannerTextContainer:{
    marginLeft:25*theme.width,
    flexDirection:'row',
  },
  walletContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:15*theme.height
  },
  walletTitle:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
    marginRight:10*theme.width
  },
  walletAddress:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes12,
    color:theme.color.grey1,
    lineHeight:22*theme.height,
  },
  mypageBannerText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes13,
    color:theme.color.grey2,
    lineHeight:15*theme.height,
  },
  mypageBannerHighlightText:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes13,
    color:theme.color.main,
    lineHeight:15*theme.height,
  },
  mypageBannerImageContainer:{
    //backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },
  mypageBannerImage:{
    height:50*theme.height*theme.width,
    width:50*theme.height*theme.width,
  },
  mypageCheckDetailContainer:{
    paddingVertical:25*theme.height,
    //backgroundColor:'red'
  },
  mypageCheckDetailTitle:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes13,
    color:theme.color.grey10,
    lineHeight:13*theme.height,
  },
  mypageCheckDetailNavigate:{
    marginTop:25*theme.height,
    //flex:1,
    //backgroundColor:'red'
  },
  mypageCheckDetailNavigateText:{
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey2,
    lineHeight:15*theme.height,
  },
  overlayBackground:{
    flex:1, 
    justifyContent: 'flex-end', // 하단 정렬
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  overlayContainer:{
    backgroundColor:theme.color.white,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingHorizontal:15*theme.width,
    paddingBottom:50*theme.height,
    //justifyContent:'center',
    //alignItems:'center'
    //height:600*theme.height
  },
  overlayHeaderContainer:{
    flexDirection:'row',
    marginBottom:7*theme.height,
    height:68*theme.height,
    justifyContent:'space-between',
    //backgroundColor:'red'
  },
  overlayHeaderTextContainer:{
    flex:1,
    justifyContent:'center',
    marginLeft:24*theme.width,
    alignItems:'center',
    //backgroundColor:'blue'
  },
  overlayHeaderText:{
    //justifyContent:'center'
    fontSize:theme.fontSizes.fontSizes20,
    fontFamily:"Pretendard-SemiBold",
    color:theme.color.black,
  },
  overlayHeaderIcon:{
    height:24*theme.height*theme.width,
    width:24*theme.width*theme.height,
    marginTop:15*theme.height,
  },
  logoutTextContainer:{
    flexDirection:'column',
    alignItems:'center',
    marginVertical:30*theme.height,
  },
  logoutText:{
    fontSize:theme.fontSizes.fontSizes20,
    fontFamily:"Pretendard-Bold",
    color:theme.color.grey2,
    lineHeight:22,    
    //marginTop:30*theme.height,
  },
  logoutDetailText:{
    fontSize:theme.fontSizes.fontSizes15,
    fontFamily:"Pretendard-Medium",
    color:theme.color.grey1,
    lineHeight:22,    
    marginTop:10*theme.height,
  },
  logoutBtn:{
    backgroundColor:theme.color.main,
    borderRadius:5,
    height:42*theme.height,
    justifyContent:'center',
    alignItems:'center',
    //flex:1,
    //marginTop:30*theme.height,
  },
  logoutBtnText:{
    fontSize:theme.fontSizes.fontSizes14,
    fontFamily:"Pretendard-SemiBold",
    color:theme.color.white,
  },
  quitOverlayContainer:{
    alignItems:'center',
  },
  quitOverlayImage:{
    height:217*theme.height*theme.width,
    width:217*theme.height*theme.width,
    marginBottom:10*theme.height,
  },
  quitOverlayMainText:{
    fontSize:theme.fontSizes.fontSizes20,
    fontFamily:"Pretendard-Bold",
    color:theme.color.grey2,
    lineHeight:22,
    marginBottom:10*theme.height,
  },
  quitOverlayDetailText:{
    fontSize:theme.fontSizes.fontSizes15,
    fontFamily:"Pretendard-Medium",
    color:theme.color.grey1,
    lineHeight:22,
  },
  maintainBtn:{
    backgroundColor:theme.color.main,
    borderRadius:5,
    height:42*theme.height,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30*theme.height,
  },
  maintainBtnText:{
    fontSize:theme.fontSizes.fontSizes14,
    fontFamily:"Pretendard-SemiBold",
    color:theme.color.white,
  },
  quitBtnContainer:{
    alignItems:'center',
    marginTop:10*theme.height,
  },
  quitBtn:{
    borderBottomWidth:1,
    borderBottomColor:theme.color.grey1,
  },
  quitBtnText:{
    fontSize:theme.fontSizes.fontSizes14,
    fontFamily:"Pretendard-Medium",
    color:theme.color.grey1,
    lineHeight:22,
  }
  
})