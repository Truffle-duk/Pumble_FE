import { theme } from "@assets/Theme";
import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';
//import { launchImageLibrary } from 'react-native-image-picker';


function ModifyProfileImage(){

//   const selectImage = () => {
//     const options = {
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const uri = response.assets[0].uri;
//         setImageUri(uri);
//         console.log('Image uri: ', imageUri);
//       }
//     });
//   };

  return(
    <View style={styles.profileModifyImageContainer}>
      <View style={styles.profileImageContainer}>
        <Image source={require('@assets/Images/Guinguin_Face.png')}
        style={styles.profileImage}/>
      </View>
      {/* <TouchableOpacity style={styles.profileImageModifyBtn} onPress={selectImage}>
        <Image source={require('@assets/Icons/galleryAdd.png')}
        style={styles.profileImageModifyBtnIcon}/>
      </TouchableOpacity> */}
    </View>
  )
}

function ModifyProfileName({name, setName}){
  return(
    <View style={styles.profileModifyNameContainer}>
      <View style={styles.profileModifyNameTextContainer}>
        <View style={styles.profileModifyNameInputTextContainer}>
          <TextInput
            returnKeyType='done'
            maxLength={10}
            //value={Name}
            onChangeText={setName}
            placeholder={name}            
            style={styles.profileModifyNameInputText}
          />
        </View>
        
        <TouchableOpacity style={styles.profileNameModifyBtn}>
          <Image source={require('@assets/Icons/editPen.png')}
          style={styles.profileNameModifyBtnIcon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.line}/>
    </View>
  )
}

function SaveBtn(){
  return(
    <TouchableOpacity style={styles.saveBtn}>
      <Text style={styles.saveBtnText}>저장</Text>
    </TouchableOpacity>
  )
}

export default function AppModifyProfile(){
  const [imageUri, setImageUri] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(()=>{
    setNickname("귄귄쓰")
  },[])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:theme.color.white }}>
          <ModifyProfileImage imageUri={imageUri} setImageUri={setImageUri}/>
          <ModifyProfileName name={nickname} setName={setNickname}/>
          <SaveBtn/>
        </View>
      );
  }


  const styles=StyleSheet.create({
    profileModifyImageContainer:{
      height:120*theme.height*theme.width,
      width:120*theme.width*theme.height,
      position:'relative',
      flexDirection:'row-reverse',
      //backgroundColor:'red',      
      alignItems:'flex-end', 
      marginBottom:5*theme.height,
    },
    profileImageContainer:{
      flex:1, 
      borderRadius:100,
      backgroundColor:theme.color.mainOpacity10,
      height:120*theme.height*theme.width,
      width:120*theme.width*theme.height,
      overflow:'hidden'
    },
    profileImage:{
      height:'100%',
      width:'100%',
    },
    profileImageModifyBtn:{
      position:'absolute',
      height:28*theme.height*theme.width,
      width:28*theme.width*theme.height,
      backgroundColor:theme.color.white,
      borderRadius:100,
      //margin:4*theme.width,
      //marginBottom:4*theme.height,
      justifyContent:'center',
      alignItems:'center'
    },
    profileImageModifyBtnIcon:{
      height:15*theme.height*theme.width,
      width:15*theme.width*theme.height,
    },
    profileModifyNameContainer:{
      flexDirection:'column',
      width:250*theme.width,
      //height:30*theme.height,
      marginVertical:30*theme.height,
    },
    profileModifyNameTextContainer:{
      //backgroundColor:'red',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:5*theme.width
    },
    profileModifyNameInputTextContainer:{
      flex:1,
      marginLeft:20*theme.width*theme.height,
      paddingLeft:5*theme.width,
      alignContent:'center',
      justifyContent:'center',
      //backgroundColor:'red',
    },
    profileModifyNameInputText:{      
      fontFamily:'Pretendard-SemiBold',
      fontSize:theme.fontSizes.fontSizes18,
      color:theme.color.grey10,
      lineHeight:22*theme.height,
      alignContent:'center',
      justifyContent:'center',
      textAlign:'center',
      padding:0,
      //backgroundColor:'red',
      //height:45*theme.height
    },
    profileNameModifyBtn:{
      height:20*theme.height*theme.width,
      width:20*theme.width*theme.height,
      marginLeft:5*theme.width,
    },
    profileNameModifyBtnIcon:{
      height:20*theme.height*theme.width,
      width:20*theme.width*theme.height,
    },
    line:{
      //width:250*theme.width,
      height:1,
      backgroundColor:theme.color.grey1,
    },
    saveBtn:{
      //flex:1,
      //flexDirection:'row',
      backgroundColor:theme.color.mainOpacity10,
      height:50*theme.height,
      width:328*theme.width,
      //marginHorizontal:31*theme.width,
      borderWidth:1,
      borderColor:theme.color.main,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',

    },
    saveBtnText:{
      fontFamily:'Pretendard-SemiBold',
      fontSize:theme.fontSizes.fontSizes18,
      color:theme.color.main,
    }

  })