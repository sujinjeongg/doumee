import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const My = () => {
  const navigation = useNavigation();

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

  return (

    <View style={styles.container}>
       <View style={styles.profileIcon}>
        <Image source={require('./profile.png')} style={styles.profileImage} />
        <Text style={styles.myPlanText}>My Plan</Text>
      </View>
      <View style={styles.plusIcon}>
        <Image source={require('./plus.png')} style={styles.plusImage} />
      </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.folderList}>
          {folders.map((folder, index) => (
            <View key={index} style={styles.folderItem}>
              <Image source={folder.image} style={styles.folderImage} />
              <Text style={styles.folderInfo}>{`${folder.name} ${folder.items} items`}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.header}></View>
        <Text style={styles.recordText}>Record</Text>
        
        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('NewPost')}>
          <Image source={require('./edit.png')} style={styles.editImage} />
        </TouchableOpacity>
          
      <ScrollView contentContainerStyle={styles.postList}>       
        <View style={styles.postsContainer}>
          {posts.map((post) => (
             <TouchableOpacity key={post.id} onPress={() => navigation.navigate(`Post${post.id}`)} activeOpacity={0.9}>
            <View key={post.id} style={styles.postContainer}>
              <View style={styles.postContent}>
                <Image source={post.image} style={styles.postImage} />
                <Text style={styles.postText}>{post.text}</Text>
              </View> 
            </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 110,
    marginBottom: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 60,
    left: 25,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  myPlanText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 22,
  },
  plusIcon: {
    position: 'absolute',
    top: 110,
    right: 25,
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  folderList: {
    marginTop: 150,
    marginLeft: 20,
    marginBottom: -70,
  },
  folderItem: {
    marginRight: 10,
  },
  folderImage: {
    width: 100,
    height: 100,
    borderRadius: 10, // 모서리 둥글게
    resizeMode: 'contain',
  },
  folderInfo: {
    marginTop: 150,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recordText: {
    fontWeight: 'bold',
    fontSize: 22,
    position: 'absolute',
    top: 305,
    left: 25,
  },
  editIcon: {
    position: 'absolute',
    top: 305,
    right: 25,
  },
  editImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  
  postList: {
    flexGrow: 1,
    marginTop: 5,
    paddingTop: 5, // Adjust as needed for spacing
  },
  postsContainer: {
    alignItems: 'center',
  },
  postContainer: {
    marginBottom: 20, // Adjust as needed
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
    maxWidth: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContent: {

    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImage: {
    width: 250,
    height: 150,
    borderRadius: 15,
    marginBottom: 12,
  },
  postText: {
    fontSize: 13,
    flexShrink: 1,
    textAlign: 'center',
  },
});

export default My;