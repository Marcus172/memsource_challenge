// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import constants from 'config/constants.js';

import type { TUserProps } from 'config/types.js';

const { storage_key_user } = constants;

class User {
    static async loadFromStorage(): Promise<User | null> {
        try {
            const userText = await AsyncStorage.getItem(storage_key_user);

            if (userText != null) {
                return new User(JSON.parse(userText));
            }

            return null;
        } catch (e) {
            console.error('Could not load user from local storage', e);
            return null;
        }
    }

    static flushStorage() {
        AsyncStorage.removeItem(storage_key_user);
    }

    @observable firstName: string;
    @observable lastName: string;
    @observable userName: string;
    @observable email: string;
    @observable role: string;
    @observable id: string;
    @observable uuid: string;
    @observable token: string;
    @observable tokenExpiresIn: string;

    constructor(props: TUserProps) {
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.userName = props.userName;
        this.email = props.email;
        this.role = props.role;
        this.id = props.id;
        this.uuid = props.uuid;
        this.token = props.token; // Token should be stored in some encrypted storage.
        this.tokenExpiresIn = props.tokenExpiresIn;
    }

    saveToStorage = () => {
        AsyncStorage.setItem(
            storage_key_user,
            JSON.stringify({
                firstName: this.firstName,
                lastName: this.lastName,
                userName: this.userName,
                email: this.email,
                role: this.role,
                id: this.id,
                uuid: this.uuid,
                token: this.token,
                tokenExpiresIn: this.tokenExpiresIn,
            }),
        )
            .then(() => {
                console.debug('User saved to local storage');
            })
            .catch(e => {
                console.error('Could not save user to local storage', e);
            });
    };
}

export default User;
