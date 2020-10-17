import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import EnterCode from './src/components/EnterCode';
import Quiz from "./src/components/Quiz";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" >
          {props => <EnterCode {...props} link="Classroom"/>}
        </Stack.Screen>
        <Stack.Screen name="Classroom">
          {props => <EnterCode {...props} link="Quiz"/>}
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
