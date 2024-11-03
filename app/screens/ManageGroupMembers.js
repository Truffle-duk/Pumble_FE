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
    TextInput,
    Alert
} from 'react-native';
import {theme} from "@assets/Theme";
import {call} from "@utils/ApiService";

function ManagementTeamView({staffs, upgradeStaffHandler, downgradeStaffHandler, banUserHandler}){
    return(
        <View>
            <Text style={styles.titleLable}>운영진</Text>
            {staffs.length===0?(
                <View>
                    <Text>운영진이 없어요!</Text>
                </View>
            ):(
                staffs.map((staff, index)=>
                    <View style={styles.memberContainer}>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={styles.profileImageContainer}>
                                {staff.profileImg?<Image 
                                    //source={require('@assets/Images/Guinguin_Face.png')}
                                    source={{uri: staff.profileImg}}
                                    style={styles.profileImage}/>
                                    : <Image 
                                    source={require('@assets/Images/Guinguin_Face.png')}
                                    //source={{uri: profile.profileImage}}
                                    style={styles.profileImage}/>}
                            </View>
                            <View>
                                <Text style={styles.nameLable}>{staff.nickname}</Text>
                                <Text style={styles.authLable}>운영진</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity style={{marginLeft:15*theme.width}}
                            onPress={()=>upgradeStaffHandler(staff.groupUserId)}>
                                <Image source={require("@assets/Icons/upgradeUserIcon.png")}
                                style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:15*theme.width}}
                            onPress={()=>downgradeStaffHandler(staff.groupUserId)}>
                                <Image source={require("@assets/Icons/downgradeUserIcon.png")}
                                style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:15*theme.width}}
                            onPress={()=>banUserHandler(staff.groupUserId)}>
                                <Image source={require("@assets/Icons/banIcon.png")}
                                style={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            )}
        </View>
    )
}


function MemberView({members, upgradeUserHandler, banUserHandler}){
    return(
        <View>
            <Text style={styles.titleLable}>구성원</Text>
            {members.length===0?(
                <View>
                    <Text>구성원이 없어요!</Text>
                </View>
            ):(
                members.map((member, index)=>
                    <View style={styles.memberContainer}>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={styles.profileImageContainer}>
                                {member.profileImg?<Image 
                                    //source={require('@assets/Images/Guinguin_Face.png')}
                                    source={{uri: member.profileImg}}
                                    style={styles.profileImage}/>
                                    : <Image 
                                    source={require('@assets/Images/Guinguin_Face.png')}
                                    //source={{uri: profile.profileImage}}
                                    style={styles.profileImage}/>}
                            </View>
                            <View>
                                <Text style={styles.nameLable}>{member.nickname}</Text>
                                <Text style={styles.authLable}>회원</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity style={{marginLeft:15*theme.width}}
                            onPress={()=>upgradeUserHandler(member.groupUserId)}>
                                <Image source={require("@assets/Icons/upgradeUserIcon.png")}
                                style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:15*theme.width}}
                            onPress={()=>banUserHandler(member.groupUserId)}>
                                <Image source={require("@assets/Icons/banIcon.png")}
                                style={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            )}
        </View>
    )
}


export default function ManageGroupMembers({route, navigation}){
    const [memberList, setMemberList]=useState([]);
    const [staffList, setStaffList]=useState([]);

    const {gid} = route.params

    const fetchMember=()=>{
        const api=`/group/${gid}/members`
        call(api, true, 'GET')
            .then(async data => {
                if(data.code ===200){
                    setMemberList(data.result.generalUser);
                    setStaffList(data.result.staff);
                }
            
        }).catch((err) => {
            console.log("some err on manage group members", err)
        });
    }

    const upgradeUserHandler = (userId) =>{
        const api=`/group/${gid}/members/appoint`
        const request={
            groupUserId:userId
        }
        call(api, true, 'PATCH', request)
            .then(async data =>{
                if(data.code === 200){
                    alert('운영진 권한이 부여되었습니다!')
                }
            }).catch((err) => {
                console.log("error on handle upgrade users", err)
            })

    }

    const upgradeStaffHandler = (userId) =>{
        const api=`/group/${gid}/members/entrust`
        const request={
            groupUserId:userId
        }
        call(api, true, 'PATCH', request)
            .then(async data =>{
                if(data.code === 200){
                    alert('모임장 권한이 부여되었습니다!')
                }
            }).catch((err) => {
                console.log("error on handle upgrade staff", err)
            })

    }

    const banUserHandler = (userId) =>{
        const api=`/group/${gid}/members/driveOut`
        const request={
            groupUserId:userId
        }
        call(api, true, 'PATCH', request)
            .then(async data =>{
                if(data.code === 200){
                    alert('구성원을 내보냈습니다!')
                }
            }).catch((err) => {
                console.log("error on handle ban User", err)
            })

    }

    const downgradeStaffHandler = (userId) =>{
        const api=`/group/${gid}/members/demotion`
        const request={
            groupUserId:userId
        }
        call(api, true, 'PATCH', request)
            .then(async data =>{
                if(data.code === 200){
                    alert('권한이 강등되었습니다!')
                }
            }).catch((err) => {
                console.log("error on handle downgrad staff", err)
            })

    }

    useEffect(()=>{
        fetchMember();
    },[])

    return(
        <View style={styles.background}>
            <ScrollView>
                <ManagementTeamView staffs={staffList} upgradeStaffHandler={upgradeStaffHandler} downgradeStaffHandler={downgradeStaffHandler} banUserHandler={banUserHandler}/>
                <View style={styles.lineHorizontal}/>
                <MemberView members={memberList} upgradeUserHandler={upgradeUserHandler} banUserHandler={banUserHandler}/>
            </ScrollView>
        </View>
    )

}

const styles=StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:77*theme.height,
        paddingHorizontal:16*theme.width,
        paddingTop:20*theme.height,
    },
    scrollViewContainer:{

    },
    titleLable:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes18,
        fontFamily:'Pretendard-Medium',
        lineHeight:22,
        marginVertical:10*theme.height,
    },
    lineHorizontal:{
        height:1,
        backgroundColor:theme.color.background,
        marginVertical:15*theme.height,
    },
    icon:{
        height:24*theme.height*theme.width,
        width:24*theme.height*theme.width,
    },
    memberContainer:{
        marginVertical:10*theme.height,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    profileImageContainer:{
        borderRadius:100,
        backgroundColor:theme.color.mainOpacity10,
        height:50*theme.height*theme.width,
        width:50*theme.width*theme.height,
        marginRight:15*theme.width,
        overflow:'hidden'
    },
    profileImage:{
        height:'100%',
        width:'100%',
    },
    nameLable:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes15,
        fontFamily:'Pretendard-SemiBold',
        marginBottom:10*theme.height,
        //lineHeight:22,
    },
    authLable:{
        color:theme.color.grey10,
        fontSize:theme.fontSizes.fontSizes12,
        fontFamily:'Pretendard-Regular',
        //lineHeight:22,
    },
})