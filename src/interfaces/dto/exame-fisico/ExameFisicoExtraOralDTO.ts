import { PatientSelectResponse } from "../patient/PatientDTO"
import { UserSelectResponse } from "../user/UserDTO"

export interface ExameFisicoExtraOralDTO {
  id?: string
  skin?: string
  facialSimmetry?: string
  earJawArticulation?: string
  linfonodos?: string
  patientId?: string
  patient?: PatientSelectResponse
  user?: UserSelectResponse
}

export interface ExameFisicoExtraOralCreateRequest
  extends ExameFisicoExtraOralDTO {}
