import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const Home = () => {
  const navigation = useNavigation()
const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [list, setList] = useState([]);
    
  const images = [
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678379473620-db6bc7ff8a11?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVBJUIxJUI0JUVCJUFDJUJDfGVufDB8fDB8fHww',
  ];

  const scrollViewRef = useRef(null);
  let scrollPosition = 0;
  let imageWidth = 350;
  
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
  
  const categories = {
    CITY: ['Street', 'Building', 'Tower'],
    NATURE: ['Mountain', 'Beach', 'Forest'],
    HISTORY: ['Museum', 'Monument', 'Statue'],
    CULTURE: ['Sports', 'Music', 'Art'],
  };

  // API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `http://apis.data.go.kr/B551011/EngService1/searchKeyword1?ServiceKey=n2%2FFPg6H7Z52OAEFmtjTXCKNBHBZ08uUGljVTQWijKC6GeuQTWMSEzDB8XwQbIIE69%2BgM7AIokqvH6opUKYrGg%3D%3D&arrange=O&contentTypeId=76&keyword=${selectedSubCategory}&MobileOS=AND&MobileApp=doumee&_type=json`
        );

        // 받아온 데이터를 사용하여 이미지와 텍스트를 설정
        const items = response.data.response.body.items.item;
        if (items) {  // items가 존재하면 map 함수를 실행
          const newData = items.map((item) => ({
            imageUrl: item.firstimage || 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D',
            title: item.title.replace(/\(.*\)/, ''),
          }));

          setList(newData);
        } else {
          console.log('No items found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedSubCategory]);

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
                  setList(list);
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
            {list.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.listItem} 
                onPress={() => navigation.navigate('Detail')}
              >
                <View style={styles.listInfo}>
                  <Image source={{ uri: item.imageUrl }} style={styles.listItemImage} />
                  <View style={styles.listText}>
                    <Text>{item.title}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                style={[styles.heartIcon, { marginLeft: -18 }]}
                onPress={() => setSelectedItems(prevState => ({ ...prevState, [index]: !prevState[index] }))}>
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
    paddingHorizontal: 13,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  subSelectedButton: {
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
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
    marginRight: 10,
    flex:1,
  },
  listItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});