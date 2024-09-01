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
import ModifyProfile from '@screens/ModifyProfile';
import PBHistory from '@screens/PBHistory';
import PurchasedProductList from '@screens/PurchasedProductList';
import Community from '@screens/Community';
import Post from '@screens/Post';
import Writepost from '@screens/WritePost';

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
            {/* <Stack.Screen name='Ledger2' component={Ledger2}/> */}
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
            <Stack.Screen name='Writepost' component={Writepost}  options={{
                            header:(props)=><CustomHeader {...props} title={"글 쓰기"}/>
                        }}/>
            <Stack.Screen name="Store2" component={Store2} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_CoffeeDessert" component={Store_CoffeeDessert} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_FoodFranchise" component={Store_FoodFranchise} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_GiftCard" component={Store_GiftCard} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_Entertainment" component={Store_Entertainment} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_Ect" component={Store_Ect} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_CoffeeDessert_Detail" component={Store_CoffeeDessert_Detail} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_Entertainment_Detail" component={Store_Entertainment_Detail} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_FoodFranchise_Detail" component={Store_FoodFranchise_Detail} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_GiftCard_Detail" component={Store_GiftCard_Detail} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
                        }}/>
            <Stack.Screen name="Store_Ect_Detail" component={Store_Ect_Detail} options={{
                            header:(props)=><CustomHeader {...props} title={"리워드 스토어"}/>
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
    }

})
export default StackNavigator;