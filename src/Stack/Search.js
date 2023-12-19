import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Search = () => {

    const navigation = useNavigation()

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
            />
            <Icon name="search" style={styles.searchIcon} />
            </View>
          ),
        });
      }, [navigation]);


    return (
        <View style={styles.container}>

        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingLeft: 15,
        fontSize: 16,
      },
      searchIcon: {
        padding: 10,
        paddingTop: 15,
        marginRight: 10,
      },
    });

export default Search;