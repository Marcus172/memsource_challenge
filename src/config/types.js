// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

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
};

type TResponseError = { status: number | null, message: string } | null;

type TLoginResponse =
    | {
          data: {
              user: {
                  firstName: string,
                  lastName: string,
                  userName: string,
                  email: string,
                  role: string,
                  id: string,
                  uid: string,
              },
              token: string,
              expires: string,
          },
      }
    | TResponseError;

type TProjectData = {
    uid: string,
    internalId: number,
    id: string,
    name: string,
    dateCreated: string,
    dateDue: string,
    domain: {
        name: string,
        id: string,
    },
    subDomain: {
        name: string,
        id: string,
    },
    owner: {
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        role: string,
        id: string,
        uid: string,
    },
    sourceLang: string,
    targetLangs: Array<string>,
    references: [
        {
            id: string,
            filename: string,
            note: string,
        },
    ],
    userRole: string,
    status: TStatus,
};

type TListProjectsResponse =
    | {
          data: {
              totalElements: number,
              totalPages: number,
              pageSize: number,
              pageNumber: number,
              numberOfElements: number,
              content: Array<TProjectData>,
          },
      }
    | TResponseError;

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

type TProjectProps = {|
    id: string,
    name: string,
    sourceLang: string,
    targetLangs: Array<string>,
    status: TStatus,
    dateDue: string,
|};

type TFilterItem = {|
    projectId: string,
    dueInHours: number,
|};

type TPickerItem = {|
    label: string,
    key: string,
    value: number,
|};

export type {
    TError,
    TLoginResponse,
    TStatus,
    TUserProps,
    TResponseError,
    TListProjectsResponse,
    TProjectData,
    TProjectProps,
    TPickerItem,
    TFilterItem,
};
