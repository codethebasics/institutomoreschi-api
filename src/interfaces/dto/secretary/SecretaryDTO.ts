import {
  UserCreateRequest,
  UserDTO,
  UserSelectResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from "../user/UserDTO"

export interface SecreataryDTO {
  id?: string
  userId?: string
}

export interface SecretarySelectResponse extends SecreataryDTO {
  id: string
  user: UserSelectResponse
}

export interface SecretaryCreateRequest extends SecreataryDTO {
  userId: string
}

export interface SecretaryCreateResponse extends SecreataryDTO {
  user: UserSelectResponse
}

export interface SecretaryUpdateRequest extends SecreataryDTO {
  id: string
  user: UserUpdateRequest
}

export interface SecretaryUpdateResponse extends SecreataryDTO {
  user: UserUpdateResponse
}

export interface SecretaryRemoveRequest extends SecreataryDTO {
  id: string
}

export interface SecretaryRemoveResponse extends SecreataryDTO {
  id: string
}
