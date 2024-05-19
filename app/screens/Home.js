import { theme } from "@assets/Theme";
import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';

export default function Home({navigation}){
    return (
      <>
        {/* <StatusBar
        backgroundColor={theme.color.main}/> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Ledger"
            onPress={()=>navigation.navigate('Ledger')}/>
          
        </View>
      </>
      );
}