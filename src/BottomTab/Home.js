import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation()
    
    return (
        <View style={styles.container}>
            <Text>Main Page</Text>
            <Text
              onPress={() => navigation.navigate('Detail')}
            >Go to Detail screen</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  