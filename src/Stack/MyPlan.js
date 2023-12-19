import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';


const MyPlan = () => {

  const navigation = useNavigation()

  const [plans, setPlans] = useState([
    {id: '1', image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Jogging' , place:'Haeundae Beach'},
    {id: '2', image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Eating Raw Fish' , place:'Gwangalli Waterfront Park'},
    {id: '3', image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Watching late-night movies' , place:'The Busan Cinema Center'},
    {id: '4', image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Enjoying food' , place:'Kkangtong Market'},
    {id: '5', image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , text:'Taking pictures' , place:'Gamcheon Culture Village'},
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editText, setEditText] = useState('');
  const [editId, setEditId] = useState(null);

  const handleOpenEditModal = (id, text) => {
    setEditId(id);
    setEditText(text);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEditItem = () => {
    setPlans(plans.map(item => item.id === editId ? {...item, text: editText} : item));
    handleCloseEditModal();
  };


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



  const handleDeleteItem = id => {
    setPlans(plans.filter(item => item.id !== id));
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
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Icon name="location" size={30} color="white" />
            </View>
            <Text style={styles.title}>Busan</Text>
          </View>
          <View style={styles.planContainer}>
            {plans.map((plan, index) => (
              <TouchableOpacity key={index} onLongPress={() => handleLongPressItem(plan.id)} style={styles.box}>
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
                  <TouchableOpacity onPress={() => handleOpenEditModal(plan.id, plan.text)}>
                    <Icon name="create" style={styles.create} size={24} color="darkgrey"/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
                    <Icon name="chevron-forward" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Modal animationType="slide" transparent={true} visible={editModalVisible} onRequestClose={handleCloseEditModal}>
            <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPressOut={handleCloseEditModal}>
              <View style={styles.modalView}>
                <TextInput value={editText} onChangeText={text => setEditText(text)} style={styles.textInput}/>
                <Button onPress={handleEditItem} mode="contained" style={styles.modalbtn}>
                  Confirm
                </Button>
              </View>
            </TouchableOpacity>
          </Modal>
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '60%',
    },
    textInput: {
      borderColor: '#d3d3d3',
      borderWidth: 1.5,
      borderRadius: 5,
      fontSize: 18,
      width: '100%',
      padding: 10,
      margin: 10,
      marginBottom: 20,
    },
    modalbtn: {
      borderRadius: 15,
      backgroundColor: 'skyblue'
    }
});
  