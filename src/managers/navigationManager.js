// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { StackActions, NavigationActions } from 'react-navigation';

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

function reset() {
    const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'App' })],
    });

    _navigator.dispatch(resetAction);
}

export default {
    navigate,
    replace,
    setTopLevelNavigator,
    reset,
};
