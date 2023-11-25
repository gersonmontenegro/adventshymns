import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Hymns} from '../screens/Hymns';
import {Demo} from '../screens/Demo';
import {HymnDetail} from '../screens/hymn-detail/HymnDetail';
import {RootStackParamList} from '../utils/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Demo" component={Demo} />
    <Stack.Screen name="Hymns" component={Hymns} />
    <Stack.Screen name="HymnDetail" component={HymnDetail} />
  </Stack.Navigator>
);
