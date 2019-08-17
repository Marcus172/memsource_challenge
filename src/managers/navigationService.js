// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { StackActions } from 'react-navigation';

import type { NavigationContainer, NavigationParams } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef: NavigationContainer) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params: NavigationParams) {
    _navigator.dispatch(
        StackActions.navigate({
            routeName,
            params,
        }),
    );
}

function replace(routeName: string, params: NavigationParams) {
    _navigator.dispatch(
        StackActions.replace({
            routeName,
            params,
        }),
    );
}

export default {
    navigate,
    replace,
    setTopLevelNavigator,
};
