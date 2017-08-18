/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';

arr = () => {
  let a = [];
  for(let x=0; x<50; x++) {
    a.push('Array Element ' + x)
  }
  return a;
}

export default class Animations extends Component {

  constructor() {
    super();

    this.state = {
      scroll: null,
      navHeight: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
    }
  }
  key = 0;
  keyx = 0;
  offset = 0;
  gesture = 'up';
  showHideNavbar = (v) => {
    console.log('Trying to animate to height ', v)
    Animated.spring(
      this.state.navHeight,
      {
        toValue: v,
        delay: 0,
      }
    ).start();
  }
  renderItem = ({ item }) => (
    <View style={{ margin: 10, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20 }}>{item}</Text>
    </View>
  );

  onScrollHandler = (e) => {
    let currentOffset = e.nativeEvent.contentOffset.y;
    if (currentOffset <= 0) {
      this.showHideNavbar(0)
      return;
    }
    let currentGesture = currentOffset > this.offset ? 'down' : 'up';
    // console.log(currentffset)
    console.log(currentGesture, this.gesture);
    if (this.gesture !== currentGesture) {
      console.log('animating');
      if (currentGesture === 'up')
        this.showHideNavbar(0);
      else
        this.showHideNavbar(-50);
    }

    this.gesture = currentGesture;
    this.offset = currentOffset;

  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor={'rgba(1,1,1,1)'} />
        <FlatList
          data={arr()}
          renderItem={this.renderItem}
          keyExtractor={() => this.key++}
          onScroll={this.onScrollHandler}
        />
        <Animated.View style={{ justifyContent: 'center', paddingLeft: 15, backgroundColor: 'rgba(1,0,0,0.95)', top: this.state.navHeight, height: 50, position: 'absolute', left: 0, right: 0, elevation: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>CAED</Text>
        </Animated.View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  newContainer: {
    top: 0,
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('Animations', () => Animations);
