// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observer } from 'mobx-react';
import React, { PureComponent } from 'react';

import appManager from 'managers/appManager.js';
import SplashScreen from 'components/SplashScreen.js';

type TProps = {};

@observer
class SplashScreenContainer extends PureComponent<TProps> {
    render() {
        return (
            <SplashScreen
                appInitialized={appManager.getAppInitializedObservable()}
                user={appManager.getUser()}
            />
        );
    }
}

export default SplashScreenContainer;
