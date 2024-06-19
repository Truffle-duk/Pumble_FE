import React from 'react';
import BottomTabNavigator from '../app/components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App() {

    return (
        <SafeAreaProvider>

            <BottomTabNavigator />
        </SafeAreaProvider>
        
    );
}

export default App;
