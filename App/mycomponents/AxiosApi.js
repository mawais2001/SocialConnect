import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import axios from 'axios';
import ButtonCompo from '../../src/Components/ButtonCompo';
function AxiosApi() {
    const [data, setData] = useState([]);
    const getAxiosAPi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        let getResponse = await axios({
            method: 'get',
            url: url
        })
        setData(getResponse.data);
        console.log('=============GET Axios START=======================');
        console.log(getResponse.data);
        console.log("Status for GET Request is:");
        console.log(getResponse.status);
        console.log('==============GET Axios END======================');
    }

    const postAxiosAPi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        let postResponse = await axios({
            method: 'POST',
            url: url,
            data: {
                title: 'Checking Post request for Axios 1',
                // userId: 123,
                // body: 'React Native'
            }
        })
        // setData(postResponse.data);
        console.log('=============GET Axios START=======================');
        console.log(postResponse.data);
        console.log("Status is:");
        console.log(postResponse.status);
        console.log('==============GET Axios END======================');
    }


    const putAxiosApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts/2";
        let putResponse = await axios({
            url: url,
            method: 'PUT',
            data: {
                title: 'Ali Ahmed'
            }
        })
        console.log("Response of PUT AXIOS: ", putResponse.data);
    }

    const patchAxiosApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts/4";
        let patchResponse = await axios({
            url: url,
            method: 'PATCH',
            data: {
                body: 'My Name is Ali Ahmed'
            }
        })
        console.log("Response of Patch AXIOS: ", patchResponse.data);
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginVertical: 20, fontSize: 20, color: 'white', textAlign: 'center' }}>Axios API</Text>
            <ButtonCompo title='GET Axios' onPress={getAxiosAPi} />
            <ButtonCompo title='POST Axios' onPress={postAxiosAPi} style={{ marginVertical: 20, backgroundColor: 'orange' }} />
            <ButtonCompo title='PUT Axios' onPress={putAxiosApi} style={{ backgroundColor: 'black' }} />
            <ButtonCompo title='PATCH Axios' onPress={patchAxiosApi} style={{ marginVertical: 20, backgroundColor: 'gold' }} />
            {
                data.length > 0 ? (
                    <View style={{ margin: 20, padding: 20, backgroundColor: 'black' }}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => {
                                return (
                                    <Text style={{ fontSize: 20, color: 'white' }}> {item.id} {item.title} </Text>
                                )
                            }}
                        />
                    </View>
                ) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightcoral',
        alignItems: 'center'
    }
})

export default AxiosApi;