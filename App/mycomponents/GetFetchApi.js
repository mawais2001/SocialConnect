import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ButtonCompo from '../../src/Components/ButtonCompo';
function GetFetchApi(props) {
    const [data, setData] = useState([]);
    const getDataApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        let response = await fetch(url);
        response = await response.json();
        setData(response);
        console.log('====================================');
        console.log(response);
        console.log('====================================');
    }
    const postFetchApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        let postResponse = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: 'My Name is Khan',
                userId: 786
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        postResponse = await postResponse.json();
        console.log('================POST FETCH START====================');
        console.log(postResponse);
        console.log('================POST FETCH END====================');
    }

    const putFetchApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts/1";
        let putResponse = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                userId: 41,
                title: 'Awais Khan',
                body: 'I am learning React native'
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        putResponse = await putResponse.json();
        console.log('=================PUT FETCH START===================');
        console.log(putResponse);
        console.log('=================PUT FETCH END===================');
    }

    const patchFetchApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts/2";
        let patchResponse = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                title: 'Muhammad Awais Yaseen'
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        patchResponse = await patchResponse.json();
        console.log('=================PATCH FETCH START===================');
        console.log(patchResponse);
        console.log('=================PATCH FETCH END===================');

    }

    const deleteFetchApi = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts/3";
        let deleteResponse = fetch(url, {
            method: 'DELETE'
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontFamily: 'Barlow-Regular' }}> Get Api data</Text>
            <ButtonCompo title='GET Fetch' onPress={getDataApi} />
            <ButtonCompo title='POST Fetch' onPress={postFetchApi} style={{ backgroundColor: 'seagreen', marginVertical: 20 }} />
            <ButtonCompo title='PUT Fetch' onPress={putFetchApi} style={{ backgroundColor: 'dodgerblue' }} />
            <ButtonCompo title='PATCH Fetch' onPress={patchFetchApi} style={{ backgroundColor: 'tomato', marginVertical: 20 }} />
            <ButtonCompo title='DELETE Fetch' onPress={deleteFetchApi} style={{ backgroundColor: 'black' }} />
            {
                data.length > 0 ? (<View style={{ paddingHorizontal: 20, marginVertical: 30, backgroundColor: 'seagreen' }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return (<Text style={{ color: 'white', fontSize: 20 }}>{item.id} {item.title} </Text>)
                        }}
                    />
                </View>) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export default GetFetchApi;