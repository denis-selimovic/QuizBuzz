import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from "expo";
import * as Font from 'expo-font';

import EnterCode from "./src/EnterCode";
import Quiz from "./src/Quiz";

const Stack = createStackNavigator();

class App extends React.Component {

  state = {
    theme: null,
    currentTheme: null,
    isReady: false,
  };

  changeTheme = (theme, currentTheme) => {
    this.setState({ theme, currentTheme });
  };

  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require(`@ant-design/icons-react-native/fonts/antfill.ttf`)
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }

  render() {
    const { theme, currentTheme, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" >
            {props => <EnterCode {...props} link="Classroom" buttonText="Enter classroom" />}
          </Stack.Screen>
          <Stack.Screen name="Classroom">
            {props => <EnterCode {...props} link="Quiz" buttonText="Enter quiz" />}
          </Stack.Screen>
          <Stack.Screen name="Quiz">
            {props => <Quiz {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
