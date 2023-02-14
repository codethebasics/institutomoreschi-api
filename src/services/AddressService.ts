import AddressRepository from "../repository/AddressRepository"

export default class AddressService {
  private addressRepository: AddressRepository

  constructor() {
    this.addressRepository = new AddressRepository()
  }

  async findAll(): Promise<any> {
    try {
      return await this.addressRepository.findAll()
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async findById(id: string): Promise<any> {
    try {
      return await this.addressRepository.findById(id)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async findByUser(user: any): Promise<any> {
    try {
      return await this.addressRepository.findByUser(user)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async create(address: any): Promise<any> {
    try {
      return await this.addressRepository.create(address)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async update(address: any): Promise<any> {
    try {
      return await this.addressRepository.update(address)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async remove(address: any): Promise<any> {
    try {
      return await this.addressRepository.remove(address)
    } catch (e: any) {
      throw new Error(e)
    }
  }
}
