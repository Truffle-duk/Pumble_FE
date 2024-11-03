import React, { useState, useEffect } from 'react';
import Wallet from "@utils/Wallet";
import BottomTabNavigator from '../app/components/BottomTabNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Onboarding from '@screens/Onboarding';
import Login from '@screens/Login'
import Join1 from '@screens/Join1';
import Join2 from '@screens/Join2';
import Join3 from '@screens/Join3';
import Join4 from '@screens/Join4';
import Start from '@screens/Start';
import JoinGroup from '@screens/JoinGroup';
import CreateGroup from '@screens/CreateGroup';
import { StatusBar } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '@components/StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { theme } from '@assets/Theme';


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

function AppContent() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const insets = useSafeAreaInsets();

    return (
          <SafeAreaView 
          style={{backgroundColor: theme.color.main, paddingTop:0, 
            flex:1}}
          >
            {/* <Wallet /> */}
            <StatusBar 
                //hidden={true}
                barStyle="light-content" 
                translucent={true}
                backgroundColor="transparent" 
            />
            <NavigationContainer>
                <MainStackNavigator/>
            </NavigationContainer>            
            {/* <BottomTabNavigator /> */}
            </SafeAreaView>
        
    );
}

function App(){
  return(
    <SafeAreaProvider>
      <AppContent/>
    </SafeAreaProvider>
  )
}

export default App;
