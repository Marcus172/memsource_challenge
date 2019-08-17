// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { action, observable } from 'mobx';
import ProjectsStore from 'stores/projectsStore.js';
import User from 'stores/models/User.js';

class AppStore {
    @observable projectStore: ProjectsStore;
    @observable user: User | null;

    constructor() {
        this.projectStore = new ProjectsStore();
        this.user = null;
    }

    @action setUser(user: User | null) {
        this.user = user;
    }
}

export default AppStore;
