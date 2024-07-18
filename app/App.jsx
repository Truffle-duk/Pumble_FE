import React from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import BottomTabNavigator from "@components/BottomTabNavigator";

function App() {

    return (
        <SafeAreaProvider>
            <BottomTabNavigator />
        </SafeAreaProvider>
    );
}

export default App;
