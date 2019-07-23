import React, { Component } from 'react'
import {Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import axios from 'axios';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

export default class LoginController extends Component {
  state = {
    email: null,
    password: null,
    errors: [],
    loading: false,
  }

  handleLogin() {
    const { navigation } = this.props;
    const { username, password } = this.state;
    const errors = [];
    let payload = { username, password };

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (!username) errors.push('username');
    if (!password) errors.push('password');

    this.setState({ errors, loading: false });

    if (!errors.length) {
      // navigation.navigate("");
      axios({
        url: "https://p-user-api-dev.quabbly.com/v1/auth/login",
        method: "post",
        data: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
          Alert.alert(
          'Success!',
          'successfully logged in',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Verification')
              }
            }
          ],
          { cancelable: false }
        )
      }).catch(error => {
          Alert.alert(
          'Failure!',
          'invalid credentials',
          [
            {
              text: 'Try again', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        )
      })
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          {/* <Text h1 bold>Login</Text> */}
          <Block middle>
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
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Login</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
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
  }
})
