import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { theme } from "@assets/Theme";
import { launchImageLibrary } from 'react-native-image-picker';

function AddReceipt_M({navigation}){
    const [receipt, setReceipt]=useState("");

    const selectImage = () => {
        const options = {
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 300,
          quality: 1,
        };
    
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const uri = response.assets[0].uri;
            setReceipt(uri);
          }
        });
      };

    return(
        <View style={styles.background}>
            <Text style={styles.titleText}>별다방</Text>
            <View style={styles.line}/>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTitleText}>거래 시간</Text>
                <Text style={styles.contentNumberText}>2024-02-21 16:12</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTitleText}>거래 금액</Text>
                <Text style={styles.contentNumberText}>45,000원</Text>
            </View>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.addReceiptContainer}
                onPress={selectImage}>
                <Image source={require("@assets/Icons/addsquareIcon.png")} style={styles.iconStyle}/>
                <Text style={styles.addReceiptText}>영수증 첨부하기</Text>
            </TouchableOpacity>
            <View style={styles.imageView}>
                <Text style={styles.imageText}>{receipt}</Text>
                <TouchableOpacity onPress={()=>setReceipt("")}>
                    <Image source={require("@assets/Icons/closeIcon.png")} style={styles.deleteIcon}/>
                </TouchableOpacity>                
            </View>
            <TouchableOpacity style={styles.doneBtn}
            onPress={()=>navigation.goBack()}>
                <Text style={styles.doneBtnText}>완료</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:77*theme.height,
        paddingHorizontal:16*theme.width,
        paddingTop:30*theme.height,
    },
    titleText:{
        fontFamily:'Pretendard-Bold',
        fontSize:theme.fontSizes.fontSizes26,
        color: theme.color.grey2,
    },
    line:{
        marginTop:20*theme.height,
        height:1,
        backgroundColor:theme.color.grey6,
    },
    contentContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:4*theme.width,
        marginTop:20*theme.height,
    },
    contentTitleText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes18,
        color: theme.color.grey10,
        lineHeight:22,
    },
    contentNumberText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes15,
        color: theme.color.grey2,
        lineHeight:22,
    },
    addReceiptContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:4*theme.width,
        marginTop:20*theme.height,
    },
    iconStyle:{
        height:22*theme.width*theme.height,
        width:22*theme.width*theme.height,
        marginRight: 10*theme.width,
    },
    addReceiptText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes15,
        color: theme.color.grey10,
        lineHeight:22,
    },
    imageView:{
        //height:40*theme.height,
        padding:10*theme.width,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:theme.color.background,
        borderRadius:15,
        marginTop:15*theme.height,
    },
    deleteIcon:{
        height:24*theme.width*theme.height,
        width:24*theme.width*theme.height,
    },
    imageText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
        lineHeight:22,
        marginLeft:5*theme.width,
        //height:22*theme.height
    },
    doneBtn:{
        position:'absolute',
        height:50*theme.height,
        width:358*theme.width,
        backgroundColor:theme.color.main,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',   
        bottom:97*theme.height,     
        left:16*theme.width,
    },
    doneBtnText:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:theme.fontSizes.fontSizes18,
        color: theme.color.white,
    }

})

export default AddReceipt_M;