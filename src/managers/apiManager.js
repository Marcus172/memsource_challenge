// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import axios from 'axios';

import appConfig from 'config/appConfig.js';

import type { TError, TLoginResponse } from 'config/types.js';

class ApiManager {
    static makeRequest(
        type: 'post' | 'get',
        request: string,
        params?: Object,
    ): Promise<Object | null> {
        const requestUrl = `${appConfig.webApiUrl}/${request}`;

        console.debug(
            `ApiManager: Making ${type.toUpperCase()} request to url: ${requestUrl} with params: `,
            params,
        );

        return axios({
            method: type,
            url: requestUrl,
            data: params,
        });
    }

    static makeGETRequest(
        request: string,
        params?: Object,
    ): Promise<Object | null> {
        return ApiManager.makeRequest('get', request, params);
    }

    static makePOSTRequest(
        request: string,
        params?: Object,
    ): Promise<Object | null> {
        return ApiManager.makeRequest('post', request, params);
    }

    login(username: string, password: string): Promise<TLoginResponse> {
        return ApiManager.makePOSTRequest('api2/v1/auth/login', {
            userName: username,
            password,
        })
            .then(
                (response: TLoginResponse | null): TLoginResponse => {
                    console.debug('ApiManager: Login responded with', response);

                    if (response == null) {
                        return {
                            error: {
                                status: null,
                                message: 'Unknown error',
                            },
                        };
                    }

                    return response;
                },
            )
            .catch(
                (e: TError): TLoginResponse => {
                    console.warn('ApiManager: Login failed', e);
                    const status = e.response.status;
                    let message = '';

                    switch (status) {
                        case 401:
                            message = 'Bad credentials';
                            break;
                        case 403:
                            message = 'Login rejected by server';
                            break;
                        case 408:
                            message = 'Server is not responding';
                            break;
                        case 500:
                            message = 'Server seems to have trouble';
                            break;
                        default:
                            message = 'Unknown error';
                    }

                    return {
                        error: {
                            status,
                            message,
                        },
                    };
                },
            );
    }

    logout() {}
}

export default new ApiManager();
