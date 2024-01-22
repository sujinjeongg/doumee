import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import DataContext from '../Stack/DataContext';



const Like = () => {

  const navigation = useNavigation()
  const { data } = useContext(DataContext);

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  const handleLongPressItem = id => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "cancel",
          style: "cancel"
        },
        { text: "confirm", onPress: () => handleDeleteItem(id) }
      ]
    );
  };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon name="heart" size={30} color="white" />
            </View>
            <View style={styles.title}>
              <Text style={styles.mainTitle}>Like</Text>
              <Text style={styles.smallTitle}>The places you like</Text>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <FlatList data={data} numColumns={2} keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => handleLongPressItem(item.id)}  style={styles.box}>
                  <Image source={item.imageUrl ? { uri: item.imageUrl } : require('./Seoul.png')} style={styles.image} />
                  <Text style={styles.text}>{item.text}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Detail')} style={styles.icon}>
                    <Icon name="chevron-forward" size={24} color="blue"/>
                  </TouchableOpacity>
              </TouchableOpacity>
              )}
            />
          </View>
        </View>
    )
}


export default Like
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 20,
    },
    iconContainer: {
      marginLeft: 10,
      backgroundColor: 'red',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    title: {
      flexDirection: 'column',
      paddingLeft: 13,
    },
    mainTitle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    smallTitle: {
      fontSize: 16,
      color: 'grey',
    },
    box: {
      width: '46%',
      height: 230,  
      paddingTop: 13,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      position: 'relative',
      margin: '2%',
    },
    image: {
      width: '90%',
      height: '60%',
      resizeMode: 'cover',
      borderRadius: 10,
      padding: 10,
    },
    text: {
      alignContent: 'flex-start',
      width: '90%',
      paddingTop: 5,
      fontSize: 16,
    },
    icon: {
      position: 'absolute',
      bottom: 10,
      right: 8,
    },
});
  