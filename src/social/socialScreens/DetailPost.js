import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ButtonCompo from '../../Components/ButtonCompo';
import imagePath from '../../constants/imagePath';
import FastImage from 'react-native-fast-image';

function DetailPost(props) {
  const postData = props.route.params.postData;
  const navigation = useNavigation();
  // console.log("All post data is ", postData);
  return (
    <ImageBackground
      blurRadius={0.5}
      style={styles.container}
      source={{
        uri: postData.imageUrl ? postData.imageUrl : imagePath.blankimage,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: colors.blackOpacity70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: moderateScale(10),
          borderRadius: moderateScale(12),
          alignItems: 'center',
          marginTop: moderateVerticalScale(26),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <FastImage
            style={styles.profileStyle}
            source={{
              uri: postData.userPicture
                ? postData.userPicture
                : imagePath.avatar,
              priority: FastImage.priority.normal,
            }}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={styles.profileNameStyle}>
              {' '}
              {postData.userName ? postData.userName : postData.title}{' '}
            </Text>
            <Text numberOfLines={1} style={styles.profileDescStyle}>
              {' '}
              {postData.userAddress
                ? postData.userAddress
                : 'Anonymous Address'}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="circle-with-cross" size={30} color={colors.whiteColor} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: moderateVerticalScale(20),
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            numberOfLines={3}
            style={{
              ...styles.profileNameStyle,
              fontSize: scale(12),
              backgroundColor: colors.blackOpacity70,
              padding: moderateScale(8),
              borderRadius: moderateScale(10),
              marginBottom: moderateVerticalScale(10),
              textAlign: 'center',
              // letterSpacing: 1,
              // lineHeight: 25,
            }}>
            {' '}
            {postData.description ? postData.description : postData.title}{' '}
          </Text>
          {/* <ButtonCompo
            title="See More"
            style={{backgroundColor: colors.redColor}}
          /> */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // opacity: 0.7,
    paddingHorizontal: moderateScale(8),
  },
  profileNameStyle: {
    fontSize: scale(16),
    color: colors.whiteColor,
    fontWeight: 'bold',
  },
  profileDescStyle: {
    fontSize: scale(12),
    color: colors.whiteColor,
    fontWeight: 'bold',
  },
  profileStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    resizeMode: 'cover',
  },
});

export default DetailPost;
