import ArchiveRepository from "../repository/ArchiveRepository"

export default class ArchiveService {
  private archiveRepository: ArchiveRepository

  constructor() {
    this.archiveRepository = new ArchiveRepository()
  }

  async findAll(): Promise<any> {
    return await this.archiveRepository.findAll()
  }

  async findById(id: string): Promise<any> {
    return await this.archiveRepository.findById(id)
  }

  async create(archive: any): Promise<any> {
    return await this.archiveRepository.create(archive)
  }

  async update(archive: any): Promise<any> {
    return await this.archiveRepository.update(archive)
  }

  async remove(archive: any): Promise<any> {
    return await this.archiveRepository.remove(archive)
  }
}
