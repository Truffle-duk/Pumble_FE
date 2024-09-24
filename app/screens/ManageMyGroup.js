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

function ManageGroup({navigation}){
    return(
      <View style={styles.mypageCheckDetailContainer}>
        <Text style={styles.mypageCheckDetailTitle}>내 모임 관리</Text>
        <TouchableOpacity style={styles.mypageCheckDetailNavigate}
          //onPress={()=>navigation.navigate()}
          >
          <Text style={styles.mypageCheckDetailNavigateText}>모임 비밀번호 변경하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mypageCheckDetailNavigate}
          //onPress={()=>navigation.navigate()}
          >
          <Text style={styles.mypageCheckDetailNavigateText}>모임 삭제하기</Text>
        </TouchableOpacity>
      </View>
    )
}

export default function ManageMyGroup({navigation}){
    return(
        <View style={styles.background}>
            <ManageMember navigation={navigation}/>
            <View style={styles.lineHorizontal}/>
            <ManageGroup navigation={navigation}/>

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
})