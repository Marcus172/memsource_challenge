// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observer } from 'mobx-react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import React, { Component, Fragment } from 'react';

import navigationManager from 'managers/navigationManager.js';
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
                                navigationManager.setTopLevelNavigator(
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
