// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';

// function Home(){
//     return (
//       <ScrollView style={styles.background}>
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={styles.ledgerText}>장부</Text>
//         </View>
//       </ScrollView>
        
//       );
// }

// const styles = StyleSheet.create({
//   background:{
//     backgroundColor:"#ffffff"
//   },
//   ledgerText:{
//     fontFamily:'Pretendard-Bold',
//     fontSize:50,
//     color: "#000000"
//   },
// })

// export default Home;

import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet, SafeAreaView } from 'react-native';

const BalanceDisplay = () => {
  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.balanceText}>공금 잔액: 1,000,000원</Text>
    </View>
  );
};

const ItemView = ({ item, onUpdate }) => {
  const [description, setDescription] = useState(item.description);

  const handleUpdate = () => {
    onUpdate(item.id, description); // description 업데이트 함수 호출
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          onEndEditing={handleUpdate} // 편집이 끝났을 때 업데이트
        />
        <Text style={styles.itemText}>{item.time} | {item.amount}</Text>
      </View>
    </View>
  );
};

const TransactionListHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>상세 내역</Text>
    </View>
  );
};

const Ledger = () => {
  const [data, setData] = useState([
    { id: '1', time: '16:12', description: '분당점', amount: '-45,000원', image: 'https://example.com/image1.jpg' },
    { id: '2', time: '16:12', description: '종로점', amount: '-45,000원', image: 'https://example.com/image2.jpg' },
    { id: '3', time: '16:12', description: '강남점', amount: '-45,000원', image: 'https://example.com/image3.jpg' },
    { id: '4', time: '16:12', description: '강남점', amount: '-45,000원', image: 'https://example.com/image3.jpg' },
    // 추가 데이터 필요시 이곳에 추가
  ]);

  const updateItemDescription = (id, newDescription) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, description: newDescription };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BalanceDisplay />
      <FlatList
        data={data}
        renderItem={({ item }) => <ItemView item={item} onUpdate={updateItemDescription} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={TransactionListHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 123, // 상단바 높이
    paddingBottom: 87, // 하단바 높이
  },
  balanceContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 120, // 상세 내역과의 간격
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    fontSize: 16,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 18
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // 원형 이미지로 만들기
  }
});

export default Ledger;