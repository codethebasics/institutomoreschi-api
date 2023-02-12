import ExameFisicoExtraOralRepository from "../repository/ExameFisicoExtraOralRepository"

export default class ExameFisicoExtraOralService {
  private exameFisicoExtraOralRepository: ExameFisicoExtraOralRepository

  constructor() {
    this.exameFisicoExtraOralRepository = new ExameFisicoExtraOralRepository()
  }

  async findAll(): Promise<any> {
    return await this.exameFisicoExtraOralRepository.findAll()
  }

  async findById(id: string): Promise<any> {
    return await this.exameFisicoExtraOralRepository.findById(id)
  }

  async create(extraOralExam: any): Promise<any> {
    return await this.exameFisicoExtraOralRepository.create(extraOralExam)
  }

  async update(extraOralExam: any): Promise<any> {
    return await this.exameFisicoExtraOralRepository.update(extraOralExam)
  }

  async remove(extraOralExam: any): Promise<any> {
    return await this.exameFisicoExtraOralRepository.remove(extraOralExam)
  }
}
