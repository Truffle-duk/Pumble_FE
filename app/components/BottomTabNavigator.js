import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//pages
import StackNavigator from "./StackNavigator";

import { theme } from "@assets/Theme";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
  
const Tab = createBottomTabNavigator();

const BottomTabNavigator=({navigation})=>{
    const insets = useSafeAreaInsets(); //탭 가용범위 받아오기   
    
    return(
        <>        
        {/* <NavigationContainer> */}
            <Tab.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                tabBarActiveTintColor:theme.color.main,
                tabBarInactiveTintColor:theme.color.grey1,

                //텍스트 스타일, 아이콘 첨부, 하단바 라운딩 등 스타일링
                tabBarStyle:{
                    position: 'absolute',
                    height:77*theme.height + insets.bottom,
                    //내부 패딩 (계산해서 적용)
                    paddingBottom:22*theme.height,
                    paddingTop:9*theme.height,
                    paddingHorizontal:18*theme.width,
                    //하단 탭바 모양 및 테두리
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    borderWidth:1,
                    borderTopWidth:1,
                    borderColor:theme.color.grey7,
                    //그림자 문제....일단 투명으로 처리
                    shadowColor:"#00000000",
                },
                tabBarLabelStyle:{...styles.tabBarLabelStyle},
                headerShown:false,
                
            }}
            >
                <Tab.Screen name="HomeScreen"
                options={{
                    tabBarLabel:"홈",
                    tabBarIcon:({focused})=>{
                        return(
                            <Image
                                source={focused?require("../assets/Icons/homeIcon_Active.png")
                                    :require("../assets/Icons/homeIcon_Inactive.png")
                                }
                                style={styles.iconStyle1}
                                />
                        )
                    },
                }}>
                    {(props)=><StackNavigator route={{id:1}}/>}
                </Tab.Screen>
                <Tab.Screen name="LedgerScreen"
                //component={LedgerNavigator}
                options={{
                    tabBarLabel:"장부",
                    tabBarIcon:({focused})=>{
                        return(
                            <Image
                                source={focused?require("../assets/Icons/ledgerIcon_Active.png")
                                    :require("../assets/Icons/ledgerIcon_Inactive.png")
                                }
                                style={styles.iconStyle2}
                                />
                        )
                    }
                }}>
                    {(props)=><StackNavigator route={{id:2}}/>}
                </Tab.Screen>
                <Tab.Screen name="EventScreen"
                //component={Event}
                options={{
                    tabBarLabel:"일정",
                    tabBarIcon:({focused})=>{
                        return(
                            <Image
                                source={focused?require("../assets/Icons/calendarIcon_Active.png")
                                    :require("../assets/Icons/calendarIcon_Inactive.png")
                                }
                                style={styles.iconStyle2}
                                />
                        )
                    }
                }}>
                    {(props)=><StackNavigator route={{id:3}}/>}
                </Tab.Screen>
                <Tab.Screen name="StoreScreen"
                //component={Store}
                options={{
                    tabBarLabel:"스토어",
                    tabBarIcon:({focused})=>{
                        return(
                            <Image
                                source={focused?require("../assets/Icons/storeIcon_Active.png")
                                    :require("../assets/Icons/storeIcon_Inactive.png")
                                }
                                style={styles.iconStyle2}
                                />
                        )
                    }
                }}>
                    {(props)=><StackNavigator route={{id:4}}/>}
                </Tab.Screen>
                <Tab.Screen name="MyPageScreen"
                //component={MyPage}
                options={{
                    tabBarLabel:"마이",
                    tabBarIcon:({focused})=>{
                        return(
                            <Image
                                source={focused?require("../assets/Icons/mypageIcon_Active.png")
                                    :require("../assets/Icons/mypageIcon_Inactive.png")
                                }
                                style={styles.iconStyle2}
                                />
                        )
                    }
                }}>
                    {(props)=><StackNavigator route={{id:5}}/>}
                </Tab.Screen>
            </Tab.Navigator>

        {/* </NavigationContainer> */}
        </>        
    );
}

const styles = StyleSheet.create({    
    iconStyle1:{
        width:20*theme.width, 
        height:20*theme.height
    },
    iconStyle2:{
        width:24*theme.width, 
        height:24*theme.height
    },
    tabBarLabelStyle:{
        fontFamily:'Pretendard-Bold',
        fontSize:theme.fontSizes.fontSizes12,
    },
    
})

export default BottomTabNavigator;