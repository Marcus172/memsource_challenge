// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { action, observable } from 'mobx';

import Project from 'stores/models/Project.js';

export default class ProjectsStore {
    @observable projects: Array<Project> = [];

    @action setProjects(projects: Array<Project>) {
        this.projects = projects;
    }

    getProjects(): Array<Project> {
        return this.projects;
    }
}
