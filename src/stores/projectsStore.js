// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { action, observable } from 'mobx';

import Project from 'stores/models/Project.js';

// import type { TProjectFilterItem } from 'config/types.js';

class ProjectsStore {
    @observable projects: Array<Project> = [];
    @observable totalPages: number | null;
    @observable pageNumber: number | null;
    @observable filterDueInHours: number | null = null;

    @action setProjects(
        projects: Array<Project>,
        totalPages: number,
        pageNumber: number,
    ) {
        this.projects = projects;
        this.totalPages = totalPages;
        this.pageNumber = pageNumber;
    }

    @action addProjects(projects: Array<Project>) {
        this.projects.push(...projects);
    }

    getProjects(): Array<Project> {
        return this.projects;
    }

    getPageNumber(): number | null {
        return this.pageNumber;
    }

    getTotalPages(): number | null {
        return this.totalPages;
    }

    @action setFilterDueInHours(value: number) {
        this.filterDueInHours = value;
    }

    getFilterDueInHours(): number | null {
        return this.filterDueInHours;
    }
}

export default ProjectsStore;
