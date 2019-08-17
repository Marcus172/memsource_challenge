// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';

import type { TStatus } from 'config/types.js';

type TProjectProps = {|
    name: string,
    sourceLangs: Array<string>,
    targetLangs: Array<string>,
    status: TStatus,
|};

class Project {
    @observable name: string;
    @observable sourceLangs: Array<string>;
    @observable targetLangs: Array<string>;
    @observable status: TStatus;

    constructor(props: TProjectProps) {
        this.name = props.name;
        this.sourceLangs = props.sourceLangs;
        this.targetLangs = props.targetLangs;
        this.status = props.status;
    }
}

export default Project;
