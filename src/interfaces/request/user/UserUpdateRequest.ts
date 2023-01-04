import { UserStatus } from "@prisma/client";

export interface UserUpdateRequest {
    id: string,
    name?: string,
    email?: string,
    password?: string,
    active?: UserStatus
}