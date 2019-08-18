// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';

import type { TProjectProps, TStatus } from 'config/types.js';

class Project {
    @observable name: string;
    @observable sourceLang: string;
    @observable targetLangs: Array<string>;
    @observable status: TStatus;

    constructor(props: TProjectProps) {
        this.name = props.name;
        this.sourceLang = props.sourceLang;
        this.targetLangs = props.targetLangs;
        this.status = props.status;
    }
}

export default Project;
