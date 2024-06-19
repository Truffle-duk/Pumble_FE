import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Image, Modal, Animated, TextInput } from 'react-native';
import { theme } from "@assets/Theme";

import { Calendar } from "react-native-calendars";
import moment from "moment";

import { Dimensions } from 'react-native';
import { ThemeProvider, useNavigation } from '@react-navigation/native';

//캘린더 로컬화
import { LocaleConfig } from 'react-native-calendars';

const screenWidth=Dimensions.get('screen').width; 
const screenHeight = Dimensions.get('screen').height;

//dummy data
const userName="귄귄이"
const eventDatas=[
  {
    "Date":'2024-05-25',
    "Name":"정기 봉사",
    "StartTime":"16:00",
    "EndTime":"18:00",
    "Place":"부산시 사상구 덕포동 388-5 찬희빌딩 2층",
    "Description":"...",
    "isParticipated":true
  },
  {
    "Date":'2024-05-30',
    "Name":"정기 모임",
    "StartTime":"13:00",
    "EndTime":"17:00",
    "Place":"서울시 도봉구",
    "Description":"...!!",
    "isParticipated":false
  },
  {
    "Date":'2024-06-25',
    "Name":"정기 봉사",
    "StartTime":"16:00",
    "EndTime":"18:00",
    "Place":"부산시 사상구 덕포동 388-5 찬희빌딩 2층",
    "Description":"...",
    "isParticipated":false
  },
  {
    "Date":'2024-06-30',
    "Name":"정기 모임",
    "StartTime":"13:00",
    "EndTime":"17:00",
    "Place":"서울시 도봉구",
    "Description":"...!!",
    "isParticipated":false
  },

]
const thisMonthEventDatas=[
  // {
  //   "Date":'2024-05-25',
  //   "Name":"정기 봉사",
  //   "StartTime":"16:00",
  //   "EndTime":"18:00",
  //   "Place":"부산시 사상구 덕포동 388-5 찬희빌딩 2층",
  //   "Description":"...",
  //   "isParticipated":true
  // },
  // {
  //   "Date":'2024-05-30',
  //   "Name":"정기 모임",
  //   "StartTime":"13:00",
  //   "EndTime":"17:00",
  //   "Place":"서울시 도봉구",
  //   "Description":"...!!",
  //   "isParticipated":false
  // },
  {
    "Date":'2024-06-25',
    "Name":"정기 봉사",
    "StartTime":"16:00",
    "EndTime":"18:00",
    "Place":"부산시 사상구 덕포동 388-5 찬희빌딩 2층",
    "Description":"...",
    "isParticipated":false
  },
  {
    "Date":'2024-06-30',
    "Name":"정기 모임",
    "StartTime":"13:00",
    "EndTime":"17:00",
    "Place":"서울시 도봉구",
    "Description":"...!!",
    "isParticipated":false
  }
]
const lastEventData=[
  {
    "Date":'2024-05-30',
    "Name":"정기 모임",
    "StartTime":"13:00",
    "EndTime":"17:00",
    "Place":"서울시 도봉구",
    "Description":"...!!",
    "isParticipated":false
  }
]
const upcomingEventData=[
  {
    "Date":'2024-06-25',
    "Name":"정기 봉사",
    "StartTime":"16:00",
    "EndTime":"18:00",
    "Place":"부산시 사상구 덕포동 388-5 찬희빌딩 2층",
    "Description":"...",
    "isParticipated":false
  },
]

//날짜 세기
const getDateDifference = (date1, date2) => {
  const mDate1 = moment(date1);
  const mDate2 = moment(date2);
  return mDate2.diff(mDate1, 'days'); // 'days'를 'hours', 'minutes' 등으로 변경 가능
};

const currentDate = moment(); // 현재 날짜 및 시간


function Top({user, thisMonthEvent}){
  return(
    <View style={styles.topContainer}>
            <Image source={require("../assets/Images/Guinguin_ReadingBook.png")}
                style={styles.imageStyle}/>
            <View style={styles.topTextContainer}>
              <View style={styles.topNameContainer}> 
                <Text style={styles.nameText}>{user}</Text>
                <Text style={styles.topDescriptionText1}>님,</Text>
              </View>
              <Text style={styles.topDescriptionText1}>오늘의 일정을 확인해 볼까요?</Text>
              <Text style={styles.topDescriptionText2}>이번달에 {thisMonthEvent.length}개의 일정이 있어요!</Text>
            </View>            
          </View>
  )
}

function EventCard({lastEvent, upcomingEvent}){
  //일단은 랜덤 픽
  const random1=Math.floor(Math.random()/8);
  const random2=Math.floor(Math.random()/8)+1;

  const eventIcons = [
    require('../assets/Icons/eventIcon1.png'),
    require('../assets/Icons/eventIcon2.png'),
    require('../assets/Icons/eventIcon3.png'),
    require('../assets/Icons/eventIcon4.png'),
    require('../assets/Icons/eventIcon5.png'),
    require('../assets/Icons/eventIcon6.png'),
    require('../assets/Icons/eventIcon7.png'),
    require('../assets/Icons/eventIcon8.png'),
  ];

  return(
    <View style={styles.eventCardContainer}>
            <View style={styles.eventCard}>
              <View>
                <View style={styles.dDayContainer}>
                  <Text style={styles.dDayText}>D+ {getDateDifference(lastEvent[0].Date, currentDate)}</Text>
                </View>
              </View>
              <View style={styles.eventCardDescriptionContainer}>
                {/* <Image source={require(`../assets/Icons/eventIcon${random1}.png`)}/> */}
                <Image source={eventIcons[random1]}
                  style={styles.eventCardIconStyle}/>
                <Text style={styles.eventCardNameText}>{lastEvent[0].Name}</Text>
                <Text style={styles.eventCardLastText}>지난 일정</Text>
              </View>
            </View>
            <View style={styles.eventCard}>
              <View>
                <View style={styles.dDayContainer}>
                  <Text style={styles.dDayText}>D- {getDateDifference(currentDate, upcomingEvent[0].Date)+1}</Text>
                </View>
              </View>
              <View style={styles.eventCardDescriptionContainer}>
                {/* <Image source={require(`../assets/Icons/eventIcon${random1}.png`)}/> */}
                <Image source={eventIcons[random2]}
                  style={styles.eventCardIconStyle}/>
                <Text style={styles.eventCardNameText}>{upcomingEvent[0].Name}</Text>
                <Text style={styles.eventCardLastText}>다가오는 일정</Text>
              </View>
            </View> 
          </View>
  )
}

function EventCalendar({data}){
  //캘린더 로컬화
  LocaleConfig.locales['kr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
  };
  LocaleConfig.defaultLocale = 'kr';

  //const navigation = useNavigation();

  const [headerMonth, setHeaderMonth] = useState(moment().format('YYYY-MM'));

  //dummy event data
  // const eventDate={
  //   //객체의 키값은 yyyy-MM-dd 형태, marked true로 표시 
  //   '2024-05-25': { marked: true },
  //   '2024-05-30': { marked: true }
  // }

  const eventDate = data.reduce((acc, event) => {
    acc[event.Date] = { marked: true };
    return acc;
  }, {});

  const onMonthChange = (month) =>{
    setHeaderMonth(month.dateString);
  }

  //calendar custom
  const renderArrow = (direction) => {
    return (
      <Image source={direction==='left'?require('@assets/Icons/calendarArrow_Left.png')
          :require('@assets/Icons/calendarArrow_Right.png')}
        style={styles.calendarArrowStyle}/>
    );
  };

  const renderHeader = (date) => {
    // moment를 사용하여 날짜 객체를 포매팅
    const headerDate = moment(date).format('YYYY년 M월');
    return (
      <View style={styles.calendarHeaderContainer}>
        <Text style={styles.calendarHeaderText}>{headerDate}</Text>
      </View>
    );
  };

  return(
    <View style={styles.calendarContainer}>
      <Calendar 
        theme={{
          //calendar text style
          textDayFontFamily: "Pretendard-Bold",        // 일자용 폰트
          textDayHeaderFontFamily: "Pretendard-Medium",  // 일자 헤더 폰트
          textDayFontSize: theme.fontSizes.fontSizes13,              
          textDayHeaderFontSize: theme.fontSizes.fontSizes14,
          textMonthFontFamily: "Pretendard-Medium",  // 월 표시 폰트
          textMonthFontSize:  theme.fontSizes.fontSizes18,
          
          //일정 표시 style
          dotColor:theme.color.main,
          todayTextColor:theme.color.main
        }}

        //캘린더 헤더 커스텀
        current={headerMonth}
        onMonthChange={onMonthChange}
        renderArrow={renderArrow}
        renderHeader={()=>renderHeader(headerMonth)}

        //캘린더 일정 표시
        markedDates={eventDate}
        //onDayPress={(day)=>navigation.navigate('Store')} //이거 하려면 이동하려는 페이지가 navigate 연결 되어있어야함
        
        />
    </View>
  )
}

function EventList({thisMonthEvents, openModal}){
  function ParticipatedDone(){
    return(
      <View style={styles.participatedDoneBtn}>
        <Text style={styles.participationCompleteText}>참여종료</Text>
      </View>
    )
  }

  function ParticipationComplete(){
    return(
      <View style={styles.participationCompleteBtn}>
        <Text style={styles.participationCompleteText}>참여완료</Text>
      </View>
    )
  }

  function GoToParticipate({index}){
    return(
      <TouchableOpacity style={styles.goToParticipateBtn} 
        onPress={()=>openModal(index)}
        >
        <Text style={styles.goToParticipateText}>참여하기</Text>
      </TouchableOpacity>
    )
  }

  return(
    
    <View style={styles.eventListContainer}>
      <Text style={styles.eventListHeaderText}>이달의 일정</Text>
      {
        thisMonthEvents.length === 0 ? (
          <View>
            <Text>이번달은 일정이 텅~텅~</Text>
          </View>
        ):(
          thisMonthEvents.map((thisMonthEvent,index)=>
            <View key={index} style={styles.eventListItemContainer}>
              <View style={styles.eventListItemDetailContainer}>
                <View style={styles.eventListItemIcon}/>
                <View>
                  <Text style={styles.eventListItemName}>{thisMonthEvent.Name}</Text>
                  <Text style={styles.eventListItemDate}>{thisMonthEvent.Date}</Text>
                </View>
              </View>  
              {getDateDifference(currentDate, thisMonthEvent.Date)<0?(
                thisMonthEvent.isParticipated?(<ParticipationComplete/>):(<ParticipatedDone/>)
              ):(
                thisMonthEvent.isParticipated?(<ParticipationComplete/>):(<GoToParticipate index={index}/>)
              )}
            </View>
          )          
        )
      }
{/*       
      <View style={styles.eventListItemContainer}>
        <View style={styles.eventListItemDetailContainer}>
          <View style={styles.eventListItemIcon}/>
          <View>
            <Text style={styles.eventListItemName}>정기 모임</Text>
            <Text style={styles.eventListItemDate}>2024.05.30</Text>
          </View>
        </View>        
        <GoToParticipate/>
      </View> */}
    </View>
    
  )
}

function EventOverlay({overlayVisible, animatedHeight, closeModal, overlayData}){
  const [code,setCode]=useState("")

  return(
    <Modal
      transparent={true}
      visible={overlayVisible}
      animationType="None"
      onRequestClose={closeModal}
    >
      <TouchableOpacity onPress={closeModal} activeOpacity={1} style={styles.overlayBackground}>
          <Animated.View style={styles.overlayContainer}>
            <View style={styles.overlayHeaderContainer}>
              <View style={styles.overlayHeaderTextContainer}>
                <Text style={styles.overlayHeaderText}>{overlayData.Name}</Text>
              </View>
              
              <TouchableOpacity onPress={closeModal} >
                  <Image source={require("@assets/Icons/closeIcon.png")}
                    style={styles.overlayHeaderIcon}
                    />
              </TouchableOpacity>
            </View>

            <View style={styles.overlayInfoContainer}>
              <Image source={require("@assets/Icons/dateIcon.png")}
                style={styles.overlayInfoIcon}
              />
              <Text style={styles.overlayInfoText}>{overlayData.Date}</Text>
              <Text style={styles.overlayInfoTimeDetailText}>{overlayData.StartTime}~{overlayData.EndTime}</Text>
            </View>
            <View style={styles.overlayLine}/>
            <View style={styles.overlayInfoContainer}>
              <Image source={require("@assets/Icons/placeIcon.png")}
                style={styles.overlayInfoIcon}
              />
              <Text style={styles.overlayInfoText}>{overlayData.Place}</Text>
            </View >
            <View style={styles.overlayLine}/>
            <View style={styles.overlayInfoDetailContainer}>
              <Image source={require("@assets/Icons/pinIcon.png")}
                style={styles.overlayInfoIcon}
              />
              <View>
                <Text style={styles.overlayInfoText}>활동 내용</Text>
                <Text style={styles.overlayInfoDetailText}>{overlayData.Description}</Text>
              </View>
            </View>
            <View style={styles.overlayInputContainer}>
              <View style={styles.overlayInputCodeContainer}>
                <TextInput
                  returnKeyType='done'
                  keyboardType="numeric"
                  maxLength={6}
                  value={code}
                  onChangeText={setCode}
                  placeholder="참여 코드를 입력하세요"
                  style={styles.overlayInputCodeText}
                />
              </View>
              <TouchableOpacity style={styles.overlayInputBtn}>
                <Text style={styles.overlayInputBtnText}>입력</Text>
              </TouchableOpacity>

            </View>
            
            
          </Animated.View>
          {/* <View style={theme.overlayContainer}>             
            <View style={theme.overlayHeaderContainer}>
              <Text>정기 봉사</Text>
              <TouchableOpacity onPress={closeModal}>
                  <Image source={require("@assets/Icons/closeIcon.png")}
                    style={{height:24*theme.height, width:24*theme.width}}
                    />
              </TouchableOpacity>
            </View>
          </View> */}
        </TouchableOpacity>

    </Modal>
  )
}


export default function Event(){
  const [user,setUser]=useState("Name");
  const [datas,setDatas] = useState([]);
  const [thisMonthDatas, setThisMonthDatas]=useState([]);
  const [lastEvents, setLastEvents]=useState(lastEventData);
  const [upcomingEvents, setUpcomingEvents]=useState(upcomingEventData);

  const [overlayVisible, setOverlayVisible]=useState(false);
  const [overlayData, setOverlayData]=useState([])
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    setUser(userName);
    setDatas(eventDatas);
    setThisMonthDatas(thisMonthEventDatas);
    setLastEvents(lastEventData);
    setUpcomingEvents(upcomingEventData);
    //console.log(lastEvents);
  },[])

  const openModal = (index) => {
    setOverlayVisible(true);
    setOverlayData(thisMonthDatas[index]);
    Animated.timing(animatedHeight, {
      toValue: 300, // 모달의 높이
      duration: 0, // 애니메이션 지속 시간
      useNativeDriver: false
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 300,
      duration: 0,
      useNativeDriver: false
    }).start(() => setOverlayVisible(false));
  };



  return (
    <ScrollView contentContainerStyle={styles.background}>
      <Top user={user} thisMonthEvent={thisMonthDatas}/>
      <EventCard lastEvent={lastEvents} upcomingEvent={upcomingEvents}/>
      <EventCalendar data={datas}/>          
      <EventList thisMonthEvents={thisMonthDatas} openModal={openModal}/>
      <EventOverlay overlayVisible={overlayVisible} animatedHeight={animatedHeight} closeModal={closeModal} overlayData={overlayData}/>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
  background:{
    backgroundColor:theme.color.background,
    //backgroundColor:"red",
    paddingBottom:77*theme.height
  },
  topContainer:{    
    position:'relative',
    flexDirection:'row',
    height: 190*theme.height,
    alignItems: 'flex-end',
    //backgroundColor:"red"
  },
  topTextContainer:{
    //position:'absolute',
    marginLeft:20*theme.width,
    marginBottom:30*theme.height,
  },
  imageStyle:{
    height: 190*theme.height*theme.width,
    width:190*theme.width*theme.height,
    position:'absolute',
    left:screenWidth-190*theme.width*theme.height,
    //backgroundColor:"red"
  },
  topNameContainer:{
    flexDirection:"row",
    //marginBottom:5*theme.height,
  },
  nameText:{
    color:theme.color.main,
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes18,
    marginBottom:5*theme.height,
    marginRight:2*theme.width,
    lineHeight:18*theme.height,
  },
  topDescriptionText1:{
    color:theme.color.grey2,
    fontFamily:'Pretendard-Bold',
    fontSize:theme.fontSizes.fontSizes18,
    marginBottom:5*theme.height,
    lineHeight:18*theme.height,
  },
  topDescriptionText2:{
    color:theme.color.grey10,
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:12*theme.height,
  },
  eventCardContainer:{
    flexDirection:'row',
    marginTop:5*theme.height,
    marginHorizontal:16*theme.width,
    justifyContent:"space-between"
  },
  eventCard:{
    width:174*theme.width,
    height:134*theme.height,
    backgroundColor:theme.color.white,
    borderWidth:1,
    borderColor:theme.color.main,
    borderRadius:15
  },
  dDayContainer:{
    width:40*theme.width*theme.height,
    height:20*theme.height*theme.width,
    backgroundColor:theme.color.white,
    borderWidth:1,
    borderColor:theme.color.main,
    borderRadius:15,
    marginLeft:15*theme.width,
    marginTop:10*theme.height,
    alignItems:'center',
    justifyContent:'center'
  },
  dDayText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes10,
    color:theme.color.main
  },
  eventCardDescriptionContainer:{
    flexDirection:'column',
    alignItems:'center',
  },
  eventCardIconStyle:{
    width:25*theme.width*theme.height,
    height:25*theme.height*theme.width,
    marginTop:6*theme.height,
    marginBottom:8*theme.height
  },
  eventCardNameText:{
    color:theme.color.grey10,
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes14,
    lineHeight:22*theme.height,
  },
  eventCardLastText:{
    color:theme.color.grey2,
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes16,
    lineHeight:22*theme.height,
  },
  calendarContainer:{
    marginHorizontal:16*theme.width,
    marginTop:30*theme.height,
    marginBottom:30*theme.height,
    backgroundColor:theme.color.white,
    borderRadius:15,
    paddingTop:10*theme.height,
    paddingBottom:15*theme.height,
    paddingHorizontal:15*theme.width,    
    //backgroundColor:'red'
  },
  calendarStyle:{

  },
  calendarArrowStyle:{
    height: 20*theme.width*theme.height,
    width: 20*theme.width*theme.height,
    marginBottom:10*theme.height,
    //backgroundColor:'red'
  },
  calendarHeaderContainer:{
    alignItems:'center',
    marginBottom:10*theme.height,
    //backgroundColor:'red'
  },
  calendarHeaderText:{
    fontFamily:'Pretendard-SemiBold',
    fontSize:theme.fontSizes.fontSizes18,
    lineHeight:22*theme.height,
    color:theme.color.main,
  },
  participatedDoneBtn:{
    height:25*theme.height*theme.width,
    width:60*theme.width*theme.height,
    borderRadius:15,
    borderWidth:1,
    borderColor:theme.color.grey1,
    backgroundColor:theme.color.grey1,
    alignItems:'center',
    justifyContent:'center',
  },
  participationCompleteBtn:{
    height:25*theme.height*theme.width,
    width:60*theme.width*theme.height,
    borderRadius:15,
    borderWidth:1,
    borderColor:theme.color.main,
    backgroundColor:theme.color.main,
    alignItems:'center',
    justifyContent:'center',
  },
  participationCompleteText:{
    fontFamily:"Pretendard-Medium",
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:12*theme.height,
    color:theme.color.white,
  },
  goToParticipateBtn:{
    height:25*theme.height*theme.width,
    width:60*theme.width*theme.height,
    borderRadius:15,
    borderWidth:1,
    borderColor:theme.color.main,
    backgroundColor:theme.color.white,
    alignItems:'center',
    justifyContent:'center',
  },
  goToParticipateText:{
    fontFamily:"Pretendard-Medium",
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:12*theme.height,
    color:theme.color.main,
  },
  eventListContainer:{
    backgroundColor:theme.color.white,
    borderRadius:15,
    marginHorizontal:16*theme.width,
    marginBottom:30*theme.height,
    paddingVertical:20*theme.height,
    paddingHorizontal:16*theme.width,
  },
  eventListHeaderText:{
    fontFamily:"Pretendard-Bold",
    fontSize:theme.fontSizes.fontSizes18,
    lineHeight:22*theme.height,
    color:theme.color.main,
    marginBottom:20*theme.height
  },
  eventListItemContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    marginBottom:20*theme.height,
  },
  eventListItemDetailContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  eventListItemIcon:{
    height:40*theme.width*theme.height,
    width:40*theme.width*theme.height,
    backgroundColor:theme.color.white,
    marginRight:15*theme.width,
  },
  eventListItemName:{
    fontFamily:"Pretendard-SemiBold",
    fontSize:theme.fontSizes.fontSizes15,
    lineHeight:15*theme.height,
    color:theme.color.grey2,
    marginBottom:5*theme.height,
  },
  eventListItemDate:{
    fontFamily:"Pretendard-Regular",
    fontSize:theme.fontSizes.fontSizes12,
    lineHeight:12*theme.height,
    color:theme.color.grey10,
  },
  overlayBackground:{
    flex:1, 
    justifyContent: 'flex-end', // 하단 정렬
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  overlayContainer:{
    backgroundColor:theme.color.white,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingHorizontal:15*theme.width,
    paddingBottom:50*theme.height,
    //height:600*theme.height
  },
  overlayHeaderContainer:{
    flexDirection:'row',
    marginBottom:7*theme.height,
    height:68*theme.height,
    justifyContent:'space-between',
    //backgroundColor:'red'
  },
  overlayHeaderTextContainer:{
    flex:1,
    justifyContent:'center',
    marginLeft:24*theme.width,
    alignItems:'center',
    //backgroundColor:'blue'
  },
  overlayHeaderText:{
    //justifyContent:'center'
    fontSize:theme.fontSizes.fontSizes20,
    fontFamily:"Pretendard-SemiBold",
    color:theme.color.black,
  },
  overlayHeaderIcon:{
    height:24*theme.height*theme.width,
    width:24*theme.width*theme.height,
    marginTop:15*theme.height,
  },
  overlayInfoContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  overlayInfoDetailContainer:{
    flexDirection:'row',    
  },
  overlayInfoIcon:{
    height:22*theme.height*theme.width,
    width:22*theme.width*theme.height,
    marginRight:10*theme.width,
  },
  overlayLine:{
    backgroundColor:theme.color.grey6,
    height:1*theme.height,
    marginVertical:20*theme.height,
  },
  overlayInfoText:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes15,
    color:theme.color.grey2
  },
  overlayInfoDetailText:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes12,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
    marginRight:30*theme.width,
  },
  overlayInfoTimeDetailText:{
    fontFamily:'Pretendard-Regular',
    fontSize:theme.fontSizes.fontSizes13,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
    marginLeft:10*theme.width,
  },
  overlayInputContainer:{
    flexDirection:'row',    
    justifyContent:'space-between',
    marginTop:40*theme.height,
  },
  overlayInputCodeContainer:{
    flex:1,
    height:40*theme.height,
    borderWidth:1,
    borderColor:theme.color.grey6,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
    justifyContent:'center',
    //alignItems:'center',
    paddingLeft:18*theme.width,
  },
  overlayInputCodeText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.grey10,
    lineHeight:22*theme.height,
    alignContent:'center',
    justifyContent:'center',
  },
  overlayInputBtn:{
    height:40*theme.height,
    width:80*theme.height,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:theme.color.main,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },
  overlayInputBtnText:{
    fontFamily:'Pretendard-Medium',
    fontSize:theme.fontSizes.fontSizes14,
    color:theme.color.white,
  }

})