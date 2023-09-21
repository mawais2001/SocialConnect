import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../styles/colors';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import useAuths from '../allcomponents/auth/useAuths';

function Home(props) {
    const { user, setUser } = useAuths()
    const handleLogout = () => {
        auth().signOut().then(() => {
            setUser(null)
        }).catch((error) => console.log(error))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                <Text style={styles.text}> Hello, {auth().currentUser.displayName}  </Text>
                <Text style={styles.text}> {auth().currentUser.phoneNumber}  </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: moderateVerticalScale(20) }}>
                <ButtonCompo title='Logout' onPress={handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.socialorange,
        padding: moderateScale(20)
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.blackColor
    }
})

export default Home;