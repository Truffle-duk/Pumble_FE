import React, { useEffect, useState } from "react";
import { theme } from "@assets/Theme";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

// const Posts=[
//     {
//       "ID":"1",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"2",
//       "Title":"하 힘들다...",
//       "Content":"고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~",
//       "Like":3,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"3",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"4",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"5",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"6",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"7",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"8",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"9",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//     {
//       "ID":"10",
//       "Title":"하 힘들다...",
//       "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//       "Like":0,
//       "Reply":1,
//       "Date":"2024.07.06"
//     },
//   ]

const posta=[
    {
        "id":123,
        "title": "title",
        "content": "contents",
        //"date": "2024-08-06T16:00",
        "created_at": "2024-08-06T16:00",
        "isWriter": true,
        "Reply":2,
    }
]

const replies=[
    {
        "id":1,
        "content":"contents",
        "created_at": "2024-08-07T16:00",
        "isWriter": true,
    },
    {
        "id":2,
        "content":"contents22",
        "created_at": "2024-08-07T16:00",
        "isWriter": false,
    }
]
  

function PostingView({post}){
    const [postId, setPostId]=useState("");

    return(
        <View style={styles.postContainer}>
            <View style={styles.postHeaderContainer}>
                <View style={styles.postImageContainer}>
                    <Image source={require('@assets/Images/Guinguin_Face.png')}
                    style={styles.postProfileImage}/>
                </View>
                <View>
                    <Text style={styles.postProfileText}>익명</Text>
                    {/* <Text style={styles.postDate}>{post.created_at.split('T')[0].replace(/-/g, '.')}</Text> */}
                    <Text style={styles.postDate}>{post.created_at}</Text>
                </View>
            </View>
            <Text style={styles.postTitleText}>{post.title}</Text>
            <Text style={styles.postContentText}>{post.content}</Text>
            <View style={styles.postDetailContainer}>
                <View style={styles.postIconContainer}>
                    <Image source={require('@assets/Icons/replyIcon.png')}
                    style={styles.postIcon}/>
                    <Text style={styles.postReplyText}>{post.Reply}</Text>
                </View>
                {post.isWriter?(
                    <TouchableOpacity
                    onPress={()=>setPostId(post.id)}
                    >
                        <Image source={require('@assets/Icons/deleteIcon.png')} style={styles.postIcon}/>
                    </TouchableOpacity>):(<View/>)}
            </View>
            
        </View>
    );
}

function Reply({replyList}){
    const [replyId, setReplyId]=useState("");
    return(
        <View>
            {
                replyList.length===0?(
                    <View/>
                ):(
                    replyList.map((reply,index)=>
                        <View style={styles.replyContainer}>
                            <View style={styles.replyHeadContainer}>
                                <View style={styles.replyProfileContainer}>
                                    <View style={styles.replyProfileImageContainer}>
                                        <Image style={styles.replyProfileImage}
                                        source={require('@assets/Images/Guinguin_Face.png')}/>
                                    </View>
                                    <Text style={styles.replyProfileName}>익명{reply.id}</Text>
                                </View>
                                {/* writable 체크해서 삭제 아이콘 삽입 */}
                                {/* <TouchableOpacity>
                                    <Image/>
                                </TouchableOpacity> */}
                                {reply.isWriter?(
                                    <TouchableOpacity
                                    onPress={()=>setReplyId(reply.id)}>
                                        <Image source={require('@assets/Icons/deleteIcon.png')} style={styles.postIcon}/>
                                    </TouchableOpacity>):(<View/>)}
                            </View>
                            <Text style={styles.replyContentText}>{reply.content}</Text>
                            <Text style={styles.replyDate}>{reply.created_at.split('T')[0].replace(/-/g,'.')}</Text>
                        </View>
                    )                   
                )
            }
            

        </View>
    );
}

function WriteReply(){
    const [InputReply, setInputReply]=useState("");

    return(
        <View style={styles.replyInputContainer}>
            <TextInput
            returnKeyType='done'
            maxLength={300}
            onChangeText={setInputReply}
            placeholder="댓글을 입력하세요."
            placeholderTextColor={theme.color.grey1}
            style={styles.replyText}
            scrollEnabled={true}
            multiline={true} // 여러 줄 입력을 허용하려면 true로 설정
            textAlignVertical="center"
            textAlign="left"
            lineHeight={22} // 줄 간격을 설정
            //height={42*theme.height}
            flex={1}
            //margin={0}
            />
            <View style={styles.doneBtnContainer}>
            <TouchableOpacity style={styles.doneBtn}>
                <Text style={styles.doneBtnText}>완료</Text>
            </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.doneBtn}>
                <Text style={styles.doneBtnText}>완료</Text>
            </TouchableOpacity> */}
        </View>
        
    )
}

export default function Post({}){
    const [mainPost,setMainPost]=useState({});
    const [replyList,setReplyList]=useState([]);

    useEffect(()=>{
        setReplyList(replies);
        setMainPost(posta[0]);
    },[]);

    return(
        <View style={styles.background}>
            <ScrollView style={{flex:1}}>
                <PostingView post={mainPost}/>
                <View style={styles.line}/>
                <Reply replyList={replyList}/>
            </ScrollView>
            <View style={styles.line}/>
            <WriteReply/>
        </View>
    )
}

const styles=StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.color.white,
        paddingBottom:77*theme.height,
        paddingTop:15*theme.height,
    },
    postContainer:{
        marginTop:5*theme.height,
        marginBottom:15*theme.height,
        marginHorizontal:16*theme.width,
    },
    postHeaderContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    postImageContainer:{
        height:45*theme.height*theme.width,
        width:45*theme.height*theme.width,
        borderRadius:100,
        //flex:1, 
        backgroundColor:theme.color.mainOpacity10,
        overflow:'hidden',
        marginRight:10*theme.width,
    },
    postProfileImage:{
        height:'100%',
        width:'100%',
    },
    postProfileText:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes16,
        fontFamily:'Pretendard-SemiBold',
        lineHeight:16,
        marginBottom:5*theme.height,
    },
    postDate:{
        color:theme.color.grey1,
        fontSize:theme.fontSizes.fontSizes12,
        fontFamily:'Pretendard-Medium',
        lineHeight:15,
    },
    postTitleText:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes18,
        fontFamily:'Pretendard-SemiBold',
        lineHeight:20,
        marginVertical:10*theme.height,
    },
    postContentText:{
        color:theme.color.grey10,
        fontSize:theme.fontSizes.fontSizes14,
        fontFamily:'Pretendard-Medium',
        lineHeight:15,   
        marginBottom:20*theme.height,
    },
    postDetailContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    postIconContainer:{
        //marginRight:20*theme.width,
        flexDirection:'row',
        alignItems:'center',
    },
    postIcon:{
    width:15,
    height:15,
    //marginRight:5*theme.width,
    },
    postReplyText:{
    color:theme.color.grey10,
    fontSize:theme.fontSizes.fontSizes12,
    fontFamily:'Pretendard-Medium',
    lineHeight:15,
    marginLeft:5*theme.width,
    },
    postDate:{
    color:theme.color.grey1,
    fontSize:theme.fontSizes.fontSizes12,
    fontFamily:'Pretendard-Medium',
    lineHeight:15,
    },
    line:{
    height:1,
    backgroundColor:theme.color.grey6,
    },
    replyInputContainer:{
        flexDirection:'row',
        paddingHorizontal:16*theme.width,
        justifyContent:'space-between',
        alignContent:'baseline',
        //height:42*theme.height
    },
    replyText:{
        fontFamily:'Pretendard-Medium',
        fontSize:theme.fontSizes.fontSizes16,
        color:theme.color.grey2,
        lineHeight:22*theme.height,
        //alignContent:'center',
        justifyContent:'center',
        paddingVertical:10,
        margin:0,
        //marginTop:5*theme.height,
        //marginBottom:5*theme.height,
        //backgroundColor:'red'
    },
    doneBtnContainer:{
        paddingLeft:15*theme.width,
        paddingVertical:10*theme.height,
        alignItems:'baseline',
        justifyContent:'flex-end'
    },
    doneBtn:{
        height:30*theme.height,
        width:60*theme.width,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:theme.color.main,
        //marginVertical:10*theme.height,
        //marginLeft:15*theme.width,
    },
    doneBtnText:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:theme.fontSizes.fontSizes13,
        color:theme.color.white,
        lineHeight:14*theme.height,
    },
    replyContainer:{
        paddingHorizontal:16*theme.width,
        paddingVertical:10*theme.height,
    },
    replyHeadContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    replyProfileContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    replyProfileImageContainer:{
        height:35*theme.height*theme.width,
        width:35*theme.height*theme.width,
        borderRadius:100,
        //flex:1, 
        backgroundColor:theme.color.mainOpacity10,
        overflow:'hidden',
        marginRight:10*theme.width,
    },
    replyProfileImage:{
        height:'100%',
        width:'100%',
    },
    replyProfileName:{
        color:theme.color.grey2,
        fontSize:theme.fontSizes.fontSizes16,
        fontFamily:'Pretendard-SemiBold',
        lineHeight:16,
    },
    replyDate:{
        color:theme.color.grey1,
        fontSize:theme.fontSizes.fontSizes12,
        fontFamily:'Pretendard-Medium',
        lineHeight:15,
    },
    replyContentText:{
        color:theme.color.grey10,
        fontSize:theme.fontSizes.fontSizes14,
        fontFamily:'Pretendard-Medium',
        lineHeight:15,   
        marginVertical:10*theme.height,
    },
    

})