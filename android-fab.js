import React from 'react';

import {
  View,
  PanResponder,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const baselineGrid = 8;

const metrics = {
  baselineGrid,
  screenEdgeMarginHorizontal: baselineGrid * 2,
  gutterHorizontal: baselineGrid * 2,
  gutterVertical: baselineGrid * 2,
  toolbarHeight: baselineGrid * 7,
  fabSize: baselineGrid * 7,
  fabIconSize: baselineGrid * 3,
  fabSizeMini: baselineGrid * 5,
  elevation: {
    appBar: 4,
    fabResting: 6,
    fabPressed: 12,
    dialog: 24,
  },
};

// A class component is required for Animated.createAnimatedComponent() to work properly
class Fab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { pressed: false };
  }
  _setPressed(pressed: boolean) {
    this.setState({ pressed });
  }
  render() {
    const { backgroundColor, iconColor, style, icon, onPress } = this.props;
    const elevation = {
      elevation: this.state.pressed ? metrics.elevation.fabPressed : metrics.elevation.fabResting
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={this._setPressed.bind(this, true)}
        onPressOut={this._setPressed.bind(this, false)}
        onPress={onPress}
        style={[fabStyle(backgroundColor), this.props.style, elevation]} >
        <Icon name={icon} size={metrics.fabIconSize} color={iconColor || 'white'} />
      </TouchableOpacity>
    );
  }
}

const fabStyle = (backgroundColor = 'white') => ({
  width: metrics.fabSize,
  height: metrics.fabSize,
  borderRadius: metrics.fabSize / 2,
  backgroundColor,
  elevation: metrics.elevation.fabResting,
  justifyContent: 'center',
  alignItems: 'center',
});

export default Fab;
