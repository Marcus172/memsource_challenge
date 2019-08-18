// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observer } from 'mobx-react';
import React, { PureComponent } from 'react';

import appManager from 'managers/appManager.js';
import ProjectsScreen from 'components/ProjectsScreen.js';

type TProps = {};

@observer
class ProjectsScreenContainer extends PureComponent<TProps> {
    render() {
        return <ProjectsScreen projects={appManager.getProjects()} />;
    }
}

export default ProjectsScreenContainer;
