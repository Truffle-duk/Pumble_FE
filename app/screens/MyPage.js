import { StyleSheet, View, Text, ScrollView } from 'react-native';

function MyPage(){
    return (
        <ScrollView style={styles.background}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.ledgerText}>마이페이지</Text>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor:"#ffffff"
    },
    ledgerText:{
        fontFamily:'Pretendard-Bold',
        fontSize:50,
        color: "#000000"
    },
})

export default MyPage;