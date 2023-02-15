import { throws } from "assert"
import ArchiveRepository from "../repository/ArchiveRepository"

export default class ArchiveService {
  private archiveRepository: ArchiveRepository

  constructor() {
    this.archiveRepository = new ArchiveRepository()
  }

  async findAll(): Promise<any> {
    try {
      return await this.archiveRepository.findAll()
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async findById(id: string): Promise<any> {
    try {
      return await this.archiveRepository.findById(id)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async create(archive: any): Promise<any> {
    try {
      return await this.archiveRepository.create(archive)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async update(archive: any): Promise<any> {
    try {
      return await this.archiveRepository.update(archive)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async remove(archive: any): Promise<any> {
    try {
      return await this.archiveRepository.remove(archive)
    } catch (e: any) {
      throw new Error(e)
    }
  }
}
