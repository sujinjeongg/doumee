import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import SaveIcon from './check.png'
import GalleryIcon from './gallery.png'
import TrashIcon from './trash.png'

const NewPost = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const textInputRef = useRef(null); 

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
      }
    })();
  }, []);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus(); 
    }
  }, []);

  useEffect(() => {
    if (content.length === 0) {
      setContent([{ type: 'text', value: '' }]);
    }
  }, []);
  
  const onChangeText = (text, index) => {
    const updatedContent = [...content];
    updatedContent[index] = { ...updatedContent[index], value: text };
    setContent(updatedContent);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.uri]);
      setContent([...content, { type: 'image', value: result.uri }, { type: 'text', value: '' }]);
    }
  };

  const savePost = () => {
    // Save post logic here
    // Include title, content, and selectedImages URIs in the post object
    // Save the post to the appropriate location (database, state, etc.)
    navigation.navigate('My');
  };

  const removeImage = (indexToRemove) => {
    const updatedContent = content.filter((_, index) => index !== indexToRemove);
    setContent(updatedContent);
  };

  return (
    <View style={styles.container}>
         {/* Save button */}
     <TouchableOpacity onPress={savePost}>
        <Image source={SaveIcon} style={styles.saveIcon} />
      </TouchableOpacity>

      {/* Image picker */}
      <TouchableOpacity onPress={selectImage}>
      <Image source={GalleryIcon} style={styles.galleryIcon} />
      </TouchableOpacity>

      {/* Title input */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      {/* Content input */}
      <ScrollView style={styles.contentContainer}>
        {content.map((item, index) =>
          item.type === 'text' ? (
            <TextInput
              key={index}
              ref={textInputRef} 
              style={styles.textContentInput}
              multiline
              placeholder={index === 0 ? 'Write your text here...' : ''}
              value={item.value}
              onChangeText={(text) => onChangeText(text, index)}
            />
          ) : (
            <TouchableOpacity
              key={index}
              onPress={() => console.log('Image clicked')} // Action when image is clicked
              onLongPress={() => removeImage(index)} // Remove image on long press
            >
              <Image key={index} source={{ uri: item.value }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeImage(index)}
              >
                <Image source={TrashIcon} style={styles.trashIcon} />
              </TouchableOpacity>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 20,
    marginRight: 90,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  saveIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 2,
    top: 10,
  },
  galleryIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 45,
    top: 10,
  },
  contentContainer: {
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    top: 10,
    marginBottom: 20,
    maxHeight: 600,
  },
  textContentInput: {
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  selectedImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIcon: {
    width: 15,
    height: 15,
  },
});

export default NewPost;