import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const My = () => {
    return (
        <View style={styles.container}>
            <Text>My</Text>
        </View>
    )
}

export default My

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  