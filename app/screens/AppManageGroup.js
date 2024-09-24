import { theme } from "@assets/Theme";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, ScrollView, Modal, Animated,} from 'react-native';


function MyGroup({navigation}){
    return(        
        <View>
            <Text style={styles.titleText}>내 모임</Text>
            <View style={styles.groupContainer}>
                <Text style={styles.groupNameText}>고사모</Text>
                <TouchableOpacity>
                    <Image source={require("@assets/Icons/settingsIcon.png")}
                    style={styles.settingIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function AppManageGroup({navigation}){
    return(
        <ScrollView contentContainerStyle={styles.background}>
            <MyGroup/>
        </ScrollView>
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
    titleText:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes18,
        fontFamily:'Pretendard-Medium',
        lineHeight:22,
        marginBottom:25*theme.height,
    },
    groupNameText:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes18,
        fontFamily:'Pretendard-SemiBold',
        lineHeight:22,
    },
    groupContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:4*theme.width,
        marginBottom:25*theme.height,
    },
    settingIcon:{
        height:24*theme.width*theme.height,
        width:24*theme.width*theme.height,
    },
    quitIcon:{
        height:22*theme.width*theme.height,
        width:22*theme.width*theme.height,
    }
})