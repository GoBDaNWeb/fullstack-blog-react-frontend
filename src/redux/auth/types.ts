export enum AuthStatus {
    LOADING = 'loading',
    SUCCESS = 'loaded',
    ERROR = 'error'
}

export type AuthLoginParams = {
    email: string,
    password: string
}

export type AuthRegisterParams = {
    email: string,
    password: string,
    fullName: string,
    // avatarUrl: string
}

export type AuthDataType = {
    _id: string,
    email: string,
    password: string,
    fullName: string,
    avatarUrl?: string,
    createdAt: string,
    updatedAt: string,
    token: string
}

export interface AuthState {
    data: AuthDataType | null,
    status: AuthStatus
}