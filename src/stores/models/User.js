// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import constants from 'config/constants.js';

type TUserProps = {|
    firstName: string,
    surname: string,
    username: string,
    email: string,
    role: string,
    id: string,
    token: string,
|};

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
            console.error('could not load user from local storage', e);
            return null;
        }
    }

    @observable firstName: string;
    @observable surname: string;
    @observable username: string;
    @observable email: string;
    @observable role: string;
    @observable id: string;
    @observable token: string;

    constructor(props: TUserProps) {
        this.firstName = props.firstName;
        this.surname = props.surname;
        this.username = props.username;
        this.email = props.email;
        this.role = props.role;
        this.id = props.id;
        this.token = props.token; // Token should be stored in some encrypted storage.
    }

    saveToStorage = async (): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(
                storage_key_user,
                JSON.stringify({
                    firstName: this.firstName,
                    surname: this.surname,
                    username: this.username,
                    email: this.email,
                    role: this.role,
                    id: this.id,
                    token: this.token,
                }),
            );

            return true;
        } catch (e) {
            console.error('could not save user to local storage', e);
            return false;
        }
    };
}

export default User;
