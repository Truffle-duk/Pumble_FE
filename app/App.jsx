import React from 'react';
import Wallet from "@utils/Wallet";
import BottomTabNavigator from '../app/components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App() {

    return (
        <SafeAreaProvider>
            {/* <Wallet /> */}

            <BottomTabNavigator />
        </SafeAreaProvider>
        
    );
}

export default App;
