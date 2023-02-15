export interface AddressDTO {
  id?: string
  cep?: string
  logradouro?: string
  complemento?: string
  bairro?: string
  cidade?: string
  uf?: string
  userId?: string
}

export interface AddressSelectResponse extends AddressDTO {
  id: string
}

export interface AddressCreateRequest extends AddressDTO {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  userId: string
}

export interface AddressCreateResponse extends AddressDTO {
  id: string
}

export interface AddressUpdateRequest extends AddressDTO {
  id: string
}

export interface AddressCreateResponse extends AddressDTO {
  id: string
}

export interface AddressRemoveRequest extends AddressDTO {
  id: string
}

export interface AddressRemoveResponse extends AddressDTO {
  id: string
}
