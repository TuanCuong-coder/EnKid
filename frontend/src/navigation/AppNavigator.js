import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import GameMenuScreen from '../screens/GameMenuScreen';
import RewardScreen from '../screens/RewardScreen';
import ChonHinhScreen from '../screens/ChonHinhScreen';
import ChonTuScreen from '../screens/ChonTuScreen';
import KeoThaScreen from '../screens/KeoThaScreen';
import NgheScreen from '../screens/NgheScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GameMenu" component={GameMenuScreen} />
      <Stack.Screen name="ChonHinh" component={ChonHinhScreen} />
      <Stack.Screen name="ChonTu" component={ChonTuScreen} />
      <Stack.Screen name="KeoTha" component={KeoThaScreen} />
      <Stack.Screen name="Nghe" component={NgheScreen} />
      <Stack.Screen name="Reward" component={RewardScreen} />
    </Stack.Navigator>
  );
}
