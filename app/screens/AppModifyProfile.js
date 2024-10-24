import { theme } from "@assets/Theme";
import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';
//import { launchImageLibrary } from 'react-native-image-picker';
import { call } from "@utils/ApiService";

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

function ModifyProfileName({name, setName, checkNewNickname, prevName}){
  return(
    <View style={styles.profileModifyNameContainer}>
      <View style={styles.profileModifyNameTextContainer}>
        <View style={styles.profileModifyNameInputTextContainer}>
          <TextInput
            returnKeyType='done'
            maxLength={10}
            value={name}
            onChangeText={setName}
            placeholder={prevName}            
            style={styles.profileModifyNameInputText}
            onEndEditing={checkNewNickname}
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

function SaveBtn({handleChangeProfile}){
  return(
    <TouchableOpacity style={styles.saveBtn}
      onPress={handleChangeProfile}>
      <Text style={styles.saveBtnText}>저장</Text>
    </TouchableOpacity>
  )
}

export default function AppModifyProfile(){
  //const [imageUri, setImageUri] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [prevName, setPrevName]=useState("귄귄쓰");
  

  const getProfile = async () => {
    const api = '/user';
  
    try {
      // 비동기 호출을 대기 (await)하여 데이터를 받아옴
      const data = await call(api, true, 'GET');
  
      if (data.code === 200) {
        setPrevName(data.result.nickname);
        //setEmail(data.result.email);
      }
  
    } catch (error) {
      // 에러 처리 (필요한 경우)
      console.error('Error fetching profile:', error);
    }
  };


  const handleChangeProfile = () => {
    const changeNickname = '/user/nickname'
    const changeNicknameRequest = {
        nickname: nickname,
    }  

    if(isValidNickname){
      call(changeNickname, true, 'PATCH', changeNicknameRequest)
          .then(data => {
            if (data.code === 200) {
              //navigation.navigate('Start', { nickname: nickname });
              alert('닉네임이 변경되었습니다.');
              //navigation.goBack();
            }
        })
    } else {
      alert('공백은 들어갈 수 없습니다. 다시 한 번 확인해주세요.');
    }
  }

  useEffect(()=>{
    //setNickname("귄귄쓰")
    getProfile();
  },[])

  const checkNewNickname = () => {
    //const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
    setIsValidNickname(nickname!=="");
  }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:theme.color.white }}>
          <ModifyProfileImage />
          <ModifyProfileName name={nickname} setName={setNickname} checkNewNickname={checkNewNickname} prevName={prevName}/>
          <SaveBtn handleChangeProfile={handleChangeProfile}/>
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