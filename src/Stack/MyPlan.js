import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const MyPlan = () => {

  const navigation = useNavigation()

    return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Icon name="location" size={30} color="white" />
            </View>
            <Text style={styles.title}>Busan</Text>
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
      paddingLeft: 13,
      fontSize: 28,
      fontWeight: 'bold',
      alignContent: 'center',
      paddingTop: 5,
    },
});
  