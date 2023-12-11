import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const data = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',text: 'Myeong-dong, Seoul' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',text: 'Song-do, Incheon' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',text: 'Haeundae, Busan' },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',text: 'Gyeongju' },
  ];


const Like = () => {

  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleOpenModal = () => {
    setModalData(data.map(item => item.text));
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <Icon name="heart" size={30} color="white" />
              </View>
              <View style={styles.title}>
                <Text style={styles.mainTitle}>Like</Text>
                <Text style={styles.smallTitle}>The places you like</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleOpenModal}>
              <Icon name="list" size={40}/>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.box}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <Text style={styles.text} >{item.text}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Detail')} style={styles.icon}>
                    <Icon name="chevron-forward" size={24} color="blue"/>
                  </TouchableOpacity>
                </View>
              )}
          />
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {modalData.map((text, index) => (
                  <Text style={styles.textStyle} key={index}>{text}</Text>
                ))}
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.btnTextStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
    },
    titleContainer: {
      flexDirection: 'row',
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
      elevation: 5
    },
    textStyle: {
      fontSize: 18,
      marginBottom: 5,
    },
    closeButton: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 8,
      paddingHorizontal: 15,
      elevation: 2,
      marginTop: 30,
    },
    btnTextStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
});
  