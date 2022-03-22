import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react'
import Home from './Component/Home';
import Detail from './Component/Detail';
import Weather from './Component/Weather';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>

    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} options={{headerShown: false}}/>
      <Stack.Screen name="Weather" component={Weather} options={{headerShown: false}} />
    </Stack.Navigator>
    </NavigationContainer>

  );
}

export default MyStack;