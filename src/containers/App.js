// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { SafeAreaView, StatusBar, View } from 'react-native';
import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';

import navigationService from 'managers/navigationService.js';
import Navigator from 'containers/Navigator.js';
import styles from 'styles/App.style.js';

import type { NavigationContainer } from 'react-navigation';

type TAppProps = {};

@observer
class App extends Component<TAppProps> {
    render() {
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View style={styles.appContainer}>
                        <Navigator
                            ref={(navigatorRef: NavigationContainer) => {
                                navigationService.setTopLevelNavigator(
                                    navigatorRef,
                                );
                            }}
                        />
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}

export default App;
