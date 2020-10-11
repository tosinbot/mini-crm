import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoginScreen from './screens/Login';
import NotepadScreen from './screens/Notepad'
import DashbordScreen from './screens/Dashbord'

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login', headerShown:false  }} />
          <Stack.Screen name="Dashbord" component={DashbordScreen} options={{ title: 'Dashbord', headerShown:false }} />
          <Stack.Screen name="Notepad" component={NotepadScreen} options={{ title: 'Notepad', headerShown:false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}