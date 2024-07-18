import { StyleSheet, View, Text, ScrollView } from 'react-native';

function Alarm(){
    return (
        <ScrollView style={styles.background}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.ledgerText}>알람</Text>
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

export default Alarm;