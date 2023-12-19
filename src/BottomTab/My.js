import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'

const My = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderImage, setFolderImage] = useState(null);

  const folders = [
    { name: 'Busan -', items: 2, image: require('./Busan.png') },
    { name: 'Incheon -', items: 3, image: require('./Incheon.png') },
    { name: 'Seoul -', items: 1, image: require('./Seoul.png') },
    { name: 'Daegu -', items: 3, image: require('./Daegu.png') },
    { name: 'Gyeongju -', items: 2, image: require('./Gyeongju.png') },
  ];

  const posts = [
    { id: 1, image: require('./Gyeongju.png'), text: 'Happy moments in Gyeongju' },
    { id: 2, image: require('./Seoul.png'), text: 'What a beautiful city, Seoul' },
    { id: 3, image: require('./Busan.png'), text: 'Lovely Busan' },
    { id: 4, image: require('./Incheon.png'), text: 'Travel in Incheon' },
    { id: 5, image: require('./Daegu.png'), text: 'Memories in Daegu' },
  ];

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setFolderImage(result.uri);
    }
  };

  const addNewFolder = () => {
    if (folderName.trim() === '') {
      alert('Please enter folder name!');
      return;
    }

    if (!folderImage) {
      alert('Please select an image for the folder!');
      return;
    }

    const newFolder = {
      name: folderName,
      image: folderImage,
      items: 0, // initialize the number of items in the folder here
    };

    setModalVisible(false);
    setFolderName('');
    setFolderImage(null);
  };

  return (

    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Image source={require('./profile.png')} style={styles.profileImage} />
      </View>
        
      <Text style={styles.myPlanText}>My Plan</Text>
      
      <TouchableOpacity style={styles.plusIcon} onPress={() => setModalVisible(true)}>
        <Image source={require('./plus.png')} style={styles.plusImage} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Folder</Text>
            <TextInput
              style={styles.input}
              placeholder="Folder Name"
              value={folderName}
              onChangeText={(text) => setFolderName(text)}
            />
            <TouchableOpacity onPress={openImagePicker}>
              <Text>Select Image from Gallery</Text>
            </TouchableOpacity>
            {folderImage && (
              <Image source={{ uri: folderImage }} style={styles.selectedImage} />
            )}

            <View style={styles.buttonContainer}>             
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createfolderbutton} onPress={addNewFolder}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>  
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.folderList}>
        {folders.map((folder, index) => (
          <TouchableOpacity key={index} style={styles.folderItem} onPress={() => navigation.navigate('MyPlan')}>
            <Image source={folder.image} style={styles.folderImage} />
            <Text style={styles.folderInfo}>{`${folder.name} ${folder.items} items`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.recordeditList}>
      <Text style={styles.recordText}>Record</Text>  
      <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('NewPost')}>
        <Image source={require('./edit.png')} style={styles.editImage} />
      </TouchableOpacity>
      </View>    

    <View style={styles.postList}>
      <ScrollView contentContainerStyle={styles.postListContent}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} onPress={() => navigation.navigate(`Post${post.id}`)} activeOpacity={0.9}>
            <View style={styles.postContainer}>
              <View style={styles.postContent}>
              <Image source={post.image} style={styles.postImage} />
              <Text style={styles.postText}>{post.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
       ))}
      </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    top: 60,
    right: 135,
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  myPlanText: {
    fontWeight: 'bold',
    right: 115,
    top: 70,
    fontSize: 22,
  },
  plusIcon: {
    top: 40,
    left: 135,
  },
  plusImage: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
    padding: 10,
  },
  selectedImage: {
    marginTop: 20,
    width: 200,
    height: 150,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', 
    left: 16,
    marginTop: 20,
  },  
  createfolderbutton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },  
  cancelButton: {
    marginTop: 20,
    color: 'blue',
  },
  folderList: {
    top: 60,
    marginLeft: 20,
  },
  folderItem: {
    marginRight: 10,
  },
  folderImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  folderInfo: {
    top: 10,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recordeditList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    top: -95,
  },
  recordText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 205,
  },
  editIcon: {
    width: 30,
    height: 30,
  },
  editImage: {
    width: '100%',
    height: '100%',
  },
  postList: {
    flex: 1,
    top: -120,
    marginTop: 10,
    marginBottom: 10,
  },
  postListContent: {
     top: -180,
     paddingBottom: 170,
  },
  postContainer: { 
    top: 180,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 325,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContent: {
    padding: 20,
  },
  postImage: {
    width: 300,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  postText: {
    fontSize: 13,
    textAlign: 'center'
  },
});

export default My;