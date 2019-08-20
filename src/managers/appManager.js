// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';
import idx from 'idx';

import apiManager from 'managers/apiManager.js';
import UserStore from 'stores/userStore.js';
import navigationManager from 'managers/navigationManager.js';
import ProjectsStore from 'stores/projectsStore.js';
import User from 'stores/models/User.js';

import type {
    TFilterItem,
    TListProjectsResponse,
    TProjectData,
    TUserProps,
} from 'config/types.js';
import Project from 'stores/models/Project.js';

class AppManager {
    @observable appInitialized: boolean;
    userStore: UserStore;
    projectsStore: ProjectsStore;

    constructor() {
        this.userStore = new UserStore();
        this.projectsStore = new ProjectsStore();
        this.appInitialized = false;
    }

    getAppInitializedObservable(): boolean {
        return this.appInitialized;
    }

    init() {
        User.loadFromStorage()
            .then((user: User | null) => {
                if (user != null) {
                    this.userStore.setUser(user);
                    this.loadProjects(() => {
                        this.projectsStore.generateFilter();
                    });
                }

                this.appInitialized = true;
            })
            .catch(e => {
                this.appInitialized = true;
            });
    }

    userLogged(props: TUserProps) {
        this.userStore.setUser(new User(props), true);
        navigationManager.replace('Projects');
        this.loadProjects(() => {
            this.projectsStore.generateFilter();
        });
    }

    getProjects(): Array<Project> {
        return this.projectsStore.getProjects();
    }

    hasNextProjectPage(): boolean {
        const pageNumber = this.projectsStore.getPageNumber() || 0;
        const totalPages = this.projectsStore.getTotalPages() || 1;

        return pageNumber !== totalPages - 1;
    }

    loadProjects(callback?: Function) {
        const dueInHours = this.projectsStore.getFilterDueInHours();
        const pageNumber = this.projectsStore.getPageNumber();

        apiManager
            .fetchProjects(dueInHours, pageNumber)
            .then((response: TListProjectsResponse) => {
                if (response != null && response.data != null) {
                    this.projectsStore.setProjects(
                        this.createProjectsFromResponse(response),
                        response.data.totalPages,
                        response.data.pageNumber,
                    );

                    callback && callback();
                }
            })
            .catch((e: Error) => {
                console.warn(
                    'Unexpected Error occurred during loadProjects promise',
                    e,
                );
            });
    }

    loadMoreProjects() {
        const dueInHours = this.projectsStore.getFilterDueInHours();
        const pageNumber = this.projectsStore.getPageNumber() || 0;

        if (!this.hasNextProjectPage()) {
            console.debug(
                'AppManager: Cannot load more projects. You already are on last page',
            );

            return;
        }

        apiManager
            .fetchProjects(dueInHours, pageNumber + 1)
            .then((response: TListProjectsResponse) => {
                if (response != null && response.data != null) {
                    this.projectsStore.addProjects(
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
                id: item.id,
                name: item.name,
                sourceLang: item.sourceLang,
                status: item.status,
                targetLangs: item.targetLangs,
                dateDue: item.dateDue,
            });
        });
    }

    submitProjectsFilter(filterValue: TFilterItem) {
        this.projectsStore.setFilterDueInHours(filterValue.dueInHours);
        this.loadProjects();
    }

    getUserToken(): ?string {
        return idx(this.userStore, _ => _.user.token);
    }

    getProjectsFilterItems(): Array<TFilterItem> {
        return this.projectsStore.getFilterItems();
    }

    getUser(): User | null {
        return this.userStore.user;
    }

    logout() {
        const token = this.getUserToken();

        token && apiManager.logout(token);
        this.userStore.deleteUser();
        navigationManager.reset();
    }
}

export default new AppManager();
