import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "./src/config/firebase";

import Notification from './components/Notifications'
import QuizScreen from './components/QuizScreen';
import HomeScreen from './components/HomeScreen';
import ScoreScreen from './components/ScoreScreen';
import StartScreen from './components/StartScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Notification />
      <Stack.Navigator>
      <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}