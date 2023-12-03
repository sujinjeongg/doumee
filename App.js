import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from './src/BottomTab/Home';
import Like from './src/BottomTab/Like';
import My from './src/BottomTab/My';
import Detail from './src/Stack/Detail';

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name='Home' 
      component={HomeStackNavigator} 
      />
      <Tab.Screen 
      name='Like' 
      component={LikeStackNavigator} 
      />
      <Tab.Screen 
      name='My' 
      component={MyStackNavigator}
      />
    </Tab.Navigator>
  )
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={Home} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

function LikeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LikeScreen' component={Like} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

function MyStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyScreen' component={My} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

export default function App () {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  )
}