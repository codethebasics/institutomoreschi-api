import ExameFisicoIntraOralRepository from "../repository/ExameFisicoIntraOralRepository"

export default class ExameFisicoIntraOralService {
  private exameFisicoIntraOralRepository: ExameFisicoIntraOralRepository

  constructor() {
    this.exameFisicoIntraOralRepository = new ExameFisicoIntraOralRepository()
  }

  async findAll(): Promise<any> {
    return await this.exameFisicoIntraOralRepository.findAll()
  }

  async findById(id: string): Promise<any> {
    return await this.exameFisicoIntraOralRepository.findById(id)
  }

  async create(intraOralExam: any): Promise<any> {
    return await this.exameFisicoIntraOralRepository.create(intraOralExam)
  }

  async update(intraOralExam: any): Promise<any> {
    return await this.exameFisicoIntraOralRepository.update(intraOralExam)
  }

  async remove(intraOralExam: any): Promise<any> {
    return await this.exameFisicoIntraOralRepository.remove(intraOralExam)
  }
}
