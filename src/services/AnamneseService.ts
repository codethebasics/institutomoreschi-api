import AnamneseRepository from "../repository/AnamneseRepository"

export default class AnamneseService {
  private anamneseRepository: AnamneseRepository

  constructor() {
    this.anamneseRepository = new AnamneseRepository()
  }

  async findAll(): Promise<any> {
    return await this.anamneseRepository.findAll()
  }

  async findById(id: string): Promise<any> {
    return await this.anamneseRepository.findById(id)
  }

  async findByPatientId(id: string): Promise<any> {
    try {
      return await this.anamneseRepository.findByPatientId(id)
    } catch (e) {
      throw e
    }
  }

  async create(anamnese: any): Promise<any> {
    return this.anamneseRepository.create(anamnese)
  }

  async update(anamnese: any): Promise<any> {
    if (!anamnese || !anamnese.id) {
      throw new Error("O id da anamnese deve ser informado")
    }

    const findAnamnese = await this.findById(anamnese.id)
    if (!findAnamnese) {
      throw new Error("A anamnese com o id informado não foi encontrada")
    }

    return this.anamneseRepository.update({ ...anamnese })
  }

  async remove(anamnese: any): Promise<any> {
    return this.anamneseRepository.remove(anamnese)
  }
}
