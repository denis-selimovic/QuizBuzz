import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EnterCode from './src/components/EnterCode';

export default function App() {
  return (
    <View style={styles.container}>
      <EnterCode text={"Enter classroom"}></EnterCode>
    </View>
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
