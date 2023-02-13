import AnamneseRepository from "../repository/AnamneseRepository"

export default class AnamneseService {
  private anamneseRepository: AnamneseRepository

  constructor() {
    this.anamneseRepository = new AnamneseRepository()
  }

  async findAll(): Promise<any> {
    return this.anamneseRepository.findAll()
  }

  async findById(id: string): Promise<any> {
    return this.anamneseRepository.findById(id)
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
