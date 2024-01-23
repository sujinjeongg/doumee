import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from 'react-native';

import Home from './src/BottomTab/Home';
import Like from './src/BottomTab/Like';
import My from './src/BottomTab/My';
import Detail from './src/Stack/Detail';
import MyPlan from './src/Stack/MyPlan';
import NewPost from './src/Stack/NewPost';
import Search from './src/Stack/Search';
import PostDetail from './src/Stack/PostDetail';
import { DataProvider } from './src/Stack/DataContext';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator()

export default function App() {

  const [data, setData] = useState([]);

  return (
    <DataProvider value={{ data, setData }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconImagePath;
            if (route.name === 'Home') {
              iconImagePath = focused
                ? require('./selected_home.png')
                : require('./home.png');
            } else if (route.name === 'Like') {
              iconImagePath = focused
                ? require('./selected_heart.png')
                : require('./heart.png');
            } else if (route.name === 'My') {
              iconImagePath = focused
                ? require('./selected_my.png')
                : require('./my.png');
            }

            // Return the custom icon component
            return <Image source={iconImagePath} style={{ width: 24, height: 24, tintColor: color }} />;
          },
          
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          showLabel: false, // Hide all tab labels
        }}
      >
        <Tab.Screen name='Home' component={HomeStackNavigator} />
        <Tab.Screen name='Like' component={LikeStackNavigator} />
        <Tab.Screen name='My' component={MyStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
    </DataProvider>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={Home} options={{headerShown: false}}/>
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  )
}

function LikeStackNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen name='LikeScreen' component={Like} options={{headerShown: false}}/>
    <Stack.Screen name='Detail' component={Detail} />
  </Stack.Navigator>
  );
}

function MyStackNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen name='MyScreen' component={My} options={{headerShown: false}} />
    <Stack.Screen name='Detail' component={Detail} />
    <Stack.Screen name='MyPlan' component={MyPlan} />
    <Stack.Screen name="NewPost" component={NewPost} />
    <Stack.Screen name="PostDetail" component={PostDetail} />
  </Stack.Navigator> 
    );
}