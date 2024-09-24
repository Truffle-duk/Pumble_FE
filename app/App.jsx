import React, { useState, useEffect } from 'react';
import Wallet from "@utils/Wallet";
import BottomTabNavigator from '../app/components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Onboarding from '@screens/Onboarding';
import Login from '@screens/Login'
import Join1 from '@screens/Join1';
import Join2 from '@screens/Join2';
import Join3 from '@screens/Join3';
import Join4 from '@screens/Join4';
import Start from '@screens/Start';
import JoinGroup from '@screens/JoinGroup';
import CreateGroup from '@screens/CreateGroup';


import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '@components/StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Join1" component={Join1} options={{headerShown: false}}/>
        <Stack.Screen name="Join2" component={Join2} options={{headerShown: false}}/>
        <Stack.Screen name="Join3" component={Join3} options={{headerShown: false}}/>
        <Stack.Screen name="Join4" component={Join4} options={{headerShown: false}}/>
        <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
        <Stack.Screen name="JoinGroup" component={JoinGroup} options={{headerShown: false}}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup} options={{headerShown: false}}/>
        <Stack.Screen name="GoHome" component={BottomTabNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
    );
  }

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
  //     if (alreadyLaunched === null) {
  //       setIsFirstLaunch(true);
  //       await AsyncStorage.setItem('alreadyLaunched', 'true');
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   };
  //   checkFirstLaunch();
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null;  // 로딩 상태
  // } 

    return (
        <SafeAreaProvider>
            {/* <Wallet /> */}
            <NavigationContainer>
              {/* {isFirstLaunch ?(
                <MainStackNavigator/>
              ):(
                <BottomTabNavigator/>
              )} */}
                <MainStackNavigator/>
            </NavigationContainer>            
            {/* <BottomTabNavigator /> */}
        </SafeAreaProvider>
        
    );
}

export default App;
