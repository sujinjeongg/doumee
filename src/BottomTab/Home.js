import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()
    
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const categories = {
    CITY: ['Shopping', 'Nightscape', 'Sights'],
    NATURE: ['Mountain', 'Ocean', 'Forest'],
    HISTORY: ['Museum', 'Monument', 'Palace'],
    ART: ['Painting', 'Sculpture', 'Installation'],
  };

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [list, setList] = useState([]);

  const listItems = {
    Shopping: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Nightscape: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Sights: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Mountain: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Ocean: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Forest: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Museum: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Monument: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Palace: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Painting: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Sculpture: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
    Installation: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul' },
    ],
  };

  const Button = ({ title, onSelect, selected }) => {
    return (
      <TouchableOpacity
        style={[styles.button, selected && styles.selectedButton]}
        onPress={() => onSelect(title)}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Where do you want to</Text>
            <Text style={styles.title}>travel?</Text>
          </View>
          <Icon name="search" size={30} />
        </View>
        <Image 
          style={styles.image}
          source={{uri: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D'}}
          onPress={() => navigation.navigate('Detail')}
        />
        <View style={styles.categoryContainer}>
          <Text style={styles.title}>Category</Text>
          <View style={styles.buttonContainer}>
            {Object.keys(categories).map((category) => (
              <Button 
                key={category}
                title={category} 
                onSelect={(title) => {
                 setSelectedCategory(title);
                  setSubCategories(categories[title]);
                }}
                selected={selectedCategory === category}
              />
            ))}
          </View>
          {selectedCategory && (
            <View style={styles.buttonContainer}>
              {subCategories.map((subCategory) => (
                <Button 
                  key={subCategory}
                  title={subCategory} 
                  onSelect={(title) => {
                    setSelectedSubCategory(title);
                    setList(listItems[title]);
                  }}
                  selected={selectedSubCategory === subCategory}
                />
              ))}
            </View>
          )}
        </View>
        {selectedSubCategory && (
          <View style={styles.listContainer}>
            {listItems[selectedSubCategory].map((item, index) => (
              <View key={index} style={styles.listItem} onPress={() => navigation.navigate('Detail')}>
                <Image source={{ uri: item.imageUrl }} style={styles.listItemImage} />
                <Text>{item.text}</Text>
              </View>
            ))}
            
          </View>
        )}
      </View>
    )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoryContainer: {
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: 'lightblue',
  },
  subSelectedButton: {
    backgroundColor: 'lightblue',
  },
  buttonText: {
    color: 'white',
  },
  listContainer: {
    flexDirection: 'column',
    margin: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});
  