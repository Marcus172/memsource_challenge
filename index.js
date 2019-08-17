// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { AppRegistry } from 'react-native';

import App from 'containers/App.js';
import appConfig from 'config/appConfig.js';
import StoreManager from 'managers/storeManager.js';

StoreManager.init();

AppRegistry.registerComponent(appConfig.appName, () => App);
