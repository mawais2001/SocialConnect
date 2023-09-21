import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';

function Search(props) {
  const [postList, setPostList] = useState([]);
  const userData = auth().currentUser;
  const getAllPosts = () => {
    // console.log("i am getAllPost function");
    // const postsRef = firestore().collection('posts').orderBy('time', 'desc');
    // postsRef.onSnapshot((snap) => {
    //     console.log(snap.docs);
    //     const temarray = [];
    //     snap.forEach(element => {
    //         console.log('====================================');
    //         console.log(element);
    //         console.log('====================================');
    //         temarray.push({ ...element.data() })
    //     })
    //     setPostList(temarray);
    // })
    // const postsRef = firestore().collection('posts');
    // const query = postsRef.orderBy('time', 'desc');
    // query.onSnapshot((snapshot) => {
    //     const tempArray = [];
    //     snapshot.forEach((userDoc) => {
    //         userDoc.ref.collection('allposts').get().then((allPostsSnapshot) => {
    //             allPostsSnapshot.forEach((postDoc) => {
    //                 // Get the data for each post
    //                 const postData = postDoc.data();
    //                 tempArray.push({ ...postData });
    //             });
    //             setPostList(tempArray);
    //             console.log('===============postList START=====================');
    //             console.log(postList);
    //             console.log('================postList END====================');
    //         });
    //     });
    // });
  };

  const getMyPostsData = async () => {
    console.log('i am function');
    const allPostsArray = [];
    const postdata = firestore().collection('posts');
    const alldocs = await postdata.get();
    // console.log('==============alldocs======================');
    // console.log(alldocs.size);
    // console.log('==============alldocs======================');
    // if (alldocs.size === 1) {
    //   console.log('only one document');
    // }
    alldocs.forEach(async userDoc => {
      const userId = userDoc.id;
      // console.log("user id is: ", userId);
      const allposts = await firestore()
        .collection('posts')
        .doc(userId)
        .collection('allposts')
        .get();
      // console.log('==============allposts======================');
      // console.log(allposts);
      // console.log('==============allposts======================');
      allposts.forEach(postDoc => {
        const postDataInside = postDoc.data();
        // console.log('============POST TITLE START========================');
        if (postDataInside) {
          allPostsArray.push(postDataInside);
          // setPostList(allPostsArray)
        }

        setPostList(allPostsArray);

        // console.log('==============POST TITLE END======================');
        // console.log(allPostsArray);
      });
    });

    // console.log('=============allPostsArray=======================');
    // console.log(allPostsArray);
    // console.log('==============allPostsArray======================');
  };

  const renderItem = item => {
    // console.log('???????????????', item);
    const timestamp = item.item.time.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const formattedTime = timestamp.toDateString(); // Format the Date as a string
    return (
      <View>
        <Text> {item.item.title} </Text>
        <Text> {formattedTime} </Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: item.item.imageUrl}}
        />
      </View>
    );
  };

  useEffect(() => {
    getMyPostsData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Search Post is here</Text>
      {/* <ButtonCompo title='Get Post' onPress={getMyPostsData} /> */}
      {/* {
                postList.length > 0 ? (
                //     postList.map((item) => {
                //         console.log('Rendering item:', item);
                //         return <Text key={item.id}> {item.title} </Text>;
                //     })
                // ) : <Text>Nothing</Text>
            } */}

      <FlatList data={postList} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
});

export default Search;
