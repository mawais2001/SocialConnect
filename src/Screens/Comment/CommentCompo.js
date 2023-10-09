import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Comment from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import {scale, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import navigationString from '../../Navigation/navigationString';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CommentCompo = ({postId, postuserId}) => {
  const [commentLength, setCommentLength] = useState(0);
  const navigation = useNavigation();

  const getAllCommentsLength = async () => {
    try {
      const commentsRef = firestore().collection('comments');
      const query = commentsRef.where('postId', '==', postId);
      let commentCount = 0;
      query.onSnapshot(querySnapshot => {
        commentCount = querySnapshot.size;
        setCommentLength(commentCount);
      });

      // return unsubscribe;
    } catch (error) {
      console.error('Error counting comments:', error);
      throw error;
    }
  };

  useEffect(() => {
    getAllCommentsLength();
    // const unsubscribe = getAllCommentsLength();

    // return () => {
    //   if (unsubscribe) {
    //     unsubscribe();
    //   }
    // };
  }, [postId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate(navigationString.COMMENT, {
            postId,
            postuserId,
            commentLength,
          })
        }>
        <Comment name="comment-o" size={24} color={colors.blackColor} />
      </TouchableOpacity>
      <Text style={styles.likecommentStyle}> {commentLength} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likecommentStyle: {
    fontSize: scale(12),
    color: colors.grayColor,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
});

export default CommentCompo;
