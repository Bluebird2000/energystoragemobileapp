import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Input, CreateDivElement, Text } from '../components';

import { theme } from '../constants';

const VALID_EMAIL = "ahmad.saka@photizzo.com";

export default class Forgot extends Component {
  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false,
  }

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Password sent!',
        'Please check you email.',
        [
          {
            text: 'OK', onPress: () => {
              navigation.navigate('Login')
            }
          }
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Error',
        'Please check you Email address.',
        [
          { text: 'Try again', }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <CreateDivElement padding={[0, theme.sizes.base * 3]}>
          {/* <Text h1 bold>Forgot</Text> */}
          <CreateDivElement center bottom flex={0.4} >
            <Text h1 center bold>
              Wattbank For Your
              <Text h1 primary> Home</Text>
            </Text>
          </CreateDivElement>
          <CreateDivElement middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button style={styles.btnActionActive} onPress={() => this.handleForgot()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Forgot</Text>
              }
            </Button>

            <Button style={styles.btnActionNonActive} onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </CreateDivElement>
        </CreateDivElement>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  forgot: {
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
