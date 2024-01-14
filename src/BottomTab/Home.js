import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'

const Home = () => {
  const navigation = useNavigation()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [list, setList] = useState([]);
  const [images, setImages] = useState([]);

  // 랜덤 대표 사진 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://apis.data.go.kr/B551011/EngService1/areaBasedList1?ServiceKey=Z9i%2FG23AAyO%2FKACx3%2FCqrazOIGPcsirEV5BX8bIGu%2BXobx%2FutIU%2B91xpvHGOsN6t1M0YYdRVTSeK%2FTw68VZMCg%3D%3D&MobileOS=ETC&MobileApp=TestApp&_type=json`
        );

        const items = response.data.response.body.items.item;
        if (items) {  
          let imagesArr = items.map(item => item.firstimage).filter(image => image !== null && image.trim() !== ''); // null이거나 빈 문자열인 이미지 제거
          imagesArr.sort(() => Math.random() - 0.5);
          const selectedImages = imagesArr.slice(0, 4);
          setImages(selectedImages);
        } else {
          console.log('No items found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const scrollViewRef = useRef(null);
  const scrollPositionRef = useRef(0);
  let imageWidth = 320;
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollPositionRef.current >= images.length * imageWidth) {
        scrollPositionRef.current = 0;
      }
      
      scrollViewRef.current.scrollTo({ x: scrollPositionRef.current, animated: true });
      scrollPositionRef.current += imageWidth;
    }, 3000);
  
    return () => clearInterval(intervalId);
  }, [images.length]);
  
  const categories = {
    CITY: ['Street', 'Building', 'Tower'],
    NATURE: ['Mountain', 'Beach', 'Forest'],
    HISTORY: ['Museum', 'Monument', 'Statue'],
    CULTURE: ['Sports', 'Music', 'Art'],
  };

  // Category List API
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
            listItemImage: item.firstimage || 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZED8MXx8fGVufDB8fHx8fA%3D%3D',
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
                onPress={() => navigation.navigate('Detail', { location: item.title})}
              >
                <View style={styles.listInfo}>
                  <Image source={{ uri: item.listItemImage }} style={styles.listItemImage} />
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
    width: 320,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoryContainer: {
    paddingTop: 13,
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