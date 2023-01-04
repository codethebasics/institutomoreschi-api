import { UserStatus } from "@prisma/client";

export interface UserCreateRequest {
    name: string,
    email: string,
    password: string,
    active?: UserStatus
}