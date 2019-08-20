// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Card, Paragraph } from 'react-native-paper';
import { View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/DetailScreen.style.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';

type TProps = {
    navigation: NavigationScreenProp<NavigationState>,
};

class DetailScreen extends PureComponent<TProps> {
    static navigationOptions = ({
        navigation,
    }: {
        navigation: NavigationScreenProp<NavigationState>,
    }) => {
        return {
            title: `Detail of ${navigation.getParam('project').name}`,
        };
    };

    render() {
        const project = this.props.navigation.getParam('project');

        return (
            <View style={styles.container}>
                <Card>
                    <Card.Title
                        title={project.name}
                        subtitle={`Status: ${project.status}`}
                    />
                    <Card.Content>
                        <Paragraph>{`Source Language: ${
                            project.sourceLang
                        }`}</Paragraph>
                        <Paragraph>{`Target Languages: ${project.targetLangs.join(
                            ', ',
                        )}`}</Paragraph>
                    </Card.Content>
                </Card>
            </View>
        );
    }
}

export default DetailScreen;
