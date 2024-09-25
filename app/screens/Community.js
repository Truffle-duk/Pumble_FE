import React, { useEffect, useState } from "react";
import { theme } from "@assets/Theme";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Keychain from 'react-native-keychain';

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

const getRefreshToken = async () => {
  try {
      const credentials = await Keychain.getInternetCredentials("RefreshToken");
      if (credentials) {
          //console.log("RefreshToken:", credentials.password);
          return credentials.password; // RefreshToken 반환
      } else {
          console.log('No refresh token found');
      }
  } catch (error) {
      console.error('Error retrieving refresh token:', error);
  }
};

const fetchData = async ({no}) => {
  const URL=`https://www.pumble.site/api/community/1/post/list?page=${no}`
  const token= await getAccessToken();
  try {
      const response = await fetch(URL, {
          method: 'GET', // 생략 가능
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // 필요하다면 토큰 추가
          }
      });

      if (!response.ok) {
          console.log(no)
          console.log('Response Data:', response);
          throw new Error('Network response was not ok');
      }

      const data = await response.json(); // 응답을 JSON으로 변환
      console.log('Response Data:', data);
      return(data);

  } catch (error) {
      console.error('Fetch Error:', error);
  }
};


// const Posts=[
//   {
//     "ID":"1",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"2",
//     "Title":"하 힘들다...",
//     "Content":"고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~고양이 야옹~",
//     "Like":3,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"3",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"4",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"5",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"6",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"7",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"8",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"9",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
//   {
//     "ID":"10",
//     "Title":"하 힘들다...",
//     "Content":"맞냐? 자괴감만 든다....ㄹㅇ......에바지예",
//     "Like":0,
//     "Reply":1,
//     "Date":"2024.07.06"
//   },
// ]

const Posts=[
  {
      "articles": [
          {
              "id": 1,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 2,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 3,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 4,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 5,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 6,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 7,
              "title": "title",
              "content": "contents",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 0,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 8,
              "title": "title2",
              "content": "contents2",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 1,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 9,
              "title": "title2",
              "content": "contents2",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 1,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 10,
              "title": "title3",
              "content": "contents3",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 2,
      "isLast": false
  },
  {
      "articles": [
          {
              "id": 11,
              "title": "title3",
              "content": "contents3",
              "Reply":1,
              "Date":"2024.07.06"
          }
      ],
      "currentPage": 2,
      "isLast": true
  },

]

function PostingList({posts, navigation}){
  return(
    <View>
      {
        posts.length===0?(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text>소통을 시작해볼까요?!</Text>
          </View>
        ):(
          posts.map((post, index)=>
            <TouchableOpacity onPress={()=>navigation.navigate('Post')}>
              <View style={styles.postContentContainer}>
                <Text style={styles.postTitleText}>{post.title}</Text>
                <Text style={styles.postDetailText}>{post.content}</Text>
                <View style={styles.postDetailContainer}>
                  <View style={styles.postIconContainer}>
                    <Image source={require('@assets/Icons/replyIcon.png')}
                    style={styles.postIcon}/>
                    <Text style={styles.postReplyText}>{post.commentCount}</Text>
                  </View>
                  <Text style={styles.postDate}>{post.createdAt.split('T')[0]}</Text>
                </View>  
              </View>                  
              <View style={styles.line}/>
            </TouchableOpacity>
        )
        )
      }
    </View>
    
    
  );
}

function WritingBtn({navigation}){
  return(
    <TouchableOpacity style={styles.writeBtnContainer}
    onPress={()=>navigation.navigate('Writepost')}>
      <View style={styles.writeBtnTextContainer}>
        <Image source={require('@assets/Icons/writePen.png')}
        style={styles.writeBtnIcon}/>
        <Text style={styles.writeBtnText}>글 쓰기</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Community({navigation}){
  const [PostLists, setPostLists] = useState([]);
  const [page, setPage] = useState(1);  //페이지 번호
  const [loading, setLoading] = useState(false);  //
  const [hasMore, setHasMore] = useState(false);   //isLast항목 참고

  // useEffect(()=>{
  //   fetchData
  // },[])

  useEffect(()=>{
    //setPostLists(Posts);
    fetchPostList(page);
  },[page])

  const fetchPostList = (page) => {
    if (loading) return;
    
    setLoading(true);
    
    setTimeout(async () => {
      //const newData = Posts.filter(post => post.currentPage === page);
      
      if(!hasMore){
        const data= await fetchData({no:page});
        console.log("data",data);
        const newData=data.result.postList
        setPostLists(prevData => [...prevData, ...newData]);
        setHasMore(data.result.isLast);
      }
      // }else{

      // }
      // const newData=fetchData({no:page});

      // setPostLists(prevData => [...prevData, ...newData]);
      // setHasMore(newData.result.isLast);
      setLoading(false);
    }, 500); // 1초 지연시간을 주어 로딩 효과를 나타냄
  };

  const handleScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && !hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.background}
      onScroll={handleScroll}
      //scrollEventThrottle={400}
      >
        <PostingList posts={PostLists} navigation={navigation}/>          
      </ScrollView>
      <WritingBtn navigation={navigation}/>
    </View>
      
  );

}

const styles = StyleSheet.create({
  background:{
    backgroundColor:theme.color.white,
    paddingBottom:107*theme.height,
    paddingTop:15*theme.height,
  },
  postContainer:{
    height:116,
  },
  postContentContainer:{
    paddingVertical:15,
    paddingHorizontal:16*theme.width,
  },
  postTitleText:{
    color:theme.color.grey2,
    fontSize:theme.fontSizes.fontSizes18,
    fontFamily:'Pretendard-SemiBold',
    lineHeight:20,
    marginBottom:10,
  },
  postDetailText:{
    color:theme.color.grey10,
    fontSize:theme.fontSizes.fontSizes14,
    fontFamily:'Pretendard-Medium',
    lineHeight:15,
    marginBottom:10,
  },
  postDetailContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  postIconContainer:{
    marginRight:20*theme.width,
    flexDirection:'row',
    alignItems:'center',
  },
  postIcon:{
    width:15,
    height:15,
    marginRight:5*theme.width,
  },
  postReplyText:{
    color:theme.color.grey10,
    fontSize:theme.fontSizes.fontSizes12,
    fontFamily:'Pretendard-Medium',
    lineHeight:15,
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
  writeBtnContainer:{
    position:'absolute',
    bottom:92,
    left:'50%',
    transform: [{ translateX: -110*theme.width/2 }],
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:110*theme.width,
    borderRadius:100,
    backgroundColor:theme.color.main,
  },
  writeBtnTextContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  writeBtnIcon:{
    height:20,
    width:20,
    marginRight:10*theme.width
  },
  writeBtnText:{
    color:theme.color.white,
    fontSize:theme.fontSizes.fontSizes15,
    fontFamily:'Pretendard-SemiBold',
    lineHeight:15,
  },

})