import { UserStatus } from "@prisma/client";

export interface UserDTO {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    created_at?: Date,
    updated_at?: Date,
    active?: UserStatus
}

export interface UserSelectResponse extends UserDTO {
    id: string,
    name: string,
    email: string    
}

export interface UserCreateRequest extends UserDTO {
    name: string,
    email: string,
    password: string
}

export interface UserCreateResponse extends UserDTO {
    id: string,
    created_at: Date,
}

export interface UserUpdateRequest extends UserDTO {
    id: string
}

export interface UserUpdateResponse extends UserDTO {
    updated_at: Date
}

export interface UserRemoveRequest extends UserDTO {
    id: string
}

export interface UserRemoveResponse extends UserDTO {

}