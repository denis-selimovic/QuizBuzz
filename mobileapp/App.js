import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
//import { BASE_URL } from "@env";
//import axios from "axios";

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

  sendClassroomCode = async (code, callback) => {
    //"/enter"
    //const body = { code: code };
    //console.log(body);

    //poslati zahtjev
    //const response = await axios.post(`${BASE_URL}/classrooms/enter`, body);

    //ovo je odgovor sa servera
    const responseBody = { classroomId: "123" }
    callback(responseBody.classroomId);
  }

  sendQuizCode = (code, callback, classroomId) => {
    // console.log("URL");
    // console.log(BASE_URL);
    //console.log(code);
    //console.log(classroomId);
    callback();
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
            {props => <EnterCode {...props} link="Classroom" buttonText="Enter classroom"
              inputPlaceholder="Classroom code" sendCode={this.sendClassroomCode} />}
          </Stack.Screen>
          <Stack.Screen name="Classroom">
            {props => <EnterCode {...props} link="Quiz" buttonText="Enter quiz"
              inputPlaceholder="Quiz key" sendCode={this.sendQuizCode} />}
          </Stack.Screen>
          <Stack.Screen name="Quiz">
            {props => <Quiz {...props} status={-1} code={1} date={Date.now() + 60 * 1000} duration={120 * 1000}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
