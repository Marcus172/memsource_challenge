// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import axios from 'axios';

import appConfig from 'config/appConfig.js';
import appManager from 'managers/appManager.js';

import type {
    TError,
    TListProjectsResponse,
    TLoginResponse,
    TResponseError,
} from 'config/types.js';

class ApiManager {
    static makeRequest(
        type: 'post' | 'get',
        request: string,
        params?: Object,
    ): Promise<Object | null> {
        let requestUrl = `${appConfig.webApiUrl}/${request}`;
        const token = appManager.getUserToken();

        if (token != null) {
            requestUrl += `?token=${token}`;
        }

        console.debug(
            `ApiManager: Making ${type.toUpperCase()} request to url: ${requestUrl} with params: `,
            params,
        );

        return axios({
            method: type,
            url: requestUrl,
            params,
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

    static processError(error: TError): TResponseError {
        console.warn('ApiManager: Login failed', error);
        const status = error.response.status;
        let message = '';

        switch (status) {
            case 401:
                message = 'Bad credentials';
                // Eventual logout
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
            status,
            message,
        };
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
                            status: null,
                            message: 'Unknown error',
                        };
                    }

                    return response;
                },
            )
            .catch(
                (e: TError): TResponseError => {
                    return ApiManager.processError(e);
                },
            );
    }

    logout(token: string) {
        ApiManager.makePOSTRequest('api2/v1/auth/logout', { token })
            .then(response => {
                console.debug('ApiManager: Logout responded with', response);
            })
            .catch((e: TError) => {
                ApiManager.processError(e);
            });
    }

    fetchProjects(
        dueInHours?: ?number,
        pageNumber?: ?number,
    ): Promise<TListProjectsResponse> {
        return ApiManager.makeGETRequest('api2/v1/projects', {
            dueInHours,
            pageNumber,
        })
            .then(
                (
                    response: TListProjectsResponse | null,
                ): TListProjectsResponse => {
                    console.debug(
                        'ApiManager: fetchProjects responded with',
                        response,
                    );

                    if (response == null) {
                        return {
                            status: null,
                            message: 'Unknown error',
                        };
                    }

                    return response;
                },
            )
            .catch(
                (e: TError): TResponseError => {
                    return ApiManager.processError(e);
                },
            );
    }
}

export default new ApiManager();
