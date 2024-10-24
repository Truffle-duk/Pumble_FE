import React, {useEffect, useState, useRef} from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Animated,
    TextInput
} from 'react-native';
import {theme} from "@assets/Theme";

import {Calendar} from "react-native-calendars";
import moment, {max} from "moment";

import {Dimensions} from 'react-native';
import {ThemeProvider, useNavigation} from '@react-navigation/native';

//캘린더 로컬화
import {LocaleConfig} from 'react-native-calendars';
import Keychain from "react-native-keychain";
import {ethers} from "ethers";
import {call} from "@utils/ApiService";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


//dummy
const userAuth = "staff"

//날짜 세기
const getDateDifference = (date1, date2) => {
    const mDate1 = moment(date1);
    const mDate2 = moment(date2);
    return mDate2.diff(mDate1, 'days'); // 'days'를 'hours', 'minutes' 등으로 변경 가능
};

/*// 배포 서버 연결
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const privateKey = "0x06c533a9eec3b772fee66a58c8fd584426b8a097534d5a10d887e7e23b3f56e7"
const wallet = new ethers.Wallet(privateKey, provider)
const eventContractAddress = "0xFFdd28D4E521AED50f0ADF45C2D5C8b141aad2A7"
const eventContractABI = [
    "event EventTokenRecords(string indexed hGroupId, uint256 indexed hTimestamp, uint256 indexed hUserId, uint256 userId, uint256 timestamp, uint256 eventId, uint256 tokenNum)",
    "function createEvent(uint256 _eventId, uint256 _maxPpl, uint256 _reward)",
    "function distributeTokens(uint256 _eventId, uint256 _amount, string memory _groupId, uint256 _userId)",
    "function eventOver(uint256 _eventId) public returns (string memory)"
]
const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, wallet)

const attendEvent = async (eventId, amount, groupId, groupUserId) => {
    try {
        const balance = await provider.getBalance("0xA8433D7304AD461f7824d405241e467e8462282e");
        console.log(balance)
        console.log(eventId)
        console.log(amount)
        console.log(groupId)
        console.log(groupUserId)

        const amountInWei = ethers.parseEther(amount.toString())
        console.log(amountInWei.toString())
        const txResponse = await eventContract.distributeTokens(eventId, amountInWei, groupId.toString(), groupUserId)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}*/

function Top({user, thisMonthEvent}) {
    return (
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

function EventCard({lastEvent, upcomingEvent}) {
    //일단은 랜덤 픽
    const random1 = Math.floor(Math.random() / 8);
    const random2 = Math.floor(Math.random() / 8) + 1;

    const eventIcons = [
        require('@assets/Icons/eventIcon1.png'),
        require('@assets/Icons/eventIcon2.png'),
        require('@assets/Icons/eventIcon3.png'),
        require('@assets/Icons/eventIcon4.png'),
        require('@assets/Icons/eventIcon5.png'),
        require('@assets/Icons/eventIcon6.png'),
        require('@assets/Icons/eventIcon7.png'),
        require('@assets/Icons/eventIcon8.png'),
    ];

    return (
        <View style={styles.eventCardContainer}>
            <View style={styles.eventCard}>
                <View>
                    <View style={styles.dDayContainer}>
                        <Text style={styles.dDayText}>{lastEvent.DDay}</Text>
                    </View>
                </View>
                <View style={styles.eventCardDescriptionContainer}>
                    {/* <Image source={require(`../assets/Icons/eventIcon${random1}.png`)}/> */}
                    <Image source={eventIcons[random1]}
                           style={styles.eventCardIconStyle}/>
                    <Text style={styles.eventCardNameText}>{lastEvent.title}</Text>
                    <Text style={styles.eventCardLastText}>지난 일정</Text>
                </View>
            </View>
            <View style={styles.eventCard}>
                <View>
                    <View style={styles.dDayContainer}>
                        <Text style={styles.dDayText}>{upcomingEvent.DDay}</Text>
                    </View>
                </View>
                <View style={styles.eventCardDescriptionContainer}>
                    {/* <Image source={require(`../assets/Icons/eventIcon${random1}.png`)}/> */}
                    <Image source={eventIcons[random2]}
                           style={styles.eventCardIconStyle}/>
                    <Text style={styles.eventCardNameText}>{upcomingEvent.title}</Text>
                    <Text style={styles.eventCardLastText}>다가오는 일정</Text>
                </View>
            </View>
        </View>
    )
}

function EventCalendar({data}) {
    //캘린더 로컬화
    LocaleConfig.locales['kr'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘'
    };
    LocaleConfig.defaultLocale = 'kr';

    const [headerMonth, setHeaderMonth] = useState(moment().format('YYYY-MM'));

    const eventDate = data.reduce((acc, event) => {
        const dateAndTime = event.startDate.split('T')
        const date = dateAndTime[0]
        const time = dateAndTime[1].substring(0, 5)
        acc[date] = {marked: true};
        return acc;
    }, {});

    const onMonthChange = (month) => {
        setHeaderMonth(month.dateString);
    }

    //calendar custom
    const renderArrow = (direction) => {
        return (
            <Image source={direction === 'left' ? require('@assets/Icons/calendarArrow_Left.png')
                : require('@assets/Icons/calendarArrow_Right.png')}
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

    return (
        <View style={styles.calendarContainer}>
            <Calendar
                theme={{
                    //calendar text style
                    textDayFontFamily: "Pretendard-Bold",        // 일자용 폰트
                    textDayHeaderFontFamily: "Pretendard-Medium",  // 일자 헤더 폰트
                    textDayFontSize: theme.fontSizes.fontSizes13,
                    textDayHeaderFontSize: theme.fontSizes.fontSizes14,
                    textMonthFontFamily: "Pretendard-Medium",  // 월 표시 폰트
                    textMonthFontSize: theme.fontSizes.fontSizes18,

                    //일정 표시 style
                    dotColor: theme.color.main,
                    todayTextColor: theme.color.main
                }}

                //캘린더 헤더 커스텀
                current={headerMonth}
                onMonthChange={onMonthChange}
                renderArrow={renderArrow}
                renderHeader={() => renderHeader(headerMonth)}

                //캘린더 일정 표시
                markedDates={eventDate}
                //onDayPress={(day)=>navigation.navigate('Store')} //이거 하려면 이동하려는 페이지가 navigate 연결 되어있어야함

            />
        </View>
    )
}

function EventList({thisMonthEvents, openModal}) {
    function ParticipatedDone() {
        return (
            <View style={styles.participatedDoneBtn}>
                <Text style={styles.participationCompleteText}>참여종료</Text>
            </View>
        )
    }

    function ParticipationComplete() {
        return (
            <View style={styles.participationCompleteBtn}>
                <Text style={styles.participationCompleteText}>참여완료</Text>
            </View>
        )
    }

    function GoToParticipate({index}) {
        return (
            <TouchableOpacity style={styles.goToParticipateBtn}
                              onPress={() => openModal(index)}
            >
                <Text style={styles.goToParticipateText}>참여하기</Text>
            </TouchableOpacity>
        )
    }

    return (

        <View style={styles.eventListContainer}>
            <Text style={styles.eventListHeaderText}>이달의 일정</Text>
            {
                thisMonthEvents.length === 0 ? (
                    <View>
                        <Text>이번달은 일정이 텅~텅~</Text>
                    </View>
                ) : (
                    thisMonthEvents.map((thisMonthEvent, index) =>
                        <View key={index} style={styles.eventListItemContainer}>
                            <View style={styles.eventListItemDetailContainer}>
                                <View style={styles.eventListItemIcon}/>
                                <View>
                                    <Text style={styles.eventListItemName}>{thisMonthEvent.title}</Text>
                                    <Text
                                        style={styles.eventListItemDate}>{thisMonthEvent.startDate.split('T')[0]}</Text>
                                </View>
                            </View>
                            {thisMonthEvent.status === 'done' ? (
                                thisMonthEvent.isAttended ? (<ParticipationComplete/>) : (<ParticipatedDone/>)
                            ) : (
                                thisMonthEvent.isAttended ? (<ParticipationComplete/>) : (
                                    <GoToParticipate index={index}/>)
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

function EventOverlay({overlayVisible, animatedHeight, closeModal, overlayData, updateHandler}) {
    const [code, setCode] = useState("")
    //TODO: 여러 일에 걸친 일정 반영 필요
    const overlayDataDate = overlayData.startDate.split('T')[0];
    const overlayDataTime = parseInt(overlayData.startDate.split('T')[1].substring(0, 2));

    const getAccessToken = async () => {
        try {
            const credentials = await Keychain.getInternetCredentials("AccessToken");
            if (credentials) {
                //console.log("AccessToken:", credentials.password);
                return credentials.password; // AccessToken 반환
            } else {
                console.log('No access token found');
            }
        } catch (error) {
            console.error('Error retrieving access token:', error);
        }
    };

    const submitCode = async (id, submitCode, reward, groupId, groupUserId) => {
        await setCode("")
        const api = `/event/1/join/${id}`
        const request = {
            code: submitCode
        }
        await call(api, true, "POST", request)
            .then(data => {
                if (data.result.attendeeId) {
                    console.log("Successfully Joined.")
                }
            }).catch(err => console.log("Error at JoinEvent API, ", err))

        /*await attendEvent(id, reward, groupId, groupUserId)
            .then(_ => {
              alert(`${reward} PB를 받았어요!`)
              closeModal()
              updateHandler()
            })
            .catch(error => console.log("Error at JoinEvent Blockchain, ", error))*/
    }

    return (
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
                            <Text style={styles.overlayHeaderText}>{overlayData.title}</Text>
                        </View>

                        <TouchableOpacity onPress={closeModal}>
                            <Image source={require("@assets/Icons/closeIcon.png")}
                                   style={styles.overlayHeaderIcon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.overlayInfoContainer}>
                        <Image source={require("@assets/Icons/dateIcon.png")}
                               style={styles.overlayInfoIcon}
                        />
                        <Text style={styles.overlayInfoText}>{overlayDataDate}</Text>
                        <Text
                            style={styles.overlayInfoTimeDetailText}>{overlayDataTime < 10 ? `0${overlayDataTime}:00` : `${overlayDataTime}:00`}~{overlayDataTime < 8 ? `0${overlayDataTime + 2}:00` : `${overlayDataTime + 2}:00`}</Text>
                    </View>
                    <View style={styles.overlayLine}/>
                    <View style={styles.overlayInfoContainer}>
                        <Image source={require("@assets/Icons/placeIcon.png")}
                               style={styles.overlayInfoIcon}
                        />
                        <Text style={styles.overlayInfoText}>{overlayData.place}</Text>
                    </View>
                    <View style={styles.overlayLine}/>
                    <View style={styles.overlayInfoDetailContainer}>
                        <Image source={require("@assets/Icons/pinIcon.png")}
                               style={styles.overlayInfoIcon}
                        />
                        <View>
                            <Text style={styles.overlayInfoText}>활동 내용</Text>
                            <Text style={styles.overlayInfoDetailText}>{overlayData.description}</Text>
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
                        <TouchableOpacity style={styles.overlayInputBtn}
                                          onPress={() => submitCode(overlayData.eventId, code, overlayData.reward, 1, 1)}>
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


export default function Event({navigation}) {
    const [user, setUser] = useState("정귄귄");
    const [datas, setDatas] = useState([]);
    const [thisMonthDatas, setThisMonthDatas] = useState([]);
    const [lastEvents, setLastEvents] = useState({title: "", DDay: ""});
    const [upcomingEvents, setUpcomingEvents] = useState({title: "", DDay: ""});

    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayData, setOverlayData] = useState({
        "description": "",
        "endDate": "",
        "eventId": 0,
        "isAttended": 0,
        "place": "",
        "startDate": "T00",
        "status": ""
    })
    const animatedHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 모든 행사 불러오기
        const fetchAllEventApi = '/event/1/list/all'
        call(fetchAllEventApi, true, 'GET')
            .then(data => {
                setDatas(data.result.events)
            })
            .catch(err => {
                console.log("Error occurred at firstUseEffect1" + err)
            })

        fetchMonthlyEvent()
            .then(data => {
                setThisMonthDatas(data.events)
            })
            .catch(err => {
                console.log("Error occurred at firstUseEffect2" + err)
            })

        const fetchLastNextEventApi = '/event/1/lastAndNext'
        call(fetchLastNextEventApi, true, 'GET')
            .then(data => {
                setUpcomingEvents(data.result.events[0])
                setLastEvents(data.result.events[1])
            })
            .catch(err => {
                console.log("Error occurred at firstUseEffect3" + err)
            })
    }, []);

    const fetchMonthlyEvent = async () => {
        const api = '/event/1/list/month'
        return await call(api, true, 'GET')
            .then(data => {
                return data.result
            })
            .catch(err => {
                console.log("Error occurred at fetchMonthlyEvent" + err)
            })
    }

    const updateData = async () => {
        fetchMonthlyEvent()
            .then(data => {
                setThisMonthDatas(data.events)
            })
            .catch(err => {
                console.log("Error occurred at updateData" + err)
            })
    }

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
            <EventOverlay overlayVisible={overlayVisible} animatedHeight={animatedHeight} closeModal={closeModal}
                          overlayData={overlayData} updateHandler={updateData}/>
            {userAuth === "staff" &&
                <TouchableOpacity style={styles.writeBtn} onPress={() => navigation.navigate('AddEvent')}>
                    <Image source={require('@assets/Icons/writePen.png')} style={styles.writeIcon}/>
                </TouchableOpacity>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.color.background,
        //backgroundColor:"red",
        paddingBottom: 77 * theme.height
    },
    topContainer: {
        position: 'relative',
        flexDirection: 'row',
        height: 190 * theme.height,
        alignItems: 'flex-end',
        //backgroundColor:"red"
    },
    topTextContainer: {
        //position:'absolute',
        marginLeft: 20 * theme.width,
        marginBottom: 30 * theme.height,
    },
    imageStyle: {
        height: 190 * theme.height * theme.width,
        width: 190 * theme.width * theme.height,
        position: 'absolute',
        left: screenWidth - 190 * theme.width * theme.height,
        //backgroundColor:"red"
    },
    topNameContainer: {
        flexDirection: "row",
        //marginBottom:5*theme.height,
    },
    nameText: {
        color: theme.color.main,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes18,
        marginBottom: 5 * theme.height,
        marginRight: 2 * theme.width,
        lineHeight: 18 * theme.height,
    },
    topDescriptionText1: {
        color: theme.color.grey2,
        fontFamily: 'Pretendard-Bold',
        fontSize: theme.fontSizes.fontSizes18,
        marginBottom: 5 * theme.height,
        lineHeight: 18 * theme.height,
    },
    topDescriptionText2: {
        color: theme.color.grey10,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes12,
        lineHeight: 12 * theme.height,
    },
    eventCardContainer: {
        flexDirection: 'row',
        marginTop: 5 * theme.height,
        marginHorizontal: 16 * theme.width,
        justifyContent: "space-between"
    },
    eventCard: {
        width: 174 * theme.width,
        height: 134 * theme.height,
        backgroundColor: theme.color.white,
        borderWidth: 1,
        borderColor: theme.color.main,
        borderRadius: 15
    },
    dDayContainer: {
        width: 40 * theme.width * theme.height,
        height: 20 * theme.height * theme.width,
        backgroundColor: theme.color.white,
        borderWidth: 1,
        borderColor: theme.color.main,
        borderRadius: 15,
        marginLeft: 15 * theme.width,
        marginTop: 10 * theme.height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dDayText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes10,
        color: theme.color.main
    },
    eventCardDescriptionContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    eventCardIconStyle: {
        width: 25 * theme.width * theme.height,
        height: 25 * theme.height * theme.width,
        marginTop: 6 * theme.height,
        marginBottom: 8 * theme.height
    },
    eventCardNameText: {
        color: theme.color.grey10,
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        lineHeight: 22 * theme.height,
    },
    eventCardLastText: {
        color: theme.color.grey2,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes16,
        lineHeight: 22 * theme.height,
    },
    calendarContainer: {
        marginHorizontal: 16 * theme.width,
        marginTop: 30 * theme.height,
        marginBottom: 30 * theme.height,
        backgroundColor: theme.color.white,
        borderRadius: 15,
        paddingTop: 10 * theme.height,
        paddingBottom: 15 * theme.height,
        paddingHorizontal: 15 * theme.width,
        //backgroundColor:'red'
    },
    calendarStyle: {},
    calendarArrowStyle: {
        height: 20 * theme.width * theme.height,
        width: 20 * theme.width * theme.height,
        marginBottom: 10 * theme.height,
        //backgroundColor:'red'
    },
    calendarHeaderContainer: {
        alignItems: 'center',
        marginBottom: 10 * theme.height,
        //backgroundColor:'red'
    },
    calendarHeaderText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: theme.fontSizes.fontSizes18,
        lineHeight: 22 * theme.height,
        color: theme.color.main,
    },
    participatedDoneBtn: {
        height: 25 * theme.height * theme.width,
        width: 60 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.grey1,
        backgroundColor: theme.color.grey1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    participationCompleteBtn: {
        height: 25 * theme.height * theme.width,
        width: 60 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.main,
        backgroundColor: theme.color.main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    participationCompleteText: {
        fontFamily: "Pretendard-Medium",
        fontSize: theme.fontSizes.fontSizes12,
        lineHeight: 12 * theme.height,
        color: theme.color.white,
    },
    goToParticipateBtn: {
        height: 25 * theme.height * theme.width,
        width: 60 * theme.width * theme.height,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.color.main,
        backgroundColor: theme.color.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goToParticipateText: {
        fontFamily: "Pretendard-Medium",
        fontSize: theme.fontSizes.fontSizes12,
        lineHeight: 12 * theme.height,
        color: theme.color.main,
    },
    eventListContainer: {
        backgroundColor: theme.color.white,
        borderRadius: 15,
        marginHorizontal: 16 * theme.width,
        marginBottom: 30 * theme.height,
        paddingVertical: 20 * theme.height,
        paddingHorizontal: 16 * theme.width,
    },
    eventListHeaderText: {
        fontFamily: "Pretendard-Bold",
        fontSize: theme.fontSizes.fontSizes18,
        lineHeight: 22 * theme.height,
        color: theme.color.main,
        marginBottom: 20 * theme.height
    },
    eventListItemContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 20 * theme.height,
    },
    eventListItemDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventListItemIcon: {
        height: 40 * theme.width * theme.height,
        width: 40 * theme.width * theme.height,
        backgroundColor: theme.color.white,
        marginRight: 15 * theme.width,
    },
    eventListItemName: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: theme.fontSizes.fontSizes15,
        lineHeight: 15 * theme.height,
        color: theme.color.grey2,
        marginBottom: 5 * theme.height,
    },
    eventListItemDate: {
        fontFamily: "Pretendard-Regular",
        fontSize: theme.fontSizes.fontSizes12,
        lineHeight: 12 * theme.height,
        color: theme.color.grey10,
    },
    overlayBackground: {
        flex: 1,
        justifyContent: 'flex-end', // 하단 정렬
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    overlayContainer: {
        backgroundColor: theme.color.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15 * theme.width,
        paddingBottom: 50 * theme.height,
        //height:600*theme.height
    },
    overlayHeaderContainer: {
        flexDirection: 'row',
        marginBottom: 7 * theme.height,
        height: 68 * theme.height,
        justifyContent: 'space-between',
        //backgroundColor:'red'
    },
    overlayHeaderTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 24 * theme.width,
        alignItems: 'center',
        //backgroundColor:'blue'
    },
    overlayHeaderText: {
        //justifyContent:'center'
        fontSize: theme.fontSizes.fontSizes20,
        fontFamily: "Pretendard-SemiBold",
        color: theme.color.black,
    },
    overlayHeaderIcon: {
        height: 24 * theme.height * theme.width,
        width: 24 * theme.width * theme.height,
        marginTop: 15 * theme.height,
    },
    overlayInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overlayInfoDetailContainer: {
        flexDirection: 'row',
    },
    overlayInfoIcon: {
        height: 22 * theme.height * theme.width,
        width: 22 * theme.width * theme.height,
        marginRight: 10 * theme.width,
    },
    overlayLine: {
        backgroundColor: theme.color.grey6,
        height: 1 * theme.height,
        marginVertical: 20 * theme.height,
    },
    overlayInfoText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes15,
        color: theme.color.grey2
    },
    overlayInfoDetailText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes12,
        color: theme.color.grey10,
        lineHeight: 22 * theme.height,
        marginRight: 30 * theme.width,
    },
    overlayInfoTimeDetailText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: theme.fontSizes.fontSizes13,
        color: theme.color.grey10,
        lineHeight: 22 * theme.height,
        marginLeft: 10 * theme.width,
    },
    overlayInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40 * theme.height,
    },
    overlayInputCodeContainer: {
        flex: 1,
        height: 40 * theme.height,
        borderWidth: 1,
        borderColor: theme.color.grey6,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        //alignItems:'center',
        paddingLeft: 18 * theme.width,
    },
    overlayInputCodeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.grey10,
        lineHeight: 22 * theme.height,
        alignContent: 'center',
        justifyContent: 'center',
    },
    overlayInputBtn: {
        height: 40 * theme.height,
        width: 80 * theme.height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.color.main,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    overlayInputBtnText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: theme.fontSizes.fontSizes14,
        color: theme.color.white,
    },
    writeBtn: {
        position: 'absolute',
        bottom: 92,
        right: 25,
        //left:'50%',
        //transform: [{ translateX: -110*theme.width/2 }],
        alignItems: 'center',
        justifyContent: 'center',
        height: 60 * theme.width * theme.height,
        width: 60 * theme.width * theme.height,
        borderRadius: 15,
        backgroundColor: theme.color.main,
    },
    writeIcon: {
        width: 35 * theme.width * theme.height,
        height: 35 * theme.width * theme.height,
    }

})