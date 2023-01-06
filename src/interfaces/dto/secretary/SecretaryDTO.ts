import { UserCreateRequest, UserDTO, UserSelectResponse, UserUpdateRequest, UserUpdateResponse } from "../user/UserDTO";

export interface SecreataryDTO {
    id?: string,
    userId?: string
}

export interface SecretaryCreateRequest {
    userId: string
}

export interface SecretaryCreateResponse {
    userId: string
}

export interface SecretaryUpdateRequest {
    id: string
}

export interface SecreataryUpdateRequest {
    user: UserUpdateRequest
}

export interface SecreataryUpdateResponse {
    user: UserUpdateResponse
}