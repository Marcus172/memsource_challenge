// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Card, Paragraph, Headline } from 'react-native-paper';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import React, { PureComponent } from 'react';

import appManager from 'managers/appManager.js';
import Button from 'components/Button.js';
import styles from 'styles/SettingsScreen.style.js';
import User from 'stores/models/User.js';

type TProps = {
    user: User | null,
};

class SettingsScreen extends PureComponent<TProps> {
    render() {
        if (this.props.user == null) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Headline>Settings</Headline>
                <Card style={styles.card}>
                    <Card.Title
                        title={this.props.user.userName}
                        subtitle={`Role: ${this.props.user.role}`}
                    />
                    <Card.Content>
                        <Paragraph>
                            First Name: {this.props.user.firstName}
                        </Paragraph>
                        <Paragraph>
                            Last Name: {this.props.user.lastName}
                        </Paragraph>
                        <Paragraph>Email: {this.props.user.email}</Paragraph>
                        <Button
                            label="Logout"
                            onPress={() => appManager.logout()}
                        />
                    </Card.Content>
                </Card>
                <Button
                    label="Close"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

export default withNavigation(SettingsScreen);
