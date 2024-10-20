import { theme } from "@assets/Theme";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, ScrollView, Modal, Animated,} from 'react-native';

function ManageMember({navigation}){
    return(
      <View style={styles.mypageCheckDetailContainer}>
        <Text style={styles.mypageCheckDetailTitle}>내 모임 구성원 관리</Text>
        <TouchableOpacity style={styles.mypageCheckDetailNavigate}
          //onPress={()=>navigation.navigate()}
          >
          <Text style={styles.mypageCheckDetailNavigateText}>구성원 관리하기</Text>
        </TouchableOpacity>
      </View>
    )
}

function ManageGroup({navigation, openDeleteGroupOverlay}){
    return(
      <View style={styles.mypageCheckDetailContainer}>
        <Text style={styles.mypageCheckDetailTitle}>내 모임 관리</Text>
        <TouchableOpacity style={styles.mypageCheckDetailNavigate}
          onPress={()=>navigation.navigate('ChangeGroupPW')}
          >
          <Text style={styles.mypageCheckDetailNavigateText}>모임 비밀번호 변경하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mypageCheckDetailNavigate}
          onPress={()=>openDeleteGroupOverlay()}
          >
          <Text style={styles.mypageCheckDetailNavigateText}>모임 삭제하기</Text>
        </TouchableOpacity>
      </View>
    )
}

function DeleteGroupOverlay({overlayVisible, animatedHeight, closeModal, navigation}){
  const [isDelete,setIsDelete]=useState(false);

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
              <Text style={styles.overlayHeaderText}>모임 삭제하기</Text>
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
            <Text style={styles.quitOverlayMainText}>정말 삭제하시겠어요?</Text>
            <Text style={styles.quitOverlayDetailText}>더 즐거운 모임 활동이 당신을 기다려요</Text>
          </View>
          <TouchableOpacity onPress={closeModal}
            style={styles.maintainBtn}>
            <Text style={styles.maintainBtnText}>모임 유지하기</Text>
          </TouchableOpacity>
          <View style={styles.quitBtnContainer}>
            <TouchableOpacity style={styles.quitBtn}
              onPress={()=>navigation.navigate('ConfirmPW')}>
              <Text style={styles.quitBtnText}>모임 삭제하기</Text>
            </TouchableOpacity>
          </View>            
        </Animated.View>
      </TouchableOpacity>

    </Modal>
  )
}

export default function ManageMyGroup({navigation}){
    const [deleteGroupOverlayVisible, setDeleteGroupOverlayVisible]=useState(false);
    const animatedHeight=useRef(new Animated.Value(0)).current;

    const openDeleteGroupModal=()=>{
      setDeleteGroupOverlayVisible(true);
      Animated.timing(animatedHeight, {
        toValue: 500, // 모달의 높이
        duration: 0, // 애니메이션 지속 시간
        useNativeDriver: false
      }).start();
    };
  
    const closeDeleteGroupModal = () => {
      Animated.timing(animatedHeight, {
        toValue: 500,
        duration: 0,
        useNativeDriver: false
      }).start(() => setDeleteGroupOverlayVisible(false));
    };

    return(
        <View style={styles.background}>
            <ManageMember navigation={navigation}/>
            <View style={styles.lineHorizontal}/>
            <ManageGroup navigation={navigation} openDeleteGroupOverlay={openDeleteGroupModal}/>
            <DeleteGroupOverlay overlayVisible={deleteGroupOverlayVisible}  animatedHeight={animatedHeight} closeModal={closeDeleteGroupModal} navigation={navigation}/>

        </View>
    )
}

const styles=StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:77*theme.height,
        paddingHorizontal:16*theme.width,
        paddingTop:5*theme.height,
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
    lineHorizontal:{
        height:1,
        backgroundColor:theme.color.background,
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