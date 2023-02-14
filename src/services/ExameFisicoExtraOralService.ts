import ExameFisicoExtraOralRepository from "../repository/ExameFisicoExtraOralRepository"

export default class ExameFisicoExtraOralService {
  private exameFisicoExtraOralRepository: ExameFisicoExtraOralRepository

  constructor() {
    this.exameFisicoExtraOralRepository = new ExameFisicoExtraOralRepository()
  }

  async findAll(): Promise<any> {
    try {
      return this.exameFisicoExtraOralRepository.findAll()
    } catch (e: any) {
      throw e
    }
  }

  async findById(id: string): Promise<any> {
    try {
      return await this.exameFisicoExtraOralRepository.findById(id)
    } catch (e) {
      throw e
    }
  }

  async create(extraOralExam: any): Promise<any> {
    try {
      return await this.exameFisicoExtraOralRepository.create(extraOralExam)
    } catch (e) {
      throw e
    }
  }

  async update(extraOralExam: any): Promise<any> {
    try {
      return await this.exameFisicoExtraOralRepository.update(extraOralExam)
    } catch (e) {
      throw e
    }
  }

  async remove(extraOralExam: any): Promise<any> {
    try {
      return await this.exameFisicoExtraOralRepository.remove(extraOralExam)
    } catch (e) {
      throw e
    }
  }
}
