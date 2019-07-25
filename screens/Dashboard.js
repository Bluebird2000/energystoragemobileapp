import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';

const { width } = Dimensions.get('window');

class DashBoard extends Component {
  state = {
    active: 'Products',
    httpMock: [],
  }

  componentDidMount() {
    this.setState({ httpMock: this.props.httpMock });
  }

  handleTab = tab => {
    const { httpMock } = this.props;
    const filtered = httpMock.filter(
      category => category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, httpMock: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, navigation } = this.props;
    const { httpMock } = this.state;
    const tabs = ['Units', 'View-consumption', 'Connected-devices'];

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold> DashBoard </Text>
          <Button onPress={() => navigation.navigate('Settings')}>
            <Image
              // source={profile.avatar}
              style={styles.avatar}
            />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block flex={false} row space="between" style={styles.httpMock}>
            {httpMock.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Units', { category })}
              >
                <Card center middle shadow style={styles.category}>
                <Text medium height={20}>{category.name}</Text>
                  <Text gray caption>{category.count} products</Text>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image source={category.image} />
                  </Badge>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

DashBoard.defaultProps = {
  profile: mocks.profile,
  httpMock: mocks.httpMock,
}

export default DashBoard;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  httpMock: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  }
})
