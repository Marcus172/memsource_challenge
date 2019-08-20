// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { AppRegistry } from 'react-native';

import App from 'containers/App.js';
import appConfig from 'config/appConfig.js';
import AppManager from 'managers/appManager.js';

AppRegistry.registerComponent(appConfig.appName, () => App);

AppManager.init();

if (__DEV__) {
    global.XMLHttpRequest = global.originalXMLHttpRequest
        ? global.originalXMLHttpRequest
        : global.XMLHttpRequest;
}
