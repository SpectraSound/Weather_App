import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';




const App = () => {
  const [cities,setCities] = useState([]);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{headerTitleAlign:"center"}}>
          {props => <HomeScreen {...props} cities={cities} setCities={setCities}/>}
        </Stack.Screen>
        <Stack.Screen name="Search" options={{headerTitleAlign:"center"}}>
          {props => <SearchScreen {...props} setCities={setCities} cities={cities}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;