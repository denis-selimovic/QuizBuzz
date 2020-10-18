import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import EnterCode from "./src/EnterCode";
import Quiz from "./src/Quiz";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" >
            {props => <EnterCode {...props} link="Classroom" buttonText="Enter classroom"/>}
          </Stack.Screen>
          <Stack.Screen name="Classroom">
            {props => <EnterCode {...props} link="Quiz" buttonText="Enter quiz"/>}
          </Stack.Screen>
          <Stack.Screen name="Quiz">
            {props => <Quiz {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
