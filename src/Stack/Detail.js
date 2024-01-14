import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
const emptyHeartIcon = require('./empty_heart.png')
const filledHeartIcon = require('./filled_heart.png')
const saveIcon = require('./save.png')

const Detail = ({route}) => {
    const [isLiked, setIsLiked] = useState(false)
    const navigation = useNavigation()
    const [selectedMenu, setSelectedMenu] = useState('Details'); //초기에는 'Details'
    const [locationText, setLocationText] = useState('')
    const [details, setDetails] = useState([]);

    const toggleLike = () => {
        setIsLiked(!isLiked)
    };

    const handleSave = () => {
        //저장 버튼을 눌렀을 때의 동작 추가
    }

    // 화면이 focus 될 때마다 실행
    useFocusEffect(
        React.useCallback(() => {
            navigation.setOptions({
                headerTitle: '',
                headerRight: () => (
                    <View style={styles.headerRight}>
                    <TouchableOpacity onPress={toggleLike}>
                        <Image 
                            source={isLiked ? filledHeartIcon : emptyHeartIcon}
                            style={styles.heartIcon} 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave}>
                        <Image
                        source={saveIcon}
                        style={styles.saveIcon}
                        />
                    </TouchableOpacity>
                    </View>
                ),
            });
        }, [isLiked])
    );

    // Location API
    useEffect(() => {
        console.log('Location:', route.params?.location);
        setLocationText(route.params?.location || '');
      }, [route.params?.location]);       

    //Details Content API
    useEffect(() => {
      const keyword = encodeURIComponent(route.params?.location); //아래 url에서 띄어쓰기가 포함된 것도 keyword로 사용할 수 있도록 함 

      const fetchData = async () => {
        try {
          // API 호출
          const response = await axios.get(
            `http://apis.data.go.kr/B551011/EngService1/searchKeyword1?ServiceKey=n2%2FFPg6H7Z52OAEFmtjTXCKNBHBZ08uUGljVTQWijKC6GeuQTWMSEzDB8XwQbIIE69%2BgM7AIokqvH6opUKYrGg%3D%3D&arrange=O&contentTypeId=76&keyword=${keyword}&MobileOS=AND&MobileApp=doumee&_type=json`
          );

          // 받아온 데이터를 사용하여 주소, 전화번호, 숙소명을 설정
          const items = response.data.response.body.items.item;
          if (items) {  // items가 존재하면 map 함수를 실행
            const newData = items.map((item) => ({
              detailsAddr: item.addr1,
              detailsTel: item.tel,
              detailsImage: item.firstimage , //location image 자리에 잠시 사용해봄
            }));

            setDetails(newData);
          } else {
            console.log('No items found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

     fetchData();
    }, []);
    
    const renderContent = () => {
        if (selectedMenu === 'Details') {
          return (
            <View style={styles.content}>
              {details.map((item, index) => (
                <View key={index}>
                  <Text style={{ fontWeight: 'bold' }}>Address</Text>
                  <Text>{item.detailsAddr}{'\n'}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Phone</Text>
                  <Text>{item.detailsTel}</Text>
                </View>
              ))}
            </View>
          );
        } else if (selectedMenu === 'Information') {
          return (
            <View style={styles.content}>
              <Text>Information Content</Text>
            </View>
          );
        } else if (selectedMenu === 'Stay') {
          return (
            <View style={styles.content}>
              <Text>Stay Content</Text>
            </View>
          );
        }
      };   

    return (
        <View style={styles.container}>  
            {details.map((item, index) => ( 
          <Image key={index} source={{ uri: item.detailsImage }} style={styles.image} />
        ))}
          
        <View style={styles.locationContainer}>
            <Text style={styles.location}>{locationText}</Text>
        </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => setSelectedMenu('Details')}>
               <Text style={[styles.menuText, selectedMenu === 'Details' && styles.selectedMenu]}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedMenu('Information')}>
               <Text style={[styles.menuText, selectedMenu === 'Information' && styles.selectedMenu]}>Information</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedMenu('Stay')}>
               <Text style={[styles.menuText, selectedMenu === 'Stay' && styles.selectedMenu]}>Stay</Text>
            </TouchableOpacity>
        </View>
    {renderContent()} 
        </View>
    );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        marginRight: 10,
    },
    heartIcon: {
        width: 30,
        height: 30,
        marginRight: 15, // 아이콘이 뒤로 가기 버튼과 같은 높이에 위치하도록 마진 설정
    },
    saveIcon: {
        width: 35,
        height: 30,
    },
    image: {
        width: 260,
        height: 280,
        borderRadius: 15, // 둥근 모서리 적용
        marginStart: 10,
    },
    locationContainer: {
        position: 'absolute',
        bottom: 260, 
        left: 20,
    },
    location: {
        fontWeight: 'bold',
        fontSize: 20,
        top: 9,
        marginStart: 7,
        marginBottom: -15,
    },
    content: {
       top: 55,
        marginBottom: 100,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 80,
        marginBottom: 60,
        paddingHorizontal: 10,
    },
    menuText: {
        fontSize: 18,
        marginStart:34,
        marginEnd:28,
        marginLeft: 38,
        paddingBottom: 6,
    },
    selectedMenu: {
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

});