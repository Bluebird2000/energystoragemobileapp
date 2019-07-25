import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native';

import { Button, Text, CreateDivElement} from '../components';
import { theme } from '../constants';


class Verification extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {}
  
  render() {
    const { navigation } = this.props;
    return (
      <CreateDivElement> 
        <CreateDivElement center bottom flex={0.4} >
          <Text h1 center bold>
            Your account has been successfully verified
          </Text>
        </CreateDivElement>
        <CreateDivElement middle flex={0.5} margin={[0, theme.sizes.padding * 1]}>
          <Button style={styles.loginAction} onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>Login</Text>
          </Button>
        </CreateDivElement>
      </CreateDivElement>
    )
  }
}


export default Verification;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  loginAction: {
    backgroundColor: '#00b1ac'
  },
  backgroundLanding:{
    backgroundColor: '#ffffff'
  }
})
 
