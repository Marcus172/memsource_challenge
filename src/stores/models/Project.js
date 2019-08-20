// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { computed, observable } from 'mobx';
import moment from 'moment';

import constants from 'config/constants.js';

import type { TProjectProps, TStatus } from 'config/types.js';

class Project {
    // These will not change in this application so they would not have to be observable for the case
    // of current challenge
    @observable id: string;
    @observable name: string;
    @observable sourceLang: string;
    @observable targetLangs: Array<string>;
    @observable status: TStatus;
    @observable dateDue: string;

    constructor(props: TProjectProps) {
        this.name = props.name;
        this.sourceLang = props.sourceLang;
        this.targetLangs = props.targetLangs;
        this.status = props.status;
        this.dateDue = props.dateDue;
    }

    @computed get dueInHours(): number {
        const now = moment().valueOf();
        const dueDateMillis = moment(this.dateDue).valueOf();

        return Math.ceil((dueDateMillis - now) / constants.millisToHours);
    }
}

export default Project;
