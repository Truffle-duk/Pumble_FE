import React, { useEffect, useState } from "react";
import { theme } from "@assets/Theme";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import Keychain from "react-native-keychain";
import {call} from "@utils/ApiService";
import { GroupCall } from "@utils/GroupService";


const posta=[
    {
        "id":123,
        "title": "title",
        "content": "contents",
        "createdAt": "2024-08-06",
        "isWriter": true,
        "Reply":2,
    }
]
  

function PostingView({post, replyCount, fetchDeletePost}){
    const [postId, setPostId]=useState(post.id);

    return(
        <View style={styles.postContainer}>
            <View style={styles.postHeaderContainer}>
                <View style={styles.postImageContainer}>
                    <Image source={require('@assets/Images/Guinguin_Face.png')}
                    style={styles.postProfileImage}/>
                </View>
                <View>
                    <Text style={styles.postProfileText}>익명</Text>
                    <Text style={styles.postDate}>{post.createdAt}</Text>
                </View>
            </View>
            <Text style={styles.postTitleText}>{post.title}</Text>
            <Text style={styles.postContentText}>{post.content}</Text>
            <View style={styles.postDetailContainer}>
                <View style={styles.postIconContainer}>
                    <Image source={require('@assets/Icons/replyIcon.png')}
                    style={styles.postIcon}/>
                    <Text style={styles.postReplyText}>{replyCount}</Text>
                </View>
                {post.isWriter ? (
                    <TouchableOpacity onPress={fetchDeletePost}>
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
                        <View style={styles.replyContainer} key={index}>
                            <View style={styles.replyHeadContainer}>
                                <View style={styles.replyProfileContainer}>
                                    <View style={styles.replyProfileImageContainer}>
                                        <Image style={styles.replyProfileImage}
                                        source={require('@assets/Images/Guinguin_Face.png')}/>
                                    </View>
                                    <Text style={styles.replyProfileName}>익명{reply.comment.commentId}</Text>
                                </View>
                                {reply.writer.isWriter?(
                                    <TouchableOpacity
                                    onPress={()=>setReplyId(reply.comment.commentId)}>
                                        <Image source={require('@assets/Icons/deleteIcon.png')} style={styles.postIcon}/>
                                    </TouchableOpacity>):(<View/>)}
                            </View>
                            <Text style={styles.replyContentText}>{reply.comment.content}</Text>
                            <Text style={styles.replyDate}>{reply.comment.createdAt.split('T')[0].replaceAll('-','.')}</Text>
                        </View>
                    )                   
                )
            }
            

        </View>
    );
}

function WriteReply({postId, updateHandler}){
    const [InputReply, setInputReply]=useState("");

    const submitComment = async () => {
        const api = `/community/1/comment/${postId}`
        const request = {
            content: InputReply
        }

        await call(api, true, 'POST', request)
            .then(data => {
                console.log(data)
                if(data.code !== 200) {
                    console.log('Response Data:', data);
                    new Error('Network response was not ok at fetchAllData');
                } else {
                    setInputReply("")
                    updateHandler()
                }
            })
            .catch(err => {
                console.error('Fetch Error:', err);
            })
    }

    return(
        <View style={styles.replyInputContainer}>
            <TextInput
            returnKeyType='done'
            maxLength={300}
            value={InputReply}
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
            <TouchableOpacity style={styles.doneBtn} onPress={submitComment}>
                <Text style={styles.doneBtnText}>완료</Text>
            </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.doneBtn}>
                <Text style={styles.doneBtnText}>완료</Text>
            </TouchableOpacity> */}
        </View>
        
    )
}

export default function Post({route, navigation}){
    const [mainPost,setMainPost]=useState({});
    const [replyList,setReplyList]=useState([{
        comment: {
            commentId: 0,
            content: "",
            createdAt: ""
        },
        writer: {
            isWriter: false
        }
    }]);
    const {id} = route.params
    const [replyCount, setReplyCount] = useState(0)
    const [gid, setGid]= useState(1)
    
    useEffect(()=>{
        setGid(GroupCall("GID"))
        //밑에 그룹 id 다 적용시켜^^
    },[])

    const fetchPost = async () => {
        const api = `/community/1/post/${id}`
        return await call(api, true, 'GET')
            .then(data => {
                return data.result
            })
            .catch(err => {
                console.log("Error occurred at fetchPost: " + err)
            })
    }

    const fetchComments = async () => {
        const api = `/community/1/comment/${id}`
        await call(api, true, 'GET')
            .then(data => {
                setReplyList(data.result.commentList)
                setReplyCount(data.result.commentListSize)
            })
            .catch(err => {
                console.log("Error occurred at fetchComments: " + err)
            })
    }
    const fetchDeletePost = async () => {
        const api = `/community/1/post/${id}`
        return await call(api, true, 'DELETE')
            .then(data => {
                alert('글이 삭제됐습니다.')
                navigation.navigate('Community')
                return data.result                
            })
            .catch(err => {
                console.log("Error occurred at fetchDeletePost: " + err)
            })
    }

    useEffect(()=>{
        fetchPost()
            .then(data => {
                const reqData = {
                    id: data.post.postId,
                    title: data.post.title,
                    content: data.post.content,
                    isWriter: data.writer.isWriter,
                    createdAt: data.post.createdAt.split('T')[0],
                    reply: 0
                }
                setMainPost(reqData)
            })

        fetchComments()
            .then(_ => {
                console.log("fetchComments for Post")
            })
        setMainPost(posta[0]);
    },[]);

    return(
        <View style={styles.background}>
            <ScrollView style={{flex:1}}>
                <PostingView post={mainPost} replyCount={replyCount} fetchDeletePost={fetchDeletePost}/>
                <View style={styles.line}/>
                <Reply replyList={replyList}/>
            </ScrollView>
            <View style={styles.line}/>
            <WriteReply postId={id} updateHandler={fetchComments}/>
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