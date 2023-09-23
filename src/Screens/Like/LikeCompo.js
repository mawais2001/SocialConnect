import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import colors from '../../styles/colors';
import Like from 'react-native-vector-icons/AntDesign';
import Comment from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-vector-icons/Entypo';

const LikeCompo = ({postId, postuserId, onLike}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const getLikesDetail = async () => {
    const loggedUser = auth().currentUser;
    const postRef = firestore()
      .collection('posts')
      .doc(postuserId)
      .collection('allposts')
      .doc(postId);

    try {
      const postDoc = await postRef.get();
      if (postDoc.exists) {
        const postData = postDoc.data();
        if (postData.hasOwnProperty('likes')) {
          const currentLikesCount = postData.likes.length;
          setLikesCount(currentLikesCount);
          if (postData.likes && postData.likes.includes(loggedUser.uid)) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLikesDetail();
  }, [likesCount, liked]);

  const handleLike = async () => {
    const loggedUser = auth().currentUser;
    const postRef = firestore()
      .collection('posts')
      .doc(postuserId)
      .collection('allposts')
      .doc(postId);
    try {
      const postDoc = await postRef.get();
      if (postDoc.exists) {
        const postData = postDoc.data();
        if (postData.hasOwnProperty('likes')) {
          if (postData.likes && postData.likes.includes(loggedUser.uid)) {
            await postRef.update({
              likes: firestore.FieldValue.arrayRemove(loggedUser.uid),
            });
            setLiked(false);
            // onLike();
          } else {
            // User hasn't liked the post, so like it
            await postRef.update({
              likes: firestore.FieldValue.arrayUnion(loggedUser.uid),
            });
            setLiked(true);
            // onLike();
          }
        }
        // if (!postData.hasOwnProperty('likes')) {
        //   console.log('...............No Like..............');
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {/* <Like name="like2" size={24} color={colors.blackColor} /> */}
      {!!liked ? (
        <TouchableOpacity
          activeOpacity={0.3}
          style={{paddingHorizontal: 10}}
          onPress={handleLike}>
          <Like name="like1" size={24} color={colors.blueLight} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.3}
          style={{paddingHorizontal: 10}}
          onPress={handleLike}>
          <Like name="like2" size={24} color={colors.blackColor} />
        </TouchableOpacity>
      )}
      <Text style={styles.likecommentStyle}> {likesCount} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  likecommentStyle: {
    fontSize: scale(12),
    color: colors.grayColor,
    fontWeight: '500',
    // marginLeft: moderateScale(8),
  },
});

export default LikeCompo;
