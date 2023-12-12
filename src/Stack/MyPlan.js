import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const MyPlan = () => {

  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: 'My Plan',
      headerTitleStyle: {
        fontSize: 18,
        color: 'black',
        marginLeft: -15,
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <View style={{ marginLeft: 10 }}>
          <Icon name="arrow-back" size={28} color="black" />
        </View>
      ),
    });
  }, [navigation]);

  const plans = [
    {image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Jogging' , place:'Haeundae Beach'},
    {image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Eating Raw Fish' , place:'Gwangalli Waterfront Park'},
    {image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Watching late-night movies' , place:'The Busan Cinema Center'},
    {image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Enjoying food' , place:'Kkangtong Market'},
    {image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Taking pictures' , place:'Gamcheon Culture Village'},
  ];


    return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Icon name="location" size={30} color="white" />
            </View>
            <Text style={styles.title}>Busan</Text>
          </View>
          <View style={styles.planContainer}>
            {plans.map((plan, index) => (
              <View key={index} style={styles.box}>
                <View style={styles.boxLeft}>
                <Image source={{ uri: plan.image }} style={styles.boxImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.boxText}>{plan.text}</Text>
                  <View style={styles.placeContainer}>
                    <Icon name="location" size={20} color="orange" />
                    <Text style={styles.boxPlace}>{plan.place}</Text>
                  </View>
                </View>
                </View>
                <View style={styles.boxIconContainer}>
                  <Icon name="create" style={styles.create} size={24} color="darkgrey"/>
                  <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
                    <Icon name="chevron-forward" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
    )
}
    


export default MyPlan

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 110,
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
    planContainer: {
      marginTop: 20,
    },
    box: {
      height: 100,
      backgroundColor: 'white',
      marginBottom: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    boxLeft: {
      flexDirection: 'row',
    },
    boxImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 15,
      marginLeft: 10,
    },
    textContainer: {
      flexDirection: 'column',
    },
    boxText: {
      fontSize: 16,
      fontWeight: '500',
      flex: 1,
      marginTop: 15,
    },
    placeContainer: {
      flexDirection: 'row', 
    },
    boxPlace: {
      fontSize: 13,
      color: 'grey',
      marginLeft: 3,
    },
    boxIconContainer: {
      marginRight: 10,
    },
    create: {
      marginBottom: 20,
    },
});
  