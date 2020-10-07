/**
 * @format
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

export default class MiniCRM extends Component {
    render() {
        return (
            <App />
        );
    }
}
AppRegistry.registerComponent(appName, () => MiniCRM);