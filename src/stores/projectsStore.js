// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';

import Project from 'stores/models/Project.js';

export default class ProjectsStore {
    @observable projects: Array<Project> = [];
}
