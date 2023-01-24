import { ProcedureApproval } from "@prisma/client"

export interface DentistProcedureDTO {
  dentistId?: string,
  procedureId?: string,
  scheduled_at?: Date,
  scheduled_for?: Date,
  approved?: ProcedureApproval,
  patientId?: string
}

export interface DentistProcedureSelectResponse extends DentistProcedureDTO {
  
}

export interface DentistProcedureCreateRequest extends DentistProcedureDTO {
  dentistId: string,
  procedureId: string,
  scheduled_for: Date,
  patientId: string
}

export interface DentistProcedureCreateResponse extends DentistProcedureDTO {

}

export interface DentistProcedureUpdateRequest extends DentistProcedureDTO {
  dentistId: string,
  procedureId: string,
  patientId: string
}

export interface DentistProcedureUpdateResponse extends DentistProcedureDTO {

}

export interface DentistProcedureRemoveRequest extends DentistProcedureDTO {
  dentistId: string,
  procedureId: string,
  patientId: string
}

export interface DentistProcedureRemoveResponse extends DentistProcedureDTO {

}