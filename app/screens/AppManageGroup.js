import { theme } from "@assets/Theme";
import { Link } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, ScrollView, Modal, Animated, Alert} from 'react-native';

const myGroupList=[
    {
        "Name":"고사모"
    },
    {
        "Name":"냉사모"
    },
]

const linkedGroupList=[
    {
        "Name":"강사모"
    },
    {
        "Name":"햄사모"
    },
    {
        "Name":"쿼사모"
    },
    {
        "Name":"앵사모"
    },
]

function MyGroup({groups, navigation}){
    return(        
        <View>
            <Text style={styles.titleText}>내 모임</Text>
            {
                groups.length===0?(
                    <View style={styles.groupContainer}>
                        <Text style={styles.groupNameText}>내 모임이 없어요!</Text>
                    </View>
                ):(
                    groups.map((group, index)=>
                        <View style={styles.groupContainer}>
                            <Text style={styles.groupNameText}>{group.Name}</Text>
                            <TouchableOpacity
                            onPress={()=>navigation.navigate('ManageMyGroup')}>
                                <Image source={require("@assets/Icons/settingsIcon.png")}
                                style={styles.settingIcon}/>
                            </TouchableOpacity>
                        </View>
                    )
                )
            }
            
        </View>
    );
}

function LinkedGroup({groups, quitGroupAlert}){
    return(        
        <View>
            <Text style={styles.titleText}>연결된 모임</Text>
            {
                groups.length===0?(
                    <View style={styles.groupContainer}>
                        <Text style={styles.groupNameText}>연결된 모임이 없어요!</Text>
                    </View>
                ):(
                    groups.map((group, index)=>
                        <View style={styles.groupContainer}>
                            <Text style={styles.groupNameText}>{group.Name}</Text>
                            <TouchableOpacity
                            onPress={()=>quitGroupAlert(group.Name)}>
                                <Image source={require("@assets/Icons/logoutIcon.png")}
                                style={styles.quitIcon}/>
                            </TouchableOpacity>
                        </View>
                    )
                )
            }
        </View>
    );
}

export default function AppManageGroup({navigation}){
    const [myGroups,setMyGroups]=useState([]);
    const [linkedGroups,setLinkedGroups]=useState([]);
    const [quitGroup, setQuitGroup]=useState("");

    const quitAlert=({groupName})=>{
        Alert.alert(
            "모임 탈퇴하기",
            "모임을 탈퇴하겠어요?",
            [
                {
                    text:"취소", 
                    //onPress: () => setQuitGroup(groupName)
                    style:'cancel'
                },
                {
                    text:"네, 탈퇴할래요", 
                    onPress: () => setQuitGroup(groupName)
                },
            ],
            {cancelable:true}
        );
    };

    useEffect(()=>{
        setMyGroups(myGroupList);
        setLinkedGroups(linkedGroupList);
    },[])
    return(
        <ScrollView contentContainerStyle={styles.background}>
            <MyGroup groups={myGroups} navigation={navigation}/>
            <View style={styles.lineHorizontal}/>
            <LinkedGroup groups={linkedGroups} quitGroupAlert={quitAlert}/>
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
    },
    lineHorizontal:{
        height:1,
        backgroundColor:theme.color.background,
        marginBottom:25*theme.height,
    },

})