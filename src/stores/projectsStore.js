// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { action, observable } from 'mobx';

import Project from 'stores/models/Project.js';

import type { TFilterItem } from 'config/types.js';

class ProjectsStore {
    @observable projects: Array<Project> = [];
    @observable totalPages: number | null;
    @observable pageNumber: number | null;
    @observable filterDueInHours: number | null = null;
    @observable filterItems: Array<TFilterItem> = [];

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

    generateFilter = () => {
        if (this.projects == null) {
            this.filterItems = [];
        }

        const values = this.projects.map((project: Project, index: number) => {
            return {
                projectId: project.id,
                dueInHours: project.dueInHours,
            };
        });

        values.sort(
            (a: TFilterItem, b: TFilterItem) => a.dueInHours - b.dueInHours,
        );

        this.filterItems = values.filter(
            (value: TFilterItem) => value.dueInHours != null,
        );
    };

    getFilterItems = (): Array<TFilterItem> => {
        return this.filterItems;
    };
}

export default ProjectsStore;
