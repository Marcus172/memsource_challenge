// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import AppStore from 'stores/appStore.js';
import navigationManager from 'managers/navigationManager.js';
import User from 'stores/models/User.js';

import type { TUserProps } from 'config/types.js';

class AppManager {
    store: AppStore;

    constructor() {
        this.store = new AppStore();
    }

    init() {
        User.loadFromStorage()
            .then((user: User | null) => {
                this.store.setUser(user);

                if (user == null) {
                    navigationManager.replace('Login');
                } else {
                    navigationManager.replace('Projects');
                }
            })
            .catch(e => {
                navigationManager.replace('Login');
            });
    }

    createUser(props: TUserProps) {
        this.store.setUser(new User(props), true);
        navigationManager.replace('Projects');
    }
}

export default new AppManager();
