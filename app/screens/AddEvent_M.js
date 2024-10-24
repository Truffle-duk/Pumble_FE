import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import { theme } from "@assets/Theme";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { call } from "@utils/ApiService";
import {ethers} from "ethers";

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

const createEventBlock = async (eventId, maxPeople, reward) => {
    try {
        console.log(eventId)
        console.log(maxPeople)
        console.log(reward)

        const txResponse = await eventContract.createEvent(eventId, maxPeople, reward)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)

        return "Success!"
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}*/

function EventNameInput({setTitle}){
    const [eventName, setEventName]=useState("")
    
    return(
        <View style={{marginBottom:25*theme.height}}>
            <Text style={styles.inputTitle}>일정 이름</Text>
            <View style={styles.inputBox}>
                <TextInput
                        returnKeyType='done'
                        maxLength={30}
                        onChangeText={setTitle}
                        placeholder="일정의 이름을 입력해주세요"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText}
                        scrollEnabled={true}
                        multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                        //textAlignVertical="top"
                        textAlign="left"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        />
            </View>
            {/* <TextInput
                        returnKeyType='done'
                        maxLength={30}
                        onChangeText={setTitle}
                        placeholder="일정의 이름을 입력해주세요"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText}
                        scrollEnabled={true}
                        multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                        //textAlignVertical="top"
                        textAlign="left"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        /> */}
        </View>
    )
}

function EventPlaceInput({setPlace}){
    const [eventPlace, setEventPlace]=useState("")
    
    return(
        <View style={{marginBottom:25*theme.height}}>
            <Text style={styles.inputTitle}>일정 장소</Text>
            <View style={styles.inputBox}>
                <TextInput
                        returnKeyType='done'
                        maxLength={30}
                        onChangeText={setPlace}
                        placeholder="일정의 장소를 입력해주세요"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText}
                        scrollEnabled={true}
                        multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                        //textAlignVertical="top"
                        textAlign="left"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        />
            </View>
        </View>
    )
}

function EventDateInput({startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime}){
    const now = new Date();

    const dateString = now.toLocaleDateString('ko-KR', {
        year: 'numeric',  // 연도는 숫자로 표시
        month: '2-digit', // 월은 두 자리 숫자로 표시 (01, 02, ..., 12)
        day: '2-digit'    // 일은 두 자리 숫자로 표시 (01, 02, ..., 31)
    });

    const timeString = now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined, // 초를 제외
    hour12: false,     // 24시간제를 사용하려면 true 대신 false
    });
    
    const [mode, setMode] = useState('startDate'); // 모달 유형
    const [visible, setVisible] = useState(false); // 모달 노출 여부

    const onPressStartDate = () => { // 날짜 클릭 시
        setMode('startDate'); // 모달 유형을 date로 변경
        setVisible(true); // 모달 open
    };

    const onPressStartTime = () => { // 시간 클릭 시
        setMode('startTime'); // 모달 유형을 time으로 변경
        setVisible(true); // 모달 open
    };

    const onPressEndDate = () => { // 날짜 클릭 시
        setMode('endDate'); // 모달 유형을 date로 변경
        setVisible(true); // 모달 open
    };

    const onPressEndTime = () => { // 시간 클릭 시
        setMode('endTime'); // 모달 유형을 time으로 변경
        setVisible(true); // 모달 open
    };

    const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
        setVisible(false); // 모달 close
        if(mode === 'startDate'){
            const dateStr= selectedDate.toLocaleDateString('ko-KR', {
                  year: 'numeric', 
                  month: '2-digit',
                  day: '2-digit'
            });
            setStartDate(dateStr);    
        }else if(mode === 'startTime'){
            const timeStr= selectedDate.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: undefined, // 초를 제외
                  hour12: false,     // 24시간제를 사용하려면 true 대신 false
                });
            setStartTime(timeStr); 
        }else if(mode === 'endDate'){
            const dateStr= selectedDate.toLocaleDateString('ko-KR', {
                      year: 'numeric', 
                      month: '2-digit',
                      day: '2-digit'
                });
            setEndDate(dateStr); 
        }else{
            const timeStr= selectedDate.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: undefined, // 초를 제외
                      hour12: false,     // 24시간제를 사용하려면 true 대신 false
                    });
            setEndTime(timeStr); 
        }
        
        //onChangeDate(selectedDate); // 선택한 날짜 변경
    };
    
    const onCancel = () => { // 취소 시
    setVisible(false); // 모달 close
    };

    return(
        <View style={{marginBottom:20*theme.height}}>
            <Text style={styles.inputTitle}>일정 기간</Text>
            <View style={styles.inputBox3}>
                <View style={{flexDirection:'row', alignContent:'center'}}>
                    <TouchableOpacity onPress={onPressStartDate}>
                        <Text>{ startDate==="" ? dateString : startDate }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressStartTime}>
                        <Text>{ startTime===""? timeString : startTime }</Text>
                    </TouchableOpacity>
                </View>
                <View/>
                <View style={{flexDirection:'row', alignContent:'center'}}>
                    <TouchableOpacity onPress={onPressEndDate}>
                        <Text>{ startDate===""? dateString: endDate }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressEndTime}>
                        <Text>{ startTime==="" ? timeString : endTime }</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <DateTimePickerModal 
                isVisible={visible}
                mode={mode}
                onConfirm={onConfirm}
                onCancel={onCancel}
                //date={date} 
            />
        </View>
    )
}

function EventContentInput({setDescription}){
    const [eventContent, setEventContent]=useState("")    
    
    return(
        <View style={{marginBottom:25*theme.height}}>
            <Text style={styles.inputTitle}>활동 내용</Text>
            <View style={styles.inputBox2}>
                <TextInput
                        returnKeyType='done'
                        maxLength={30}
                        onChangeText={setDescription}
                        placeholder="활동에 대한 내용을 입력해주세요"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText}
                        scrollEnabled={true}
                        multiline={true} // 여러 줄 입력을 허용하려면 true로 설정
                        //textAlignVertical="top"
                        textAlign="left"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        />
            </View>
        </View>
    )
}

function EventToken({setReward}){
    const [eventToken, setEventToken]=useState(0)

    return(
        <View style={styles.tokenView}>
            <Text style={styles.inputTitle2}>지급할 토큰:</Text>
            <View style={{alignItems:'flex-end'}}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:5*theme.width}}>
                    <TextInput
                        returnKeyType='done'
                        keyboardType="numeric"
                        maxLength={4}
                        onChangeText={setReward}
                        placeholder="0"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText2}
                        scrollEnabled={true}
                        multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                        textAlignVertical="auto"
                        textAlign="Right"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        />
                    <Text style={styles.tokenText}>PB</Text>
                </View>
                <View style={styles.line}/>

            </View>
        </View>
    )
}

function EventMaxPeople({setMaxPeople}){
    return(
        <View style={styles.tokenView}>
            <Text style={styles.inputTitle2}>최대 인원수:</Text>
            <View style={{alignItems:'flex-end'}}>
                <View style={{flexDirection:'row', alignItems:'center', marginRight:5*theme.width}}>
                    <TextInput
                        returnKeyType='done'
                        keyboardType="numeric"
                        maxLength={4}
                        onChangeText={setMaxPeople}
                        placeholder="0"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText2}
                        scrollEnabled={true}
                        multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                        textAlignVertical="auto"
                        textAlign="Right"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        />
                    <Text style={styles.tokenText}>명</Text>
                </View>
                <View style={styles.line}/>

            </View>
        </View>
    )
}

function EventCodeInput({setECode}){
    const [eventCode, setEventCode]=useState("")
    
    return(
        <ScrollView contentContainerStyle={{marginBottom:25*theme.height}}>
            <Text style={styles.inputTitle}>인증코드</Text>
            <View style={styles.inputBox}>
                <TextInput
                        returnKeyType='done'
                        maxLength={6}
                        keyboardType="numeric"
                        onChangeText={setECode}
                        placeholder="인증코드를 입력해주세요"
                        placeholderTextColor={theme.color.grey1}
                        style={styles.inputText}
                        scrollEnabled={false}
                        multiline={false} // 여러 줄 입력을 허용하려면 true로 설정
                        //textAlignVertical="top"
                        textAlign="left"
                        lineHeight={22} // 줄 간격을 설정
                        //height={42*theme.height}
                        />
            </View>
        </ScrollView>
    )
}


function AddEvent_M({navigation}){
    //data
    const [title, setTitle]=useState("");
    const [place, setPlace]=useState("");
    const [description, setDescription]=useState("");
    const [ecode, setECode]=useState("");
    const [reward, setReward]=useState(0);
    const [groupId, setGroupId]=useState(1);
    const [maxPeople, setMaxPeople]=useState(0);


    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");

    const isFormComplete= title !=="" && place !== "" && description!=="" && ecode !== "" && reward !== 0 && maxPeople !== 0;

    const handleCompletePress = async () => {
        const startDateSplit=startDate.replaceAll(" ", "").split(".")
        const fStartDate=`${startDateSplit[0]}-${startDateSplit[1]}-${startDateSplit[2]}T${startTime}`;
        const endDateSplit=endDate.replaceAll(" ", "").split(".")
        const fEndDate=`${endDateSplit[0]}-${endDateSplit[1]}-${endDateSplit[2]}T${endTime}`;
        
        if (isFormComplete) {
            const api = '/event/1'
            const request = {
                title: title,
                startDate: new Date(fStartDate),
                endDate: new Date(fEndDate),
                place: place,
                description: description,
                code: ecode,
                maxPeople: maxPeople,
                reward:reward,
            }

            const eventId = await call(api, true, 'POST', request)
                            .then(data => {
                                if (data.code === 200) {
                                    return data.result.eventId
                                }else{
                                    console.log(data.code)
                                }
                            })

            /*await createEventBlock(eventId, maxPeople, reward)
                .then(log => {
                    if (log === "Success!") {
                        alert("일정 생성 완료!")
                    } else {
                        alert("블록체인 기록 과정에서 문제가 발생했습니다.")
                    }
                })*/

        } else {
            alert('폼을 다시 확인해주세요!');
        }
        
    };


    const now = new Date();

    const dateString = now.toLocaleDateString('ko-KR', {
        year: 'numeric',  // 연도는 숫자로 표시
        month: '2-digit', // 월은 두 자리 숫자로 표시 (01, 02, ..., 12)
        day: '2-digit'    // 일은 두 자리 숫자로 표시 (01, 02, ..., 31)
    });

    const timeString = now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined, // 초를 제외
    hour12: false,     // 24시간제를 사용하려면 true 대신 false
    });
    
    const [mode, setMode] = useState('startDate'); // 모달 유형
    const [visible, setVisible] = useState(false); // 모달 노출 여부

    const onPressStartDate = () => { // 날짜 클릭 시
        setMode('startDate'); // 모달 유형을 date로 변경
        setVisible(true); // 모달 open
    };

    const onPressStartTime = () => { // 시간 클릭 시
        setMode('startTime'); // 모달 유형을 time으로 변경
        setVisible(true); // 모달 open
    };

    const onPressEndDate = () => { // 날짜 클릭 시
        setMode('endDate'); // 모달 유형을 date로 변경
        setVisible(true); // 모달 open
    };

    const onPressEndTime = () => { // 시간 클릭 시
        setMode('endTime'); // 모달 유형을 time으로 변경
        setVisible(true); // 모달 open
    };

    const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
        setVisible(false); // 모달 close
        if(mode === 'startDate'){
            const dateStr=selectedDate.toLocaleDateString('ko-KR', {
                  year: 'numeric', 
                  month: '2-digit',
                  day: '2-digit'
            });
            setStartDate(dateStr);    
        }else if(mode === 'startTime'){
            const timeStr=selectedDate.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: undefined, // 초를 제외
                  hour12: false,     // 24시간제를 사용하려면 true 대신 false
                });
            setStartTime(timeStr); 
        }else if(mode === 'endDate'){
            const dateStr=selectedDate.toLocaleDateString('ko-KR', {
                      year: 'numeric', 
                      month: '2-digit',
                      day: '2-digit'
                });
            setEndDate(dateStr); 
        }else{
            const timeStr=selectedDate.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: undefined, // 초를 제외
                      hour12: false,     // 24시간제를 사용하려면 true 대신 false
                    });
            setEndTime(timeStr); 
        }
        
        //onChangeDate(selectedDate); // 선택한 날짜 변경
    };
    
    const onCancel = () => { // 취소 시
    setVisible(false); // 모달 close
    };


    return(
        <ScrollView contentContainerStyle={styles.background}>
            <EventNameInput setTitle={setTitle}/>
            <EventPlaceInput setPlace={setPlace}/>
            {/* <EventDateInput startDate={startDate} setStartDate={setStartDate} startTime={startTime} setStartTime={setStartTime} endDate={endDate} setEndDate={setEndDate} endTime={endTime} setEndTime={setEndTime}/>  */}
            <View style={{marginBottom:25*theme.height}}>
                <Text style={styles.inputTitle}>일정 기간</Text>
                <View style={styles.inputBox3}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={onPressStartDate} style={{marginRight:5*theme.width}}>
                            <Text style={styles.dateText}>{startDate===""?dateString:startDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressStartTime}>                            
                            <Text style={styles.timeText}>{startTime===""?timeString:startTime}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.dateText}>-</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={onPressEndDate} style={{marginRight:5*theme.width}}>                            
                            <Text style={styles.dateText}>{endDate===""?dateString:endDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressEndTime} >                            
                            <Text style={styles.timeText}>{endTime===""?timeString:endTime}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </View>
            <EventContentInput setDescription={setDescription}/>
            <EventToken setReward={setReward}/>
            <EventMaxPeople setMaxPeople={setMaxPeople}/>
            <EventCodeInput setECode={setECode}/>

            <TouchableOpacity style={styles.doneBtn}
                onPress={handleCompletePress}>
                    <Text style={styles.doneBtnText}>완료</Text>
            </TouchableOpacity>

            <DateTimePickerModal 
                isVisible={visible}
                //mode={mode}
                mode={mode === 'startTime' || mode === 'endTime' ? 'time' : 'date'}
                onConfirm={onConfirm}
                onCancel={onCancel}
                //date={date} 
            />

        </ScrollView>
    )
}

const styles=StyleSheet.create({
    background:{
        //flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:150*theme.height,
        paddingTop:20*theme.height,
        paddingHorizontal:16*theme.width,
    },
    input: {
        //width: 358 * theme.width,
        height: 52 * theme.height,
        //marginTop: 30*theme.height,
        borderColor: theme.color.grey6,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal:15*theme.width,
        backgroundColor: theme.color.white,
        //color: theme.color.grey10,
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey2,
        lineHeight:16*theme.height,
    },
    inputText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey2,
        lineHeight:16*theme.height,
        //alignItems:'baseline',
        //justifyContent:'center',
        paddingVertical:0,
        //marginVertical:3,
        //marginHorizontal:20*theme.width,
        //marginTop:5*theme.height,
        //marginBottom:5*theme.height,
        //backgroundColor:'red'
    },
    inputText2:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey2,
        lineHeight:22*theme.height,
        alignItems:'center',
        //justifyContent:'center',
        paddingVertical:0,
        margin:0,
        //marginHorizontal:20*theme.width,
        //marginTop:5*theme.height,
        //marginBottom:5*theme.height,
        //backgroundColor:'red'
    },
    inputTitle:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey10,
        lineHeight:16*theme.height,
        marginLeft:4*theme.width,
        marginBottom:10*theme.height,
    },
    inputTitle2:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey10,
        lineHeight:16*theme.height,
        marginLeft:4*theme.width,
        //marginBottom:10*theme.height,
    },
    inputBox:{
        height:40*theme.height,
        fontSize: theme.fontSizes.fontSizes9,
        paddingHorizontal:15*theme.width,
        justifyContent:'center',
        borderColor:theme.color.grey1,
        borderWidth:1,
        borderRadius:15
    },
    inputBox2:{
        height:108*theme.height,
        paddingHorizontal:15*theme.width,
        //alignItems:'center',
        alignContent:'center',
        borderColor:theme.color.grey1,
        borderWidth:1,
        borderRadius:15
    },
    inputBox3:{
        flexDirection:'row',
        height:40*theme.height,
        paddingHorizontal:20*theme.width,
        alignItems:'center',
        justifyContent:'space-between',
        //alignContent:'center',
        borderColor:theme.color.grey1,
        borderWidth:1,
        borderRadius:15
    },
    tokenView:{
        marginBottom:25*theme.height,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    line:{
        width:68*theme.width,
        height:1,
        backgroundColor:theme.color.grey1,
    },
    tokenText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey1,
        lineHeight:16*theme.height,
        marginLeft:2*theme.width,
    },
    doneBtn:{
        position:'absolute',
        height:50*theme.height,
        width:358*theme.width,
        backgroundColor:theme.color.main,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',   
        bottom:97*theme.height,     
        left:16*theme.width,
    },
    doneBtnText:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:theme.fontSizes.fontSizes18,
        color: theme.color.white,
    },
    dateText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey1,
    },
    timeText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes14,
        color:theme.color.grey1,
    }

})
export default AddEvent_M;