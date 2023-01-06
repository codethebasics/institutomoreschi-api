export interface RoleDTO {
    id?: string,
    name?: string,
    description?: string
}

export interface RoleCreateRequest extends RoleDTO {
    name: string,
    description: string
}

export interface RoleCreateResponse extends RoleDTO {
    id: string
}