// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observer } from 'mobx-react';
import React, { PureComponent } from 'react';

import appManager from 'managers/appManager.js';
import SettingsScreen from 'components/SettingsScreen.js';

type TProps = {};

@observer
class SettingsScreenContainer extends PureComponent<TProps> {
    render() {
        return <SettingsScreen user={appManager.getUser()} />;
    }
}

export default SettingsScreenContainer;
