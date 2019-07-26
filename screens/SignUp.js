import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, Input, CreateDivElement, Text } from '../components';
import { theme } from '../constants';

export default class SignUp extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    wattbankSN: null,
    errors: [],
    loading: false,
  }

  handleSignUp() {
    const baseUrl = 'http://41.58.77.220:7000/v1/energy/auth/register';
    const { navigation } = this.props;
    const errors = [];
    //creating data object to be sent to API
    const { firstName, lastName, email, password, wattbankSN } = this.state;
    const payload = { firstName, lastName, email, password, wattbankSN }
    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!firstName) errors.push('firstName');
    if (!lastName) errors.push('lastName');
    if (!email) errors.push('email');
    if (!password) errors.push('password');
    if (!wattbankSN) errors.push('wattbankSN');

    this.setState({ errors, loading: false });

    if (!errors.length) {
      axios({
        url: baseUrl,
        method: "post",
        data: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => { Alert.alert( 'Success!' + response, 'Your account has been created', [{ text: 'Continue', onPress: () => { navigation.navigate('Verification') } }],
          { cancelable: false })
          }).catch(error => {
            Alert.alert('Error!' + error, 'Network Error', [{ text: 'Continue', onPress: () => { navigation.navigate('') } }], { cancelable: false })
          })
      
      // axios({
      //   url: baseUrl,
      //   method: "post",
      //   data: payload,
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // }).then(response => {
      //   console.log(2, response);
      //   Alert.alert(
      //   'Success!',
      //   'Your account has been created',
      //   [
      //     {
      //       text: 'Continue', onPress: () => {
      //         navigation.navigate('Verification')
      //       }
      //     }
      //   ],
      //   { cancelable: false }
      // )
      // }).catch(error => {
      //   console.log(1, error.response);
      // })
      // Alert.alert(
      //   'Success!',
      //   'Your account has been created',
      //   [
      //     {
      //       text: 'Continue', onPress: () => {
      //         navigation.navigate('Verification')
      //       }
      //     }
      //   ],
      //   { cancelable: false }
      // )
    }



  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <ScrollView  style={{ marginTop: 25 }}>
      <KeyboardAvoidingView behavior="padding">
        <CreateDivElement padding={[0, theme.sizes.base * 3]}>
        <CreateDivElement center bottom flex={0.4} >
          <Text h1 center bold>
            Wattbank For Your
            <Text h1 primary> Home</Text>
          </Text>
        </CreateDivElement>
          <CreateDivElement middle>
            <Input
              label="Firstname"
              error={hasErrors('firstName')}
              style={[styles.input, hasErrors('firstName')]}
              defaultValue={this.state.firstName}
              onChangeText={text => this.setState({ firstName: text })}
            />
            <Input
              label="Lastname"
              error={hasErrors('lastName')}
              style={[styles.input, hasErrors('lastName')]}
              defaultValue={this.state.lastName}
              onChangeText={text => this.setState({ lastName: text })}
            />
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Input
              label="WattbankSN"
              error={hasErrors('wattbankSN')}
              style={[styles.input, hasErrors('wattbankSN')]}
              defaultValue={this.state.wattbankSN}
              onChangeText={text => this.setState({ wattbankSN: text })}
            />
            <Button style={styles.btnActionActive} onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up</Text>
              }
            </Button>

            <Button  style={styles.btnActionNonActive} onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </CreateDivElement>
        </CreateDivElement>
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
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
