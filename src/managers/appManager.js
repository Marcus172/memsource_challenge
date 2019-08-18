// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import idx from 'idx';

import apiManager from 'managers/apiManager.js';
import UserStore from 'stores/userStore.js';
import navigationManager from 'managers/navigationManager.js';
import ProjectsStore from 'stores/projectsStore.js';
import User from 'stores/models/User.js';

import type {
    TListProjectsResponse,
    TProjectData,
    TUserProps,
} from 'config/types.js';
import Project from 'stores/models/Project.js';

class AppManager {
    userStore: UserStore;
    projectsStore: ProjectsStore;

    constructor() {
        this.userStore = new UserStore();
        this.projectsStore = new ProjectsStore();
    }

    init() {
        User.loadFromStorage()
            .then((user: User | null) => {
                if (user == null) {
                    navigationManager.replace('Login');
                } else {
                    navigationManager.replace('Projects');
                    this.userStore.setUser(user);
                    this.loadProjects();
                }
            })
            .catch(e => {
                navigationManager.replace('Login');
            });
    }

    userLogged(props: TUserProps) {
        this.userStore.setUser(new User(props), true);
        navigationManager.replace('Projects');
        this.loadProjects();
    }

    getProjects(): Array<Project> {
        return this.projectsStore.getProjects();
    }

    loadProjects() {
        apiManager
            .fetchProjects()
            .then((response: TListProjectsResponse) => {
                if (response != null && response.data != null) {
                    this.projectsStore.setProjects(
                        this.createProjectsFromResponse(response),
                    );
                }
            })
            .catch((e: Error) => {
                console.warn(
                    'Unexpected Error occurred during loadProjects promise',
                    e,
                );
            });
    }

    createProjectsFromResponse(
        response: TListProjectsResponse,
    ): Array<Project> {
        if (response == null || response.data == null) {
            return [];
        }

        return response.data.content.map((item: TProjectData) => {
            return new Project({
                name: item.name,
                sourceLang: item.sourceLang,
                status: item.status,
                targetLangs: item.targetLangs,
            });
        });
    }

    getUserToken(): ?string {
        return idx(this.userStore, _ => _.user.token);
    }
}

export default new AppManager();
