import React, { Component } from 'react'
import {Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, AsyncStorage } from 'react-native'
import axios from 'axios';
import { Button, Input, CreateDivElement, Text } from '../components';
import { theme } from '../constants';

export default class LoginController extends Component {
  state = { email: null, password: null,  errors: [], loading: false, userData: {} }

  componentDidMount() {
    this._getUserToken();
  }

  async _storeUserToken(user) {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      alert("Something went wrong", error);
    }
  }

  async _getUserToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  } 


  async _destroySession(user) {
      try {
        await AsyncStorage.removeItem(user);
        return true;
      }
      catch(exception) {
        return false;
      }
  }

  // async _destroySession(user) {
  //   try {
  //     let userData = await AsyncStorage.removeItem("userData");
  //     let data = JSON.parse(userData);
  //     console.log(data);
  //   } catch(error) {
  //     console.log('something went wrong deleting user session');
  //   }
  // }

  async handleLogin() {
    const { navigation } = this.props;
    const { username, password } = this.state;
    const errors = [];
    let payload = { username, password };
    const baseUrl = 'http://192.168.15.254:7000/v1/energy/auth/login';    

    Keyboard.dismiss();

    if (!username) errors.push('username');
    if (!password) errors.push('password');
    this.setState({ errors, loading: false });   

    if (!errors.length) {
      this.setState({ loading: true });
     await this.authenticateUserLoginDetails(payload, baseUrl, navigation);
    }

  }

  async authenticateUserLoginDetails(payload, baseUrl, navigation) {
    await axios({
        url: baseUrl,
        method: "post",
        data: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        this._storeUserToken(JSON.stringify(response.data.data));
          Alert.alert(
          'Success!',
          'successfully logged in',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('DashBoard')
              }
            }
          ],
          { cancelable: false }
        );
        this.setState({ loading: false });
      }).catch(error => {
          Alert.alert(
          '',
          'invalid credentials',
          [
            {
              text: 'Try again', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        );
        this.setState({ loading: false });
      })
  }
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <CreateDivElement padding={[0, theme.sizes.base * 3]}>
          {/* <Text h1 bold>Login</Text> */}
            <CreateDivElement center bottom flex={0.4} >
            <Text h1 center bold>
              Wattbank For Your
              <Text h1 primary> Home</Text>
            </Text>
          </CreateDivElement>
          <CreateDivElement middle>
            <Input
              label="Email"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text.trim() })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text.trim() })}
            />
            <Button style={styles.btnActionActive} onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Login</Text>
              }
            </Button>

            <Button  style={styles.btnActionNonActive} onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </CreateDivElement>
        </CreateDivElement>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  btnActionActive: {
    backgroundColor: '#07b8ae'
  },
  btnActionNonActive: {
    backgroundColor: '#eeeeee'
  },
})
