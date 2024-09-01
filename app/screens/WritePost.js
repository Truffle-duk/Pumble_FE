import React, { useEffect, useState } from "react";
import { theme } from "@assets/Theme";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

export default function Writepost(){
    const [Title,setTitle]=useState("");
    const [Content,setContent]=useState("");

    return(
        <View style={styles.background}>
            <View style={styles.inputContainer}>
                <TextInput
                    returnKeyType='done'
                    maxLength={30}
                    onChangeText={setTitle}
                    placeholder="제목"
                    placeholderTextColor={theme.color.grey1}
                    style={styles.postText}
                    scrollEnabled={true}
                    multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                    textAlignVertical="top"
                    textAlign="left"
                    lineHeight={22} // 줄 간격을 설정
                    height={42*theme.height}
                    />
                <View style={styles.line}/>
                <TextInput
                    returnKeyType='done'
                    maxLength={500}
                    onChangeText={setContent}
                    placeholder="내용을 입력하세요."
                    placeholderTextColor={theme.color.grey1}
                    style={styles.postText}
                    scrollEnabled={true}
                    multiline={true} // 여러 줄 입력을 허용하려면 true로 설정
                    textAlignVertical="top"
                    textAlign="left"
                    lineHeight={22} // 줄 간격을 설정
                    flex={1}
                    />
                
            </View>
            <View style={styles.line}/>
            <View style={styles.doneBtnContainer}>
                <TouchableOpacity style={styles.doneBtn}>
                    <Text style={styles.doneBtnText}>완료</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles=StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:77*theme.height,
        paddingTop:5*theme.height,
    },
    inputContainer:{
        marginBottom:10*theme.height,
        marginHorizontal:16*theme.width,
        flex:1,
    },
    postText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey2,
        lineHeight:22*theme.height,
        //alignContent:'center',
        justifyContent:'center',
        marginTop:5*theme.height,
        //marginBottom:5*theme.height,
        //backgroundColor:'red'
    },
    line:{
        height:1,
        backgroundColor:theme.color.grey6,
    },
    doneBtnContainer:{
        alignItems:'flex-end',
        paddingHorizontal:16*theme.width,
    },
    doneBtn:{
        height:30*theme.height,
        width:60*theme.width,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:theme.color.main,
        marginVertical:10*theme.height,
    },
    doneBtnText:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:theme.fontSizes.fontSizes13,
        color:theme.color.white,
        lineHeight:14*theme.height,
    }


})