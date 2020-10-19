import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { BASE_URL } from "@env";
import axios from "axios";

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
    ).catch(e => console.log(e));

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require(`@ant-design/icons-react-native/fonts/antfill.ttf`)
    ).catch(e => console.log(e));
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }

  sendClassroomCode = async (code, callback, errorCallback) => {
    try {
      const body = { code };
      const response = await axios.post(`${BASE_URL}/classrooms/enter`, body);
      callback({ classroomId: response.data.classroomId });
    } catch (error) {
      let errMsg = "Something went wrong, try that again."

      if (error.response && error.response.status === 400) {
        errMsg = "Invalid classroom code.";
      }

      errorCallback(errMsg);
    }
  }

  sendQuizCode = async (code, callback, errorCallback, classroomId) => {
    try {
      const response = await axios.get(`${BASE_URL}/quizzes?code=${code}&classroomId=${classroomId}`);
      callback({ status: 0, code, date: response.data.date, duration: response.data.duration });
    } catch (error) {
      this.handleError(errorCallback, callback, error, code);
    }
  }

  handleError = (errorCallback, callback, error, code) => {
    if (error.response) {
      if (error.response.status === 404) {
        callback({
          status: error.response.data.status, code,
          date: error.response.data.date, duration: error.response.data.duration
        });
      } else {
        errorCallback("Invalid quiz key");
      }
    } else {
      errorCallback("Something went wrong, try that again.");
    }
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
            {props => <Quiz {...props}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
