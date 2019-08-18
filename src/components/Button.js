// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/Button.style.js';

type TProps = {
    label: string,
    disabled?: boolean,
    onPress: () => void,
    loading?: boolean,
};

class Button extends PureComponent<TProps> {
    renderButtonBody = () => {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return <Text style={styles.buttonText}>{this.props.label}</Text>;
    };

    render() {
        return (
            <TouchableOpacity
                style={
                    this.props.disabled || this.props.loading
                        ? styles.buttonDisabled
                        : styles.button
                }
                onPress={
                    this.props.disabled || this.props.loading
                        ? null
                        : this.props.onPress
                }
                activeOpacity={
                    this.props.disabled || this.props.loading ? 1 : 0.2
                }
            >
                {this.renderButtonBody()}
            </TouchableOpacity>
        );
    }
}

export default Button;
