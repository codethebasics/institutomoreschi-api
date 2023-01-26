import { Patient } from "@prisma/client"
import { DentistSelectResponse } from "../dentist/DentistDTO"
import { PatientSelectResponse } from "../patient/PatientDTO"

export interface MedicalHistoryDTO {
  id?: string,
  description?: string,
  dentist?: DentistSelectResponse,
  patient?: PatientSelectResponse
  updated_at?: Date
}

export interface MedicalHistorySelectResponse  {
  id: string,
  description: string,
  dentist: DentistSelectResponse,
  patient: Patient,
}

export interface MedicalHistoryCreateRequest extends MedicalHistoryDTO {
  description: string,
  dentistId: string,
  patientId: string
}

export interface MedicalHistoryCreateResponse extends MedicalHistoryDTO {
  id: string,
  description: string,
  dentist: DentistSelectResponse,
  patient: PatientSelectResponse
}

export interface MedicalHistoryUpdateRequest extends MedicalHistoryDTO {
  id: string
}

export interface MedicalHistoryUpdateResponse extends MedicalHistoryDTO {
  id: string,
  description: string
}

export interface MedicalHistoryRemoveRequest extends MedicalHistoryDTO {
  id: string
}

export interface MedicalHistoryRemoveResponse extends MedicalHistoryDTO {
  id: string,
  description: string
}