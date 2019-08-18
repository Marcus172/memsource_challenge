// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { observable } from 'mobx';

type TStatus =
    | 'NEW'
    | 'ASSIGNED'
    | 'COMPLETED'
    | 'ACCEPTED_BY_VENDOR'
    | 'DECLINED_BY_VENDOR'
    | 'COMPLETED_BY_VENDOR'
    | 'CANCELLED';

type TError = {
    config: Object,
    request: XMLHttpRequest,
    response: {
        status: number,
        data: Object,
    },
    message: string,
};

type TLoginResponse = {
    error?: { status: number | null, message: string } | null,
    user?: {
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        role: string,
        id: string,
        uid: string,
    },
    token?: string,
    expires?: string,
};

type TUserProps = {|
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    role: string,
    id: string,
    uuid: string,
    token: string,
    tokenExpiresIn: string,
|};

export type { TError, TLoginResponse, TStatus, TUserProps };
