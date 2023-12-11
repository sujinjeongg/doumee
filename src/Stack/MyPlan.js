import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const MyPlan = () => {

  const navigation = useNavigation()

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <Icon name="location" size={30} color="white" />
              </View>
            <Text style={styles.mainTitle}>Busan</Text>
        </View>
        </View>
        </View>
    )
}
    


export default MyPlan

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
    },
    titleContainer: {
      flexDirection: 'row',
    },
    iconContainer: {
      marginLeft: 10,
      backgroundColor: 'blue',
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
      flex: 1,
      margin: 10,
      height: 230,  
      paddingTop: 10,
      paddingHorizontal: 5,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      position: 'relative',
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
    },
    icon: {
      position: 'absolute',
      bottom: 10,
      right: 8,
    },
});
  