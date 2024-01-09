import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'


const Home = () => {
  const navigation = useNavigation()
    
  const images = [
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww',
  ];

  const scrollViewRef = useRef(null);
  let scrollPosition = 0;  // 스크롤 위치를 저장하는 변수를 추가합니다.
  let imageWidth = 350;  // 이미지의 너비를 설정하세요.
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollPosition >= images.length * imageWidth) {
        // 스크롤 위치가 마지막 이미지를 넘어갔을 때, 스크롤 위치를 처음으로 돌립니다.
        scrollPosition = 0;
      }
      
      scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });
      scrollPosition += imageWidth;  // 스크롤 위치를 이미지 한 장의 너비만큼 이동합니다.
    }, 3000);  // 3초마다 스크롤 위치를 조정합니다.
  
    return () => clearInterval(intervalId);  // 컴포넌트가 언마운트될 때 타이머를 제거합니다.
  }, []);
  

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
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul', intro: 'Mecaa of Shopping' },
    ],
    Nightscape: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gyeongju', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Daegu', intro: 'Mecaa of Shopping' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gangreung', intro: 'The best summer resort' },
    ],
    Sights: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul', intro: 'Mecaa of Shopping' },
    ],
    Mountain: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gyeongju', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Daegu', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gangreung', intro: 'Mecaa of Shopping' },
    ],
    Ocean: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul', intro: 'Mecaa of Shopping' },
    ],
    Forest: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gyeongju', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Daegu', intro: 'Mecaa of Shopping' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gangreung', intro: 'The best summer resort' },
    ],
    Museum: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan', intro: 'The best summer resort'},
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul', intro: 'Mecaa of Shopping' },
    ],
    Monument: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gyeongju', intro: 'Mecaa of Shopping' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Daegu', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gangreung', intro: 'The best summer resort' },
    ],
    Palace: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul', intro: 'Mecaa of Shopping' },
    ],
    Painting: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gyeongju', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Daegu', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gangreung', intro: 'Mecaa of Shopping' },
    ],
    Sculpture: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Song-do, Incheon', intro: 'Mecaa of Shopping' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Haeundae, Busan', intro: 'The best summer resort' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Myeong-dong, Seoul', intro: 'International City' },
    ],
    Installation: [
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gyeongju', intro: 'Mecaa of Shopping' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Daegu', intro: 'International City' },
      { imageUrl: 'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww', text: 'Gangreung', intro: 'The best summer resort' },
    ],
  };

  const Button = ({ title, onSelect, selected, isSubCategory }) => {
    return (
      <TouchableOpacity
        style={[styles.button, selected && (isSubCategory ? styles.subSelectedButton : styles.selectedButton)]}
        onPress={() => onSelect(title)}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const [selectedItems, setSelectedItems] = useState({});


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Where do you want to</Text>
            <Text style={styles.title}>travel?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <ScrollView ref={scrollViewRef} horizontal={true}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail')}>
                <Image style={styles.image} source={{uri: image}}/>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
                isSubCategory={false}  // Category에 대한 버튼이므로 false로 설정
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
                isSubCategory={true}  // SubCategory에 대한 버튼이므로 true로 설정
              />
              ))}
            </View>
          )}
        </View>
        {selectedSubCategory && (
          <ScrollView style={styles.listContainer}>
            {listItems[selectedSubCategory].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.listItem} 
                onPress={() => navigation.navigate('Detail')}
              >
                <View style={styles.listInfo}>
                  <Image source={{ uri: item.imageUrl }} style={styles.listItemImage} />
                  <View style={styles.listText}>
                    <Text>{item.text}</Text>
                    <Text style={{color: 'blue'}}>{item.intro}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedItems(prevState => ({ ...prevState, [index]: !prevState[index] }))}>
                  <Icon name={selectedItems[index] ? 'heart' : 'heart-outline'} size={20} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
              ))}
          </ScrollView>
)}
      </View>
    )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
  },
  image: {
    width: 350,
    height: 270,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoryContainer: {
    paddingTop: 15,
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
    backgroundColor: '#007BFF',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding : 10,
  },
  listInfo: {
    flexDirection: 'row',
  },
  listText: {
    marginTop: 5,
  },
  listItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});