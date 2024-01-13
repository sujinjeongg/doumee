import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
const emptyHeartIcon = require('./empty_heart.png')
const filledHeartIcon = require('./filled_heart.png')
const saveIcon = require('./save.png')

const Detail = () => {
    const [isLiked, setIsLiked] = useState(false)
    const navigation = useNavigation()
    const [selectedMenu, setSelectedMenu] = useState('Details'); //초기에는 'Details'

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

    const renderContent = () => {
        if (selectedMenu === 'Details') {
            return (
                <View style={styles.content}>
                <Text>Details Content</Text>
                </View>
            )
        } else if (selectedMenu === 'Information') {
            return (
                <View style={styles.content}>
                    <Text>Information Content</Text>
                </View>
            )
        } else if (selectedMenu === 'Restaurant') {
            return (
                <View style={styles.content}>
                    <Text>Restaurant Content</Text>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Image
                    source={require('./haeundae1.png')}
                    style={styles.image}
                />
                <Image
                    source={require('./haeundae2.png')}
                    style={styles.image}
                />
                <Image
                    source={require('./haeundae3.png')}
                    style={styles.image}
                />
                <Image
                    source={require('./haeundae4.png')}
                    style={styles.image}
                />
                <Image
                    source={require('./haeundae5.png')}
                    style={styles.image}
                />
            </ScrollView>

            <View style={styles.locationContainer}>
                <Text style={styles.location}>Haeundae - Busan</Text>
            </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => setSelectedMenu('Details')}>
               <Text style={[styles.menuText, selectedMenu === 'Details' && styles.selectedMenu]}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedMenu('Information')}>
               <Text style={[styles.menuText, selectedMenu === 'Information' && styles.selectedMenu]}>Information</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedMenu('Restaurant')}>
               <Text style={[styles.menuText, selectedMenu === 'Restaurant' && styles.selectedMenu]}>Restaurant</Text>
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
        marginStart: 50,
        marginHorizontal: -10,
    },
    locationContainer: {
        position: 'absolute',
        bottom: 260,
        left: 20,
    },
    location: {
        fontWeight: 'bold',
        fontSize: 20,
        marginStart: 5,
    },
    content: {
        marginBottom: 110,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 80,
        paddingHorizontal: 10,
    },
    menuText: {
        fontSize: 18,
        marginStart:18,
        marginEnd:18,
        marginLeft: 23,
        paddingBottom: 6,
    },
    selectedMenu: {
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

});