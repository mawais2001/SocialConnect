import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList } from 'react-native';
import { moderateVerticalScale, moderateScale, scale, ScaledSheet } from 'react-native-size-matters'
import colors from '../../src/styles/colors';
import ButtonCompo from '../../src/Components/ButtonCompo';
import Icon from 'react-native-vector-icons/Feather'
import MyIcon from 'react-native-vector-icons/MaterialIcons'
function CrudApi(props) {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [updataBtn, setUpdateBtn] = useState(false);
    const [upindex, setUpIndex] = useState(0);


    const postCrud = async () => {
        const url = "http://10.0.2.2:3000/posts";
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, age })
        })
        result = await result.json();
        console.log('==============POST CRUD START======================');
        console.log(result);
        console.log('================POST CRUD END====================');
        setName("");
        setAge("");
        setEmail("");
        getCrud();

    }

    const getCrud = async () => {
        const url = "http://10.0.2.2:3000/posts";
        let result = await fetch(url);
        result = await result.json();
        setData(result);
    }

    const deleteCrud = async (id) => {
        const url = `http://10.0.2.2:3000/posts/${id}`;
        let res = await fetch(url, {
            method: 'DELETE'
        })
        getCrud();
    }

    const updateCrud = async (item) => {
        setUpdateBtn(true);
        setName(item.name);
        setAge(item.age);
        setEmail(item.email);
        setUpIndex(item.id)
    }
    const updateButton = async () => {
        const url = `http://10.0.2.2:3000/posts/${upindex}`;
        let result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, age })
        })
        result = await result.json();
        console.log('==============PUT CRUD START======================');
        console.log(result);
        console.log('================PUT CRUD END====================');
        getCrud();
        setUpdateBtn(false);
        setName("");
        setAge("");
        setEmail("");
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Crud API</Text>
            <View style={{ marginHorizontal: moderateScale(10) }}>
                <TextInput style={styles.input} placeholder='Enter Name' value={name} onChangeText={(text) => setName(text)} />
                <TextInput style={styles.input} placeholder='Enter Email' value={email} onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.input} placeholder='Enter Age' value={age} onChangeText={(text) => setAge(text)} />
                {
                    updataBtn ? <ButtonCompo title='UPDATE' style={{ alignSelf: 'center', marginVertical: moderateVerticalScale(10), backgroundColor: 'blue' }} onPress={updateButton} /> :
                        <ButtonCompo title='POST' style={{ alignSelf: 'center', marginVertical: moderateVerticalScale(10) }} onPress={postCrud} />
                }


            </View>
            <View style={{ backgroundColor: '#008080', padding: moderateScale(20), flex: 1 }}>
                <ButtonCompo title='GET Data' style={{ backgroundColor: 'palevioletred', alignSelf: 'center' }} onPress={getCrud} />
                {
                    data.length > 0 ? <FlatList
                        data={data}
                        renderItem={({ item, index }) => <View style={styles.contain}>
                            <Text style={styles.txt}>{item.id} {item.name} </Text>
                            <Icon name="edit" size={25} color="blue" style={{ marginHorizontal: 10 }} onPress={() => updateCrud(item)} />
                            <MyIcon name="delete" size={25} color="red" onPress={() => deleteCrud(item.id)} />
                        </View>}
                    /> : null
                }
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'mintcream',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10)
    },
    text: {
        fontSize: scale(20),
        color: colors.blackColor,
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateVerticalScale(16),
        marginVertical: moderateVerticalScale(8),
        borderRadius: moderateScale(12),
        shadowColor: 'black',
        elevation: 6,
        fontSize: scale(16),
        color: colors.blackColor
    },
    txt: {
        fontSize: scale(14),
        color: 'black',
        flex: 1
    },
    contain: {
        backgroundColor: 'snow',
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(10),
        marginTop: moderateVerticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default CrudApi;