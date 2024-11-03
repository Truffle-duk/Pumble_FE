import {theme} from "@assets/Theme";
import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, TextInput,} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {call, formDataCall} from "@utils/ApiService";

function ModifyProfileImage({imageUri, setImageUri, setIsValidImage, setRequestUri}) {
    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options)
            .then(response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    const uri = response.assets[0].uri;
                    setImageUri({uri: `${uri}`});
                    setRequestUri(uri)
                    setIsValidImage(true)
                }
            })
    };

    return (
        <View style={styles.profileModifyImageContainer}>
            <View style={styles.profileImageContainer}>
                <Image source={imageUri} style={styles.profileImage}/>
            </View>
            <TouchableOpacity style={styles.profileImageModifyBtn} onPress={selectImage}>
                <Image source={require('@assets/Icons/galleryAdd.png')}
                       style={styles.profileImageModifyBtnIcon}/>
            </TouchableOpacity>
        </View>
    )
}

function ModifyProfileName({nickname, setNickname, checkNewNickname, prevName}) {
    return (
        <View style={styles.profileModifyNameContainer}>
            <View style={styles.profileModifyNameTextContainer}>
                <View style={styles.profileModifyNameInputTextContainer}>
                    <TextInput
                        returnKeyType='done'
                        maxLength={10}
                        value={nickname}
                        onChangeText={setNickname}
                        placeholder={prevName}
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

function SaveBtn({handleChangeProfile}) {
    return (
        <TouchableOpacity style={styles.saveBtn}
                          onPress={handleChangeProfile}>
            <Text style={styles.saveBtnText}>저장</Text>
        </TouchableOpacity>
    )
}

export default function ModifyProfile({navigation}) {
    const [nickname, setNickname] = useState("");
    const [isValidImage, setIsValidImage] = useState(false);
    const [requestUri, setRequestUri] = useState("")

    const [prevName, setPrevName] = useState("귄귄쓰");
    const [prevProfileImage, setPrevProfileImage] = useState(require('@assets/Images/Guinguin_Face.png'))

    const getProfile = async () => {
        const api = '/group/1/profile';

        try {
            // 비동기 호출을 대기 (await)하여 데이터를 받아옴
            const data = await call(api, true, 'GET');

            if (data.code === 200) {
                setPrevName(data.result.nickname);
                setPrevProfileImage({uri: `${data.result.profile_image}`})
            }
        } catch (error) {
            // 에러 처리 (필요한 경우)
            console.error('Error fetching profile:', error);
        }
    };

    const handleChangeProfile = async () => {
        const changeProfileImageHandler = async (imageIdentifier) => {
            const formData = new FormData();
            formData.append('image', {
                uri: requestUri,
                name: `profile_${imageIdentifier}.jpg`,
                type: 'image/jpeg'
            });

            const changeProfileImage = '/group/1/profile/image'
            if (isValidImage) {
                return formDataCall(changeProfileImage, true, 'PATCH', formData)
                    .then(data => {
                        return data.isSuccess
                    })
            }
        }

        const changeNicknameHandler = async () => {
            const changeNickname = '/group/1/profile/nickname'
            if(nickname.includes(" ") || nickname.length === 0 || nickname.length > 10) { // 닉네임 유효성 검사
                alert('닉네임에 공백이 포함되어 있거나 길이가 10 초과입니다.')
            }

            return call(changeNickname, true, 'PATCH', { newNickname: nickname })
                .then(data => {
                    return data.isSuccess
                })
        }

        if (nickname !== "" && requestUri !== "") { // 둘 다 바꾸는 경우
            changeNicknameHandler()
                .then(_ => {
                    changeProfileImageHandler(prevName)
                        .then( result => {
                            if (result) {
                                alert("프로필이 변경되었습니다.")
                                navigation.goBack()
                            }
                        })
                })
        } else if (nickname !== "" && requestUri === "") { // 닉네임만 바꾸는 경우
            changeNicknameHandler()
                .then( result => {
                    if (result) {
                        alert("닉네임이 변경되었습니다.")
                        navigation.goBack()
                    }
                })
        } else if (nickname === "" && requestUri !== "") { // 이미지만 바꾸는 경우
            changeProfileImageHandler(prevName)
                .then( result => {
                    if (result) {
                        alert("프로필 사진이 변경되었습니다.")
                        navigation.goBack()
                    }
                })
        } else { // 둘 다 입력되지 않은 경우
            alert("변경된 내용이 없어요.")
        }
    };

    useEffect(() => {
        //setNickname("귄귄쓰")
        getProfile();
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.color.white}}>
            <ModifyProfileImage imageUri={prevProfileImage} setImageUri={setPrevProfileImage} setIsValidImage={setIsValidImage} setRequestUri={setRequestUri}/>
            <ModifyProfileName nickname={nickname} setNickname={setNickname} prevName={prevName}/>
            <SaveBtn handleChangeProfile={handleChangeProfile}/>
        </View>
    );
}


const styles = StyleSheet.create({
    profileModifyImageContainer: {
        height: 120 * theme.height * theme.width,
        width: 120 * theme.width * theme.height,
        position: 'relative',
        flexDirection: 'row-reverse',
        //backgroundColor:'red',
        alignItems: 'flex-end',
        marginBottom: 5 * theme.height,
    },
    profileImageContainer: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: theme.color.mainOpacity10,
        height: 120 * theme.height * theme.width,
        width: 120 * theme.width * theme.height,
        overflow: 'hidden'
    },
    profileImage: {
        height: '100%',
        width: '100%',
    },
    profileImageModifyBtn: {
        position: 'absolute',
        height: 28 * theme.height * theme.width,
        width: 28 * theme.width * theme.height,
        backgroundColor: theme.color.white,
        borderRadius: 100,
        //margin:4*theme.width,
        //marginBottom:4*theme.height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImageModifyBtnIcon: {
        height: 15 * theme.height * theme.width,
        width: 15 * theme.width * theme.height,
    },
    profileModifyNameContainer: {
        flexDirection: 'column',
        width: 250 * theme.width,
        //height:30*theme.height,
        marginVertical: 30 * theme.height,
    },
    profileModifyNameTextContainer: {
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5 * theme.width
    },
    profileModifyNameInputTextContainer: {
        flex: 1,
        marginLeft: 20 * theme.width * theme.height,
        paddingLeft: 5 * theme.width,
        alignContent: 'center',
        justifyContent: 'center',
        //backgroundColor:'red',
    },
    profileModifyNameInputText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.grey10,
        lineHeight: 22 * theme.height,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 0,
        //backgroundColor:'red',
        //height:45*theme.height
    },
    profileNameModifyBtn: {
        height: 20 * theme.height * theme.width,
        width: 20 * theme.width * theme.height,
        marginLeft: 5 * theme.width,
    },
    profileNameModifyBtnIcon: {
        height: 20 * theme.height * theme.width,
        width: 20 * theme.width * theme.height,
    },
    line: {
        //width:250*theme.width,
        height: 1,
        backgroundColor: theme.color.grey1,
    },
    saveBtn: {
        //flex:1,
        //flexDirection:'row',
        backgroundColor: theme.color.mainOpacity10,
        height: 50 * theme.height,
        width: 328 * theme.width,
        //marginHorizontal:31*theme.width,
        borderWidth: 1,
        borderColor: theme.color.main,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    saveBtnText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        color: theme.color.main,
    }

})