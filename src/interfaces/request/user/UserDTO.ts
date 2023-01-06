import { UserRole, UserStatus } from "@prisma/client";

export interface UserDTO {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    created_at?: Date,
    updated_at?: Date,
    active?: UserStatus,
    user_role?: UserRole[]
}

export interface UserSelectResponse extends UserDTO {
    id: string
}

export interface UserCreateRequest extends UserDTO {
    name: string,
    email: string,
    password: string,
}

export interface UserCreateResponse extends UserDTO {
    id: string
}
