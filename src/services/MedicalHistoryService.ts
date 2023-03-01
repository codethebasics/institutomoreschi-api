import {
  MedicalHistoryCreateResponse,
  MedicalHistoryRemoveRequest,
  MedicalHistoryRemoveResponse,
  MedicalHistorySelectResponse,
  MedicalHistoryUpdateRequest,
  MedicalHistoryUpdateResponse,
} from "../interfaces/dto/medical-history/MedicalHistoryDTO"
import medicalHistoryRepository from "../repository/MedicalHistoryRepository"

export default class MedicalHistoryService {
  private medicalHistoryRepository: medicalHistoryRepository

  constructor() {
    this.medicalHistoryRepository = new medicalHistoryRepository()
  }

  async findAll(): Promise<MedicalHistorySelectResponse[]> {
    try {
      const response = await this.medicalHistoryRepository.findAll()
      return response
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async findById(id: string): Promise<MedicalHistorySelectResponse> {
    try {
      const response = await this.medicalHistoryRepository.findById(id)
      return response
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async findByPatient(patient: any): Promise<MedicalHistorySelectResponse[]> {
    try {
      const response = await this.medicalHistoryRepository.findByPatient(
        patient
      )
      return response
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async create(medicalHistory: {
    patientId: string
    dentistId: string
    description: string
  }): Promise<MedicalHistoryCreateResponse> {
    try {
      return await this.medicalHistoryRepository.save({
        dentistId: medicalHistory.dentistId,
        patientId: medicalHistory.patientId,
        description: medicalHistory.description,
      })
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async update(
    medicalHistory: MedicalHistoryUpdateRequest
  ): Promise<MedicalHistoryUpdateResponse> {
    try {
      return await this.medicalHistoryRepository.update({
        id: medicalHistory.id,
        description: medicalHistory.description,
      })
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async remove(
    medicalHistory: MedicalHistoryRemoveRequest
  ): Promise<MedicalHistoryRemoveResponse> {
    try {
      return await this.medicalHistoryRepository.remove({
        id: medicalHistory.id,
      })
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }
}
