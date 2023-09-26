import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import colors from '../../styles/colors';
import TextInputCompo from '../../Components/TextInputCompo';
import fontFamily from '../../styles/fontFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

function Search(props) {
  const [postList, setPostList] = useState([]);
  const userData = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredPostList, setFilteredPostList] = useState([]);
  const [postLength, setPostLength] = useState(0);
  const MemoizedFlatList = React.memo(FlatList);

  const navigation = useNavigation();

  const getMyPostsData = async () => {
    console.log('i am function');
    const allPostsArray = [];
    const postdata = firestore().collection('posts');
    const alldocs = await postdata.get();
    alldocs.forEach(async userDoc => {
      const userId = userDoc.id;
      // console.log("user id is: ", userId);
      const allposts = await firestore()
        .collection('posts')
        .doc(userId)
        .collection('allposts')
        .get();
      allposts.forEach(postDoc => {
        const postDataInside = postDoc.data();

        if (postDataInside) {
          allPostsArray.push(postDataInside);
        }

        setPostList(allPostsArray);
      });
    });
  };

  const renderItem = (item, index) => {
    // Check if it's an even or odd index to decide the layout
    const isEvenIndex = index % 2 === 0;
    const timestamp = item.time.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const formattedTime = timestamp.toDateString(); // Format the Date as a string

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.postContainer}
        onPress={() => navigation.navigate('DetailPost', {postData: item})}>
        <Image style={styles.image} source={{uri: item.imageUrl}} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        {isEmpty ? (
          <Text
            style={{
              fontSize: scale(18),
              textAlign: 'center',
              marginTop: moderateVerticalScale(10),
              color: colors.redColor,
            }}>
            No any Post is found on your Search!
          </Text>
        ) : (
          <ActivityIndicator size={'large'} color={colors.socialpink} />
        )}
      </View>
    );
  };

  const handleSearch = () => {
    const filtered = postList.filter(post => {
      return post.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredPostList(filtered);
    if (filtered.length === 0) {
      console.log('no search query matching');
      setPostLength(0);
      setIsEmpty(true); // No matching posts found
    } else {
      console.log('================Search is matching====================');
      setPostLength(filtered.length);
      console.log('filtered.length: ', filtered.length);
      setIsEmpty(false); // Matching posts found
    }
  };

  useEffect(() => {
    getMyPostsData();
  }, []);
  useEffect(() => {
    // Set the filtered list initially to the entire postList
    setFilteredPostList(postList);
  }, [postList]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.text}>Search</Text>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearch();
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (searchText.length > 0) {
                setSearchText('');
                setFilteredPostList(postList);
                setPostLength(0);
                setIsEmpty(false);
              } else {
                handleSearch();
              }
            }}>
            <Icon
              name={searchText.length > 0 ? 'clear' : 'done'}
              size={20}
              color={colors.whiteColor}
            />
          </TouchableOpacity>
        </View>
        {postLength > 0 ? (
          <Text style={styles.resultText}> {postLength} Result </Text>
        ) : null}
      </View>
      <View style={styles.resultContainer}>
        <MemoizedFlatList
          data={filteredPostList}
          // renderItem={renderItem}
          renderItem={({item, index}) => renderItem(item, index)}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  searchContainer: {
    backgroundColor: colors.socialpinklight,
    paddingBottom: moderateVerticalScale(30),
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    justifyContent: 'flex-end',
    paddingTop: moderateVerticalScale(14),
  },
  text: {
    fontSize: scale(18),
    color: colors.socialpink,
    fontFamily: fontFamily.semiBold,
    textAlign: 'center',
    marginBottom: moderateVerticalScale(8),
    // marginLeft: moderateScale(20),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  searchBar: {
    flex: 1,
    height: moderateVerticalScale(38),
    backgroundColor: colors.whiteColor,
    borderRadius: moderateScale(19),
    paddingLeft: moderateScale(10),
  },
  searchButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    backgroundColor: colors.socialpink,
    borderRadius: moderateScale(19),
    marginLeft: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: scale(14),
    textAlign: 'center',
    color: colors.socialpink,
    fontFamily: fontFamily.regular,
    marginTop: moderateVerticalScale(8),
    // marginLeft: moderateScale(20),
  },
  resultContainer: {
    flex: 4,
  },

  postContainer: {
    marginTop: moderateVerticalScale(30),
    backgroundColor: colors.whiteColor,
    borderRadius: moderateScale(10),
    marginBottom: moderateVerticalScale(20),
    elevation: 5, // Add elevation for a shadow effect
    overflow: 'hidden', // Ensure the image stays within the container
    paddingHorizontal: moderateScale(10),
  },
  image: {
    width: '100%',
    height: moderateVerticalScale(120),
    borderRadius: moderateScale(6),
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: moderateScale(10),
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: colors.whiteColor,
    marginBottom: moderateVerticalScale(8),
  },
  time: {
    fontSize: scale(12),
    color: colors.whiteColor,
  },
});

export default Search;

// import React, {useState, useEffect} from 'react';
// import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {
//   scale,
//   moderateScale,
//   moderateVerticalScale,
// } from 'react-native-size-matters';
// import ButtonCompo from '../../Components/ButtonCompo';
// import auth from '@react-native-firebase/auth';

// function Search(props) {
//   const [postList, setPostList] = useState([]);
//   const userData = auth().currentUser;

//   const getMyPostsData = async () => {
//     console.log('i am function');
//     const allPostsArray = [];
//     const postdata = firestore().collection('posts');
//     const alldocs = await postdata.get();
//     alldocs.forEach(async userDoc => {
//       const userId = userDoc.id;
//       const allposts = await firestore()
//         .collection('posts')
//         .doc(userId)
//         .collection('allposts')
//         .get();
//       allposts.forEach(postDoc => {
//         const postDataInside = postDoc.data();
//         if (postDataInside) {
//           allPostsArray.push(postDataInside);
//         }

//         setPostList(allPostsArray);
//       });
//     });

//   };

//   const renderItem = item => {
//     const timestamp = item.item.time.toDate(); // Convert Firestore Timestamp to JavaScript Date
//     const formattedTime = timestamp.toDateString(); // Format the Date as a string
//     return (
//       <View>
//         <Text> {item.item.title} </Text>
//         <Text> {formattedTime} </Text>
//         <Image
//           style={{width: 50, height: 50}}
//           source={{uri: item.item.imageUrl}}
//         />
//       </View>
//     );
//   };

//   useEffect(() => {
//     getMyPostsData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Search Post is here</Text>

//       <FlatList data={postList} renderItem={renderItem} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default Search;
