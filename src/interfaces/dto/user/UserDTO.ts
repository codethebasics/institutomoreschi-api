import { UserStatus } from "@prisma/client"
import { ArchiveDTO } from "../archive/ArchiveDTO"

export interface UserDTO {
  id?: string
  name?: string
  email?: string
  password?: string
  created_at?: Date
  updated_at?: Date
  active?: UserStatus
  phone?: string
  archive?: ArchiveDTO
}

export interface UserSelectResponse extends UserDTO {
  id: string
  name: string
  email: string
  password?: string
  phone: string
}

export interface UserLoginResponse extends UserDTO {
  id: string
  name: string
  email: string
  password: string
}

export interface UserCreateRequest extends UserDTO {
  name: string
  email: string
  password: string
  phone: string
}

export interface UserCreateResponse extends UserDTO {
  id: string
  created_at: Date
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

export interface UserRemoveResponse extends UserDTO {}
