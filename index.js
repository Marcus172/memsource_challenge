// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import {AppRegistry} from 'react-native';
import appConfig from 'config/appConfig.js';
import App from 'components/App.js';

AppRegistry.registerComponent(appConfig.appName, () => App);
