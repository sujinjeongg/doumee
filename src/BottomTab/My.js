import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'

const My = ({route}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderImage, setFolderImage] = useState(null);
  const [folders, setFolders] = useState([]);
  const [posts, setPosts] = useState([]); // Add this state for storing posts

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
    };

    setModalVisible(false);
    setFolderName('');
    setFolderImage(null);
    setFolders([...folders, newFolder]);
  };

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    // Receive the postImage parameter from the NewPost component
    const postImage = route.params?.postImage;
  
    if (postImage) {
      // Create a new post object with the received postImage
      const newPost = {
        title: '', // You might want to set an appropriate title
        content: [], // You might want to set appropriate content
        image: postImage,
      };
  
      // Add the new post to the posts state
      setPosts([...posts, newPost]);
    }
  }, [route.params?.postImage]);
  
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
             <Image source={typeof folder.image === 'string' ? { uri: folder.image } : folder.image} style={styles.folderImage} />
            <Text style={styles.folderInfo}>{`${folder.name}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.recordeditList}>
      <Text style={styles.recordText}>Record</Text>  
      <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('NewPost', { addNewPost })}>
        <Image source={require('./edit.png')} style={styles.editImage} />
      </TouchableOpacity>
      </View>    

    <View style={styles.postList}>
      <ScrollView contentContainerStyle={styles.postListContent}>
        {posts.map((post, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(`Post${index}`)} activeOpacity={0.9}>
            <View style={styles.postContainer}>
  <View style={styles.postContent}>
    {post.image && (
      <Image source={{ uri: typeof post.image === 'string' ? post.image : post.image.uri }} style={styles.postImage} />
    )}
    <Text style={styles.postText}>{post.title}</Text>
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
    top: -155,
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
    top: -190,
    marginTop: 40,
    marginBottom: -180,
  },
  postListContent: {
     top: -200,
     paddingBottom: 190,
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
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  postText: {
    fontSize: 13,
    textAlign: 'center'
  },
});

export default My;