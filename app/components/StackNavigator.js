import * as React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
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
import { create } from 'react-test-renderer';

import Store2 from '@screens/Store2';
import Store_CoffeeDessert from '@screens/Store_CoffeeDessert';
import Store_FoodFranchise from '@screens/Store_FoodFranchise';
import Store_GiftCard from '@screens/Store_GiftCard';
import Store_Entertainment from '@screens/Store_Entertainment';
import Store_Ect from '@screens/Store_Ect';

import Store_CoffeeDessert_Detail from '@screens/Store_CoffeeDessert_Detail';
import Store_Entertainment_Detail from '@screens/Store_Entertainment_Detail';
import Store_FoodFranchise_Detail from '@screens/Store_FoodFranchise_Detail';
import Store_GiftCard_Detail from '@screens/Store_GiftCard_Detail';
import Store_Ect_Detail from '@screens/Store_Ect_Detail';

const Stack = createNativeStackNavigator();

//header
function StackHeader({ navigation, scene, previous }){
    return(
        <View style={styles.stackHeaderStyle}>
            <Text style={styles.headerTitle}>고사모</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Alarm")}>
                <Image
                source={require('../assets/Icons/alarmIcon.png')}
                style={styles.headerIcon}
                />
            </TouchableOpacity>
        </View>
    );
}
function MyPageHeader(){
    return(
        <View style={styles.MyPageHeader}>
            <Text style={styles.MyPageHeaderTitle}>마이 페이지</Text>
        </View>
    );
}

const StackNavigator = ({route}) => {
    const { id } = route;

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
                            header:()=><MyPageHeader/>
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

            <Stack.Screen name="Store2" component={Store2} options={{ title: '리워드 스토어' }}/>
            <Stack.Screen name="Store_CoffeeDessert" component={Store_CoffeeDessert}/>
            <Stack.Screen name="Store_FoodFranchise" component={Store_FoodFranchise}/>
            <Stack.Screen name="Store_GiftCard" component={Store_GiftCard}/>
            <Stack.Screen name="Store_Entertainment" component={Store_Entertainment}/>
            <Stack.Screen name="Store_Ect" component={Store_Ect}/>

            <Stack.Screen name="Store_CoffeeDessert_Detail" component={Store_CoffeeDessert_Detail}options={{ title: '리워드 스토어' }}/>
            <Stack.Screen name="Store_Entertainment_Detail" component={Store_Entertainment_Detail}options={{ title: '리워드 스토어' }}/>
            <Stack.Screen name="Store_FoodFranchise_Detail" component={Store_FoodFranchise_Detail}options={{ title: '리워드 스토어' }}/>
            <Stack.Screen name="Store_GiftCard_Detail" component={Store_GiftCard_Detail}options={{ title: '리워드 스토어' }}/>
            <Stack.Screen name="Store_Ect_Detail" component={Store_Ect_Detail}options={{ title: '리워드 스토어' }}/>

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    MyPageHeaderTitle:{
        color:theme.color.gery10,
        fontFamily:"Pretendard-Bold",
        fontSize:theme.fontSizes.fontSizes20,
    }

})
export default StackNavigator;