import React, {useEffect, useState} from "react";
import {theme} from "@assets/Theme";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {call} from "@utils/ApiService";
import {useFocusEffect} from "@react-navigation/native";

const fetchData = async ({no}) => {
    const api = `/community/1/post/list?page=${no}`
    return await call(api, true, 'GET')
        .then(response => {
            return response
        })
};


function PostingList({posts, navigation}) {
    return (
        <View>
            {
                posts.length === 0 ? (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text>소통을 시작해볼까요?!</Text>
                    </View>
                ) : (
                    posts.map((post, index) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Post', {id: post.postId})} key={index}>
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

function WritingBtn({navigation, postListUpdateHandler}) {
    return (
        <TouchableOpacity style={styles.writeBtnContainer}
                          onPress={() => navigation.navigate('WritePost', {updateHandler: postListUpdateHandler})}>
            <View style={styles.writeBtnTextContainer}>
                <Image source={require('@assets/Icons/writePen.png')}
                       style={styles.writeBtnIcon}/>
                <Text style={styles.writeBtnText}>글 쓰기</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function Community({navigation}) {
    const [PostLists, setPostLists] = useState([]);
    const [page, setPage] = useState(1);  //페이지 번호
    const [loading, setLoading] = useState(false);  //
    const [hasMore, setHasMore] = useState(false);   //isLast항목 참고

    useFocusEffect(
        React.useCallback(() => {
            postListUpdateHandler()
                .then(_ => {
                    console.log("Update Post List")
                });
        }, [])
    );

    const postListUpdateHandler = async () => {
        setPage(1); // 페이지를 1로 리셋
        setPostLists([]); // 기존 게시물 목록을 초기화
        const data = await fetchData({no: 1}); // 페이지 1의 데이터를 다시 불러오기
        setPostLists(data.result.postList); // 게시물 목록 업데이트
        setHasMore(data.result.isLast); // 더 불러올 항목이 있는지 설정
    };

    useEffect(() => {
        fetchPostList(page);
    }, [page])

    const fetchPostList = (page) => {
        if (loading) return;

        setLoading(true);

        setTimeout(async () => {
            if (!hasMore) {
                const response = await fetchData({no: page});
                //console.log("Response from fetchPostList:", response);

                if (response.code === 200) {
                    const newData = response.result.postList;
                    setPostLists(prevData => [...prevData, ...newData]);
                    setHasMore(response.result.isLast);
                }
            }

            setLoading(false);
        },  10); // 1초 지연시간을 주어 로딩 효과를 나타냄
    };

    const handleScroll = ({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent) && !hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
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
    background: {
        backgroundColor: theme.color.white,
        paddingBottom: 107 * theme.height,
        paddingTop: 15 * theme.height,
    },
    postContainer: {
        height: 116,
    },
    postContentContainer: {
        paddingVertical: 15,
        paddingHorizontal: 16 * theme.width,
    },
    postTitleText: {
        color: theme.color.grey2,
        fontSize: theme.fontSizes.fontSizes18,
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 20,
        marginBottom: 10,
    },
    postDetailText: {
        color: theme.color.grey10,
        fontSize: theme.fontSizes.fontSizes14,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 15,
        marginBottom: 10,
    },
    postDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postIconContainer: {
        marginRight: 20 * theme.width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postIcon: {
        width: 15,
        height: 15,
        marginRight: 5 * theme.width,
    },
    postReplyText: {
        color: theme.color.grey10,
        fontSize: theme.fontSizes.fontSizes12,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 15,
    },
    postDate: {
        color: theme.color.grey1,
        fontSize: theme.fontSizes.fontSizes12,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 15,
    },
    line: {
        height: 1,
        backgroundColor: theme.color.grey6,
    },
    writeBtnContainer: {
        position: 'absolute',
        bottom: 92,
        left: '50%',
        transform: [{translateX: -110 * theme.width / 2}],
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 110 * theme.width,
        borderRadius: 100,
        backgroundColor: theme.color.main,
    },
    writeBtnTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    writeBtnIcon: {
        height: 20,
        width: 20,
        marginRight: 10 * theme.width
    },
    writeBtnText: {
        color: theme.color.white,
        fontSize: theme.fontSizes.fontSizes15,
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 15,
    },

})