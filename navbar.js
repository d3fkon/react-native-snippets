import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Platform, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Constants {
    static AppbarHeight = Platform.OS === 'ios' ? 38 : 50;
    static StatusbarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
    static HeaderHeight = this.AppbarHeight + this.StatusbarHeight;
}

export default class Navbar extends Component {
    state = {
        lastLeftPress: 0,
    };
    _iconSize = 25;
    _renderLeft = (color) => {
        let { left } = this.props;
        if (!left)
            return (<View />);
        return (
            <TouchableHighlight underlayColor={'rgba(1,1,1,0.1)'}
                onPress={() => {left.action? left.action(): false}}
                style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name={left.name} style={{ color, fontSize: this._iconSize }} />
                </View>
            </TouchableHighlight>
        )
    };
    _renderRight = (color) => {
        let { right } = this.props;
        if (!right)
            return (<View />);
        return (
            <TouchableHighlight underlayColor={'rgba(1,1,1,0.1)'} onPress={() => {
                right.action ? right.action() : false
            }} style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name={right.name} style={{ color, fontSize: this._iconSize }} />
                </View>
            </TouchableHighlight>
        )
    };

    render() {
        const { selection, theme } = this.props;
        return (
            <View style={[styles.layout, { paddingTop: this.props.modal ? 0 : Constants.StatusbarHeight }, { backgroundColor: selection ? theme.primaryDark : theme.primary }]}>
                <View style={styles.container}>
                    <View style={styles.left}>
                        {this._renderLeft(theme.navColor)}
                    </View>
                    <View style={styles.body}>
                        <Text style={{
                            fontFamily: 'Timeless',
                            textAlign: 'center',
                            fontSize: 24,
                            color: theme.navColor
                        }}>{this.props.title}</Text>
                    </View>
                    <View style={styles.right}>
                        {this._renderRight(theme.navColor)}
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    layout: {
        elevation: 4,
    },
    container: {
        height: Constants.AppbarHeight,
        flexDirection: 'row',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
