// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import AppStore from 'stores/appStore.js';
import navigationService from 'managers/navigationService.js';
import User from 'stores/models/User.js';

class StoreManager {
    store: AppStore;

    constructor() {
        this.store = new AppStore();
    }

    init() {
        User.loadFromStorage()
            .then((user: User | null) => {
                this.store.setUser(user);

                if (user == null) {
                    navigationService.replace('Login');
                } else {
                    navigationService.replace('Projects');
                }
            })
            .catch(e => {
                navigationService.replace('Login');
            });
    }
}

export default new StoreManager();
