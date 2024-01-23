import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, FlatList, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Search = () => {

    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);
    const navigation = useNavigation()

    const searchKeyword = async () => {
        try {
            const response = await axios.get(`http://apis.data.go.kr/B551011/EngService1/searchKeyword1?ServiceKey=Z9i%2FG23AAyO%2FKACx3%2FCqrazOIGPcsirEV5BX8bIGu%2BXobx%2FutIU%2B91xpvHGOsN6t1M0YYdRVTSeK%2FTw68VZMCg%3D%3D&keyword=${searchText}&MobileOS=ETC&MobileApp=TestApp&_type=json`);

            console.log(response.data);
            setResults(response.data.response.body.items.item);
        } catch (error) {
            Alert.alert('Search Error', 'Error while searching. Please try again.');
            console.log(error);
        }
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: () => (
                <View style={styles.searchBar}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Search here..."
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={text => setSearchText(text)}
                    />
                    <Icon name="search" style={styles.searchIcon} onPress={searchKeyword} />
                </View>
            ),
        });
    }, [navigation, searchText]);

    const renderResult = ({item}) => {
      return (
        <View style={styles.resultContainer}>
            {item.firstimage ? <Image source={{uri: item.firstimage}} style={styles.image}/> : null}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>Address: {item.addr1}</Text>

        </View>
      );
    };


    return (
        <View style={styles.container}>
            <FlatList 
                data={results}
                renderItem={renderResult}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 105,
    },
    searchBar: {
        flexDirection: 'row',
        width: '750%',
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 25,
        backgroundColor: '#f8f8f8',
        marginLeft: -15,
    },
    searchInput: {
        height: 45,
        flex: 1,
        paddingLeft: 11,
        fontSize: 16,
    },
    searchIcon: {
        padding: 10,
        paddingTop: 15,
        marginRight: 10,
    },
    resultContainer: {
      margin: 10,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: -15,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    title: {
      fontSize: 18, 
      fontWeight: 'bold',
      marginHorizontal: 3,
    },
    text: {
      marginVertical: 7,
      marginHorizontal: 3,
    },
    image: {
      width: 315, 
      height: 200,
      margin: 7,
      borderRadius: 10,
      marginLeft: 10,
    },
});

export default Search;