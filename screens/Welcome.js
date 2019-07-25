import React, { Component } from 'react'
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';

import { Button, CreateDivElement, Text } from '../components';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}>
        <CreateDivElement padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
          <Text h2 light>Terms of Service</Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              1. The Wattbank U provides uninterrupted power supply by switching automatically to battery supply mode in the event of power failure. 
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              2. The warranty cover for Wattbank U is a one year period, provided the seal is not broken and there is no physical damage to the unit
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              3. Typical use mode for the Wattbank U is to keep the unit turned on and connected to a power source while in use (either an extension is connected to the output of the unit or the device is connected directly).
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              4. The Wattbank U does not come with an external charging module as it has it is in-built charger. The Wattbank U connected to a power source while in use is charging automatically. 
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              5. Your appliances will love the pure sine wave output of Wattbank U+ which gives them longer life
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              6. Wattbank U+ protects your appliances by CreateDivElementing voltage surges and short circuits through its in-built safety mechanisms
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              7. The Wattbank U+ operates in uninterruptible power supply mode, hence if there is a grid outage / power failure, the Wattbank U+ continuously supplies power without any noticeable break
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              8. Wattbank U+ can be charged via solar panels. The Wattbank U+ supplies your appliance directly when there is solar power and stores the excess in the integrated battery
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              9. Wattbank U+ uses lithium ion battery technology which is safe for environment
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              10. Wattbank S protects your appliances by CreateDivElementing voltage surges and short circuits through its in-built safety mechanisms
            </Text>
          </ScrollView>

          <CreateDivElement middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showTerms: false })}>
              <Text center white>I understand</Text>
            </Button>
          </CreateDivElement>
        </CreateDivElement>
      </Modal>
    )
  }

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }])
        }
      />
    )
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <CreateDivElement row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <CreateDivElement
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          )
        })}
      </CreateDivElement>
    )
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <CreateDivElement> 
        <CreateDivElement center bottom flex={0.4} >
          {/* <Text h1 center bold>
            Energy storage for your
            <Text h1 primary> Home</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Making electronics manufacturing unbiquitous
          </Text> */}
        </CreateDivElement>
        {/* <CreateDivElement center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </CreateDivElement> */}
        <CreateDivElement middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button style={styles.loginAction} onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>Login</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text center semibold>Signup</Text>
          </Button>
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>Terms of service</Text>
          </Button>
        </CreateDivElement>
        {this.renderTermsService()}
      </CreateDivElement>
    )
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/wattbanks-plus.png') },
    { id: 2, source: require('../assets/images/wattbank-ss.png') },
    { id: 3, source: require('../assets/images/wattbank.png') },
    { id: 4, source: require('../assets/images/wattbanku-plus.png') },
  ],
};

export default Welcome;

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
 
