import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '@assets/Theme';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding =({navigation}) =>{
    const swiperRef = useRef(null); // Swiper를 제어하기 위한 ref 설정

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('alreadyLaunched', 'true');  // 온보딩 완료 상태 저장
        navigation.replace('GoHome');  // 메인 화면으로 이동
    };

    //   const completeOnboarding = (navigation) => {
    //     //await AsyncStorage.setItem('alreadyLaunched', 'true');  // 온보딩 완료 상태 저장
    //     navigation.replace('BottomTabNavigator');  // 메인 화면으로 이동
    //   };

    return (
        <Swiper 
        loop={false}
        showsPagination={true}
        ref={swiperRef}
        paginationStyle={{bottom: 170*theme.height}}
        dotStyle={styles.dotStyle} //dotStyle
        activeDotStyle={styles.activeDotStyle} //activeDotStyle
        >
            {/* 1번 */}
            <View style={styles.background}>
                <Text style={styles.titleText}>모임의 공금을 함께 관리해요!</Text>
                
                <Text style={styles.detailText}>블록체인 장부를 활용해</Text>
                <Text style={styles.detailText}>실시간으로 공금 사용 내역을 공유할 수 있어요</Text>
                
                <Image source={require('@assets/Images/Guinguin_Onboarding1.png')}
                style={styles.Image}/>
                
                <TouchableOpacity 
                style={styles.nextBtn} 
                onPress={() => swiperRef.current.scrollBy(1)} // 다음 슬라이드로 이동
                >
                    <Text style={styles.btnText}>다음</Text>
                </TouchableOpacity> 
            
            </View>

            {/* 2번 */}
            <View style={styles.background}>
                <Text style={styles.titleText}>모임의 일정을 확인해요!</Text>
                
                <Text style={styles.detailText}>모임의 일정을 공유하고</Text>
                <Text style={styles.detailText}>행사에 참여하여 리워드를 받을 수 있어요</Text>
                
                <Image source={require('@assets/Images/Guinguin_Onboarding2.png')}
                style={styles.Image}/>
                
                <TouchableOpacity 
                style={styles.nextBtn} 
                onPress={() => swiperRef.current.scrollBy(1)} // 다음 슬라이드로 이동
                >
                    <Text style={styles.btnText}>다음</Text>
                </TouchableOpacity> 
            
            </View>

            {/* 3번 */}
            <View style={styles.background}>
                <Text style={styles.titleText}>리워드로 쇼핑해요!</Text>
                
                <Text style={styles.detailText}>행사참여를 통해 받은 리워드로 상품을 구매할 수 있어요</Text>
                <Text style={styles.detailText}> </Text>
                
                <Image source={require('@assets/Images/Guinguin_Onboarding3.png')}
                style={styles.Image}/>
                
                <TouchableOpacity 
                style={styles.nextBtn} 
                onPress={() => swiperRef.current.scrollBy(1)} // 다음 슬라이드로 이동
                >
                    <Text style={styles.btnText}>다음</Text>
                </TouchableOpacity> 
            
            </View>

            {/* 4번 */}
            <View style={styles.background}>
                <Text style={styles.titleText}>커뮤니티로 소통해요!</Text>
                
                <Text style={styles.detailText}>모임만의 커뮤니티를 참여할 수 있어요</Text>
                <Text style={styles.detailText}> </Text>
                
                <Image source={require('@assets/Images/Guinguin_Onboarding4.png')}
                style={styles.Image}/>
                
                <TouchableOpacity 
                style={styles.startBtn} 
                onPress={completeOnboarding} // 다음 슬라이드로 이동
                >
                    <Text style={styles.startBtnText}>펌블 시작하기</Text>
                </TouchableOpacity> 
            
            </View>


        </Swiper>
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.white,
        paddingTop:120*theme.height,
        paddingHorizontal:16*theme.width,
        paddingBottom:70*theme.height,
    },
    titleText:{
        fontFamily:"Pretendard-Bold",
        fontSize:theme.fontSizes.fontSizes26,
        color:theme.color.main,
        lineHeight:26*theme.height,
        marginBottom:20*theme.height,
    },
    detailText:{
        fontFamily:"Pretendard-SemiBold",
        fontSize:theme.fontSizes.fontSizes15,
        color:theme.color.grey10,
        lineHeight:22*theme.height,
        //marginBottom:40*theme.height,
    },
    Image:{
        marginTop:40*theme.height,
        height:320*theme.width*theme.height,
        width:320*theme.width*theme.height,
    },
    nextBtn:{
        height:50*theme.height,
        width:358*theme.width,
        borderRadius:5,
        borderColor:theme.color.main,
        borderWidth:1,
        backgroundColor:theme.color.mainOpacity10,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom: 70,
    },
    btnText:{
        fontFamily:"Pretendard-SemiBold",
        fontSize:theme.fontSizes.fontSizes18,
        color:theme.color.main,
    },
    startBtn:{
        height:50*theme.height,
        width:358*theme.width,
        borderRadius:5,
        borderColor:theme.color.main,
        borderWidth:1,
        backgroundColor:theme.color.main,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom: 70,
    },
    startBtnText:{
        fontFamily:"Pretendard-SemiBold",
        fontSize:theme.fontSizes.fontSizes18,
        color:theme.color.white,
    },
    dotStyle: {
        backgroundColor: theme.color.grey6,
        width: 5,
        height: 5,
        borderRadius: 100,
        marginHorizontal: 2.5,
      },
      activeDotStyle: {
        backgroundColor: theme.color.main,
        width: 5,
        height: 5,
        borderRadius: 100,
        marginHorizontal: 2.5,
      },
})

export default Onboarding;