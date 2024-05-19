import { theme } from "@assets/Theme";
import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';

export default function MyPage({navigation}){
    return (
      <>
        {/* <StatusBar
        backgroundColor={theme.color.white}/> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Mypage!</Text>
        </View>
      </>
      );
}
