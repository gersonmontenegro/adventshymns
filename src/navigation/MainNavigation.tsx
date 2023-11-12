import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Hymns} from '../screens/Hymns';
import {Demo} from '../screens/Demo';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Demo" component={Demo} />
    <Stack.Screen name="Hymns" component={Hymns} />
  </Stack.Navigator>
);
