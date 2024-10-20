import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar, Modal, Animated, Alert } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { theme } from '@assets/Theme';

//pages
import Home from '@screens/Home';
import Ledger from '@screens/Ledger';
import Event from '@screens/Event';
import Store from '@screens/Store';
import MyPage from '@screens/MyPage';
import Alarm from '@screens/Alarm';
import ModifyProfile from '@screens/ModifyProfile';
import PBHistory from '@screens/PBHistory';
import PurchasedProductList from '@screens/PurchasedProductList';
import Community from '@screens/Community';
import Post from '@screens/Post';
import WritePost from '@screens/WritePost';
import Notification from '@screens/Notification';
import NoticeDetail from '@screens/NoticeDetail';

//new page
import AppMyPage from '@screens/AppMyPage';
import AppManageGroup from '@screens/AppManageGroup';
import JoinGroup from '@screens/JoinGroup';
import CreateGroup from '@screens/CreateGroup';
import ManageMyGroup from '@screens/ManageMyGroup';
import AppModifyProfile from '@screens/AppModifyProfile';

import ChangeGroupPW from "@screens/ChangeGroupPW";
import ConfirmPW from "@screens/ConfirmPW";

//Manager Page
import AddReceipt_M from "@screens/AddReceipt_M";

import Store2 from '@screens/Store2';
import ItemDetail from "@screens/ItemDetail";

const Stack = createNativeStackNavigator();

function SwitchOverlay({overlayVisible, animatedHeight, closeModal, navigation, alert}){
    const [isLogout,setIsLogout]=useState(false);
    //const [switchGroup,setSwitchGroup]=useState("")
  
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
                <Text style={styles.overlayHeaderText}>모임전환</Text>
              </View>
              
              <TouchableOpacity onPress={closeModal} >
                  <Image source={require("@assets/Icons/closeIcon.png")}
                    style={styles.overlayHeaderIcon}
                    />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.logoutTextContainer}>
              <Text style={styles.logoutText}>로그아웃 하시겠어요?</Text>
              <Text style={styles.logoutDetailText}>나중에 다시 로그인 할 수 있어요!</Text>
            </View>          
  
            <TouchableOpacity style={styles.logoutBtn}
              onPress={()=>setIsLogout(true)}>
              <Text style={styles.logoutBtnText}>로그아웃 하기</Text>
            </TouchableOpacity> */}
            <TouchableOpacity>
                <Text style={styles.overlayGroupNameMain}>고사모</Text>
            </TouchableOpacity>
            <View style={styles.lineHorizontal}/>
            <TouchableOpacity>
                <Text style={styles.overlayGroupName}>강사모</Text>
            </TouchableOpacity>
            <View style={styles.lineHorizontal}/>
            <TouchableOpacity>
                <Text style={styles.overlayGroupName}>햄사모</Text>
            </TouchableOpacity>
            <View style={styles.lineHorizontal}/>
            <TouchableOpacity>
                <Text style={styles.overlayGroupName}>쿼사모</Text>
            </TouchableOpacity>
            <View style={styles.lineHorizontal}/>
            <View style={{alignItems:'center'}}>
                <View style={styles.overlayDetailContainer}>
                    <TouchableOpacity onPress={()=>navigation.navigate('AppMyPage')}>
                        <Text style={styles.overlayDetailText}>계정 관리</Text>
                    </TouchableOpacity>
                    <View style={styles.lineVertical}/>
                    <TouchableOpacity onPress={()=>alert()}>
                        <Text style={styles.overlayDetailText}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>
            

  
          </Animated.View>
        </TouchableOpacity>
      </Modal>
  
    );
  }

//header
function StackHeader({ navigation, scene, previous }){
  const [switchOverlayVisible, setSwitchOverlayVisible]=useState(false);
  const animatedHeight=useRef(new Animated.Value(0)).current;

  const openSwitchModal=()=>{
    setSwitchOverlayVisible(true);
    Animated.timing(animatedHeight, {
      toValue: 287, // 모달의 높이
      duration: 0, // 애니메이션 지속 시간
      useNativeDriver: false
    }).start();
  };

  const closeSwitchModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 287,
      duration: 0,
      useNativeDriver: false
    }).start(() => setSwitchOverlayVisible(false));
  };
  //const [quitGroup, setQuitGroup]=useState("");

    const logoutAlert=()=>{
        Alert.alert(
            "로그아웃",
            "로그아웃 하시겠어요?",
            [
                {
                    text:"취소", 
                    //onPress: () => setQuitGroup(groupName)
                    style:'cancel'
                },
                {
                    text:"로그아웃", 
                    //onPress: () => setQuitGroup(groupName)
                },
            ],
            {cancelable:true}
        );
    };

    return(
        <View style={styles.stackHeaderStyle}>
            <View style={styles.stackHeaderGroupContainer}>
                <Text style={styles.headerTitle}>고사모</Text>
                <TouchableOpacity onPress={openSwitchModal}>
                    <Image source={require('@assets/Icons/dropdownIcon2.png')}
                    style={styles.dropdownIcon}/>
                </TouchableOpacity>
                
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate("Alarm")}>
                <Image
                source={require('../assets/Icons/alarmIcon.png')}
                style={styles.headerIcon}
                />
            </TouchableOpacity>
            <SwitchOverlay overlayVisible={switchOverlayVisible} animatedHeight={animatedHeight} closeModal={closeSwitchModal} navigation={navigation} alert={logoutAlert}/>
        </View>
    );
}
function CustomHeader({navigation, title }){
    return(
        <View style={styles.MyPageHeader}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}>
                <Image source={require('../assets/Icons/backArrow.png')}
                 style={styles.backIcon}/>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
                <Text style={styles.MyPageHeaderTitle}>{title}</Text>
            </View>
            
        </View>
    );
}
// function MyPageHeader(){
//     return(
//         <View style={styles.MyPageHeader}>
//             <Text style={styles.MyPageHeaderTitle}>마이 페이지</Text>
//         </View>
//     );
// }

const StackNavigator = ({route}) => {
    const { id } = route;
    
    const [switchOverlayVisible, setSwitchOverlayVisible]=useState(false);
    const animatedHeight=useRef(new Animated.Value(0)).current;
  
    const openSwitchModal=()=>{
      setLogoutOverlayVisible(true);
      Animated.timing(animatedHeight, {
        toValue: 287, // 모달의 높이
        duration: 0, // 애니메이션 지속 시간
        useNativeDriver: false
      }).start();
    };
  
    const closeSwitchModal = () => {
      Animated.timing(animatedHeight, {
        toValue: 287,
        duration: 0,
        useNativeDriver: false
      }).start(() => setLogoutOverlayVisible(false));
    };
  

    return(
        <>
        {/* <StatusBar 
        backgroundColor={theme.color.main}
        /> */}
        <Stack.Navigator>
            {
                id === 1 ? (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            header:(props) => <StackHeader {...props}/>
                        }}
                        />
                ): id === 2 ?(
                    <Stack.Screen
                        name="Ledger"
                        component={Ledger}
                        options={{
                            header:(props) => <StackHeader {...props}/>
                        }}
                        />
                ): id === 3 ?(
                    <Stack.Screen
                        name="Event"
                        component={Event}
                        options={{
                            header:(props) => <StackHeader {...props}/>
                        }}
                        />
                ): id === 4 ?(
                    <Stack.Screen
                        name="Store"
                        component={Store}
                        options={{
                            header:(props) => <StackHeader {...props}/>
                        }}
                        />
                ): id === 5 ? (
                    <Stack.Screen
                        name="MyPage"
                        component={MyPage}
                        // options={{
                        //     headerTitle:(...props) => (
                        //         <View>
                        //           <Text style={{color:theme.color.white}}>고사모</Text>
                        //         </View>
                        //       ),
                        //     headerStyle:{
                        //         backgroundColor:theme.color.white,
                        //     },
                        // }}
                        options={{
                            header:(props)=><CustomHeader {...props} title={"마이 페이지"}/>
                        }}
                        />
                ): (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            header:(props) => <StackHeader {...props}/>
                        }}
                        />
                )
            }
            
            <Stack.Screen name="Alarm" component={Alarm}/>
            {/* <Stack.Screen name='ModifyProfile' component={ModifyProfile}/>
            <Stack.Screen name='PBHistory' component={PBHistory}/>
            <Stack.Screen name='PurchasedProductList' component={PurchasedProductList}/> */}
            <Stack.Screen name='Community' component={Community}  options={{
                            header:(props)=><CustomHeader {...props} title={"커뮤니티"}/>
                        }}/>
            <Stack.Screen name="Ledger2" component={Ledger} options={{
                    header:(props) => <StackHeader {...props}/>
                }}/>
            <Stack.Screen name='ModifyProfile' component={ModifyProfile} options={{
                            header:(props)=><CustomHeader {...props} title={"마이 페이지"}/>
                        }}/>
            <Stack.Screen name='PBHistory' component={PBHistory}  options={{
                            header:(props)=><CustomHeader {...props} title={"내 PB 내역"}/>
                        }}/>
            <Stack.Screen name='PurchasedProductList' component={PurchasedProductList}  options={{
                            header:(props)=><CustomHeader {...props} title={"구매 상품 내역"}/>
                        }}/>
            <Stack.Screen name='Post' component={Post}  options={{
                            header:(props)=><CustomHeader {...props} title={"커뮤니티"}/>
                        }}/>
            <Stack.Screen name='WritePost' component={WritePost}  options={{
                            header:(props)=><CustomHeader {...props} title={"글 쓰기"}/>
                        }}/>

            <Stack.Screen name='Notification' component={Notification}  options={{
                                        header:(props)=><CustomHeader {...props} title={"공지사항"}/>
                                    }}/>
            <Stack.Screen name='NoticeDetail' component={NoticeDetail}  options={{
                                                    header:(props)=><CustomHeader {...props} title={"공지사항"}/>
                                                }}/>
            <Stack.Screen name="Store2" component={Store2} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="ItemDetail" component={ItemDetail} options={{
                header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
            }}/>
            
            <Stack.Screen name='AppMyPage' component={AppMyPage}  options={{
                header:(props)=><CustomHeader {...props} title={"계정 관리"}/>
            }}/>
            <Stack.Screen name='ModifyProfile2' component={AppModifyProfile} options={{
                            header:(props)=><CustomHeader {...props} title={"계정 관리"}/>
                        }}/>
            <Stack.Screen name='AppManageGroup' component={AppManageGroup} options={{
                            header:(props)=><CustomHeader {...props} title={"모임 관리"}/>
                        }}/>
            <Stack.Screen name='ManageMyGroup' component={ManageMyGroup} options={{
                header:(props)=><CustomHeader {...props} title={"모임 관리"}/>
            }}/>

            <Stack.Screen name="JoinGroup" component={JoinGroup} options={{headerShown: false}}/>
            <Stack.Screen name="CreateGroup" component={CreateGroup} options={{headerShown: false}}/>
            <Stack.Screen name='ChangeGroupPW' component={ChangeGroupPW} options={{
                header:(props)=><CustomHeader {...props} title={"모임 비밀번호 변경"}/>
            }}/>
            <Stack.Screen name='ConfirmPW' component={ConfirmPW} options={{
                header:(props)=><CustomHeader {...props} title={"모임 삭제"}/>
            }}/>
            <Stack.Screen name='AddReceipt' component={AddReceipt_M} options={{
                            header:(props)=><CustomHeader {...props} title={"거래 상세"}/>
                        }}/>
        </Stack.Navigator>
        </>

    )
}

const styles = StyleSheet.create({
    stackHeaderStyle:{
        backgroundColor:theme.color.main,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        height:70*theme.height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stackHeaderGroupContainer:{
        flexDirection:'row',
        //justifyContent:'center',
        alignItems:'center'
    },
    dropdownIcon:{
        width:15*theme.width*theme.height,
        height:10*theme.width*theme.height,
        marginLeft:10*theme.width
    },
    headerTitle:{
        color:theme.color.white,
        fontFamily:"Pretendard-Bold",
        fontSize:theme.fontSizes.fontSizes22,
        marginLeft:16*theme.width,
    },
    headerIcon:{
        width: 20 * theme.width, 
        height: 20 * theme.height,
        marginRight:23*theme.width, 
    },
    MyPageHeader:{
        backgroundColor:theme.color.white,
        height:70*theme.height,
        borderBottomColor:theme.color.grey1,
        borderBottomWidth:0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:16*theme.width,
    },
    MyPageHeaderTitle:{
        color:theme.color.gery10,
        fontFamily:"Pretendard-Bold",
        fontSize:theme.fontSizes.fontSizes20,
    },
    backIcon:{
        height:24*theme.height*theme.width,
        width:24*theme.height*theme.width,
    },
    headerTextContainer:{
        flex:1,
        marginRight:24*theme.height*theme.width,
        justifyContent:'center',
        alignItems:'center',
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
      lineHorizontal:{
        height:1,
        backgroundColor:theme.color.background,
        marginVertical:15*theme.height,
      },
      lineVertical:{
        width:1,
        backgroundColor:theme.color.grey1,
        //backgroundColor:'red',
        marginHorizontal:35*theme.width
      },
      overlayGroupNameMain:{
        fontSize:theme.fontSizes.fontSizes20,
        fontFamily:"Pretendard-Medium",
        color:theme.color.main,
        lineHeight:22
      },
      overlayGroupName:{
        fontSize:theme.fontSizes.fontSizes20,
        fontFamily:"Pretendard-Medium",
        color:theme.color.grey2,
        lineHeight:22
      },
      overlayDetailContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15*theme.height
      },
      overlayDetailText:{
        fontSize:theme.fontSizes.fontSizes16,
        fontFamily:"Pretendard-Medium",
        color:theme.color.grey1,
        lineHeight:22
      }


})
export default StackNavigator;