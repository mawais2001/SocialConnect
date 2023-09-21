import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TextInput, PermissionsAndroid, ScrollView } from 'react-native';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { moderateScaleVertical } from '../../styles/responsiveSize';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import HeaderCompo from '../../Components/HeaderCompo';
import DocumentPicker from 'react-native-document-picker';
import firestores from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import useAuths from '../allcomponents/auth/useAuths';


function Register(props) {
    const [email, setEmail] = useState("");
    const [fullname, setFullName] = useState("");
    const [address, setAdress] = useState("");
    const [imgData, setImgData] = useState(null);
    const [imgPath, setImgPath] = useState('');
    const [regError, setRegError] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [goHome, setGoHome] = useState(false);
    const navigation = useNavigation()
    const { user, setUser } = useAuths()
    const userData = auth().currentUser;
    console.log('====================================');
    console.log(userData);
    console.log('====================================');
    // useEffect(() => {
    //     if (goHome) {
    //         navigation.navigate("Home");
    //     }
    // }, [goHome]);

    const handleHomeScreen = () => {
        if (goHome) {
            setUser(auth().currentUser);
            console.log("Go to HOme Screen function is run!");
            setRegError("")
        }
        else {
            setRegError("Enter profile details for home screen")
        }
    }

    const handleImagePicker = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to select an image.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const response = await DocumentPicker.pickSingle({
                    type: [DocumentPicker.types.images],
                    copyTo: 'cachesDirectory'
                });
                console.log(response);
                setImgData(response);
            } else {
                console.log('Storage permission denied');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleProfileData = async () => {
        if (!email || !fullname || !imgData) {
            return setRegError("Name, Email and Profile image must be selected to create Account!")
        }
        else {
            try {
                setRegError("");
                await userData.updateProfile({
                    displayName: fullname
                })
                await firestores().collection('users').doc(userData.uid).set({
                    fullName: fullname,
                    email: email,
                    address: address,
                    phone: userData.phoneNumber
                })

                if (imgData) {
                    try {
                        const imageRef = storage().ref(`profileImages/${userData.displayName}.jpg`);
                        await imageRef.putFile(imgData.fileCopyUri.replace('file://', ''));
                        const downloadURL = await imageRef.getDownloadURL();
                        setPhotoUrl(downloadURL);
                        if (imageRef) {
                            console.log('===============image Upload Response Start=====================');
                            console.log('uploaded');
                            console.log('================image Upload Response END====================');
                            console.log('===============downloadURL Upload Response Start=====================');
                            console.log(downloadURL);
                            if (downloadURL.length > 2) {
                                await userData.updateProfile({
                                    photoURL: downloadURL
                                })
                                await firestores().collection('users').doc(userData.uid).set({
                                    fullName: fullname,
                                    email: email,
                                    address: address,
                                    phone: userData.phoneNumber,
                                    profilePicture: downloadURL
                                })
                            }
                            setGoHome(true);
                            console.log('================downloadURL Upload Response END====================');
                        }
                    } catch (error) {
                        console.log('====================================');
                        console.log(error);
                        console.log('====================================');
                    }
                }
                if (photoUrl) {
                    await userData.updateProfile({
                        photoURL: photoUrl
                    })
                    // setGoHome(true);

                    console.log('====================================');
                    console.log(userData);
                    console.log('====================================');
                }



            } catch (error) {
                console.log('===========ERROR while creating Account  START=========================');
                console.log(error);
                console.log('===========ERROR while creating Account END=========================');
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <HeaderCompo style={{ paddingHorizontal: moderateScale(20) }} />
            <View style={styles.box1}>
                <Text style={styles.heading}>Welcome Back {userData.phoneNumber} !</Text>
                <Text style={styles.heading2}>Give some detail to complete your profile process</Text>
            </View>
            <View style={styles.box2}>
                <TextInput style={styles.input}
                    placeholder='Enter Name *'
                    value={fullname} onChangeText={(text) => setFullName(text)}
                />
                <TextInput style={styles.input}
                    placeholder='Enter Email *'
                    value={email} onChangeText={(text) => setEmail(text)}
                />
                <TextInput style={styles.input}
                    placeholder='Enter Address (optional)'
                    value={address} onChangeText={(text) => setAdress(text)}
                />
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    {regError.length > 0 ? <Text style={styles.error}> {regError} </Text> : null}
                    {
                        imgData ? (<Image style={styles.img} source={{ uri: imgData.uri }} />) : (<Text style={{ textAlign: 'center', fontSize: scale(18), marginVertical: moderateVerticalScale(10) }}>No Image Selected</Text>)
                    }
                    <ButtonCompo title='Select Profile Image *' onPress={handleImagePicker} />
                </View>
            </View>
            <View style={styles.box3}>
                <ButtonCompo title='Register' style={{ backgroundColor: colors.blackColor }} onPress={handleProfileData} />
                <ButtonCompo title='Home' style={{ backgroundColor: colors.themeColor, marginVertical: moderateVerticalScale(10) }} onPress={handleHomeScreen} />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.socialblue
    },
    image: {
        width: moderateScale(180),
        height: moderateScale(180)
    },
    box1: {
        // backgroundColor: 'red',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20)
    },
    box2: {
        // backgroundColor: 'pink',
        flex: 2,
        paddingTop: moderateScaleVertical(12),
        paddingHorizontal: moderateScale(20)
    },
    box3: {
        // backgroundColor: 'blue',
        flex: 0.3,
        alignItems: 'center',
        paddingTop: moderateVerticalScale(10),
        paddingHorizontal: moderateScale(22)
    },
    heading: {
        fontSize: scale(20),
        color: colors.whiteColor,
        marginBottom: moderateScaleVertical(10)
    },
    heading2: {
        fontSize: scale(16),
        color: colors.whiteColorOpacity70,
        textAlign: 'center',
        fontWeight: '800'
    },
    input: {
        backgroundColor: colors.whiteColor,
        borderRadius: moderateScale(18),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(14),
        fontSize: scale(16),
        color: colors.blackColor,
        marginBottom: moderateScaleVertical(20),
        // width: '90%'
    },
    error: {
        fontSize: scale(14),
        textAlign: 'center',
        marginBottom: moderateVerticalScale(10),
        color: 'black',
        fontWeight: 'bold'
    },
    img: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
    }
})

export default Register;