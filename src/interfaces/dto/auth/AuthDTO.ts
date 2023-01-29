import { UserSelectResponse } from "../user/UserDTO";

export interface AuthDTO {
  email?: string,
  password?: string,
  user?: UserSelectResponse
}

export interface AuthRequest extends AuthDTO {
  email: string,
  password: string,
}

export interface AuthResponse extends AuthDTO {
  user: any,
  token: any
}

export interface AuthResponseError {
  message: string
}

export interface SignOutRequest {

}

export interface SignOutResponse {
  success: Boolean
}

export interface SignOutResponseError {
  message: string
}