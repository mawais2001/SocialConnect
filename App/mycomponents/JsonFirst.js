import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, FlatList, TextInput } from 'react-native';
import ButtonCompo from '../../src/Components/ButtonCompo';

function JsonFirst(props) {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");


    const getApiData = async () => {
        const url = "http://10.0.2.2:3000/users";
        let result = await fetch(url);
        result = await result.json();
        console.log("---------Json Server Start----------");
        console.log(result);
        console.log("---------Json Server END----------");
        setData(result)
    }

    const postApiData = async () => {
        const url = "http://10.0.2.2:3000/users";
        const mydata = {
            name: 'Sikandar Raja',
            age: 23,
            email: 'sikandarraja222@gmail.com'
        }
        let result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(mydata),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log('===============POST JSON SERVER START=====================');
        console.log(result);
        console.log('================POST JSON SERVER END====================');
    }

    const postFormData = async () => {
        const url = "http://10.0.2.2:3000/users";
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                age: age,
                email: email
            })
        })
        result = await result.json();
        setData(result);
        console.log('===============POST FORM JSON SERVER START=====================');
        console.log(result);
        console.log('================POST FORM JSON SERVER END====================');
    }

    return (
        <View style={styles.container}>
            <Text> Json server</Text>
            <ButtonCompo title='GET Json' onPress={() => getApiData()} />
            <ButtonCompo title='POST Json' style={{ backgroundColor: 'blue', marginVertical: 10 }} onPress={postApiData} />

            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Enter Name' value={name} onChangeText={(text) => setName(text)} />
                <TextInput style={styles.input} placeholder='Enter Age' value={age} onChangeText={(text) => setAge(text)} />
                <TextInput style={styles.input} placeholder='Enter Email' value={email} onChangeText={(text) => setEmail(text)} />
                <ButtonCompo title='POST' style={{ backgroundColor: 'black', alignSelf: 'center', marginVertical: 10 }} onPress={postFormData} />
            </View>

            {/* {
                data.length > 0 ? data.map(
                    (item, index) => {
                        return (<View key={index} style={{ padding: 20, marginVertical: 20, backgroundColor: 'coral' }}>
                            <Text style={{ fontSize: 20 }}>{item.id} {item.name} {item.email} </Text>
                        </View>)
                    }
                ) : <Text>No data found</Text>
            } */}

            <FlatList data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <View style={{ padding: 20, marginVertical: 20, backgroundColor: 'coral' }}>
                    <Text style={{ fontSize: 20 }}>{item.id} {item.name} {item.email} </Text>
                </View>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    form: {
        backgroundColor: 'darkgray',
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '90%',
        // alignItems: 'center'
    },
    input: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        borderRadius: 12,
        backgroundColor: 'orange',
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20
    }
})

export default JsonFirst;