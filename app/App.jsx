import React, { useState, useEffect } from 'react';
import Wallet from "@utils/Wallet";
import BottomTabNavigator from '../app/components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Onboarding from '@screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '@components/StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
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
