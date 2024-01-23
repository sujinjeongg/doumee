import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const PostDetail = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <View style={{ marginTop: 20 }}>
        {post.title && (
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
            {post.title}
          </Text>
        )}
        {post.content.map((item, index) => (
          <View key={index}>
            {item.type === 'image' && (
              <Image
                source={{ uri: typeof item.value === 'string' ? item.value : item.value.uri }}
                style={{ width: 300, height: 200, borderRadius: 5, marginBottom: 10 }}
              />
            )}
            {item.type === 'text' && (
              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                {item.value}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PostDetail;
