export interface RoleDTO {
    id?: string,
    name?: string,
    description?: string
}

export interface RoleSelectResponse extends RoleDTO {

}

export interface RoleCreateRequest extends RoleDTO {
    name: string,
    description: string
}

export interface RoleCreateResponse extends RoleDTO {
    id: string
}

export interface RoleRemoveRequest extends RoleDTO {
    id: string
}

export interface RoleRemoveResponse extends RoleDTO {
    id: string,
    name: string,
    description: string
}

export interface RoleUpdateRequest extends RoleDTO {
    id: string
}

export interface RoleUpdateResponse extends RoleDTO {
    id: string,
    name: string,
    description: string
}
