import { UserRoleSelectResponse } from "./UserRoleSelectResponse"

export type UserSelectResponse = {
    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    active: string
}

export type UserCreateRequest = {
    name: string,
    email: string,
    password: string
}

export type UserCreatedResponse = {
    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    active: string,
}