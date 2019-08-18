// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { action, observable } from 'mobx';

import User from 'stores/models/User.js';

class UserStore {
    @observable user: User | null;

    constructor() {
        this.user = null;
    }

    @action setUser(user: User, save?: boolean) {
        this.user = user;
        save && this.user.saveToStorage();
    }

    @action deleteUser() {
        this.user = null;
        User.flushStorage();
    }
}

export default UserStore;
