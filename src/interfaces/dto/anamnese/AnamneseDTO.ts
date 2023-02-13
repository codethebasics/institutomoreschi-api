import { UserSelectResponse } from "../user/UserDTO"

export interface AnamneseDTO {
  id?: string
  patientId: string
  reasonForConsultation?: string
  isUnderMedicalTreatment?: boolean
  takeSomeMedicine?: boolean
  medicationsUsed?: string
  familyHistoryOfIllnesses?: string
  everHadHypertensionHeartAttackOrOther?: boolean
  everHadHypertensionHeartAttackOrOtherDescription?: string
  everHadRheumaticFever?: boolean
  everHadRheumaticFeverDescription?: string
  everHadCancer?: boolean
  everHadCancerDescription?: string
  everHadDiabetes?: boolean
  everHadDiabetesDescription?: string
  everHadClottingRelatedProblems?: boolean
  everHadClottingRelatedProblemsDescription?: string
  everHadReactionToPenicillin?: boolean
  everHadReactionToPenicillinDescription?: string
  everHadHepatitis?: boolean
  everHadHepatitisDescription: string
  haveBeenVaccinatedAgainstHepatitisB?: boolean
  anyLiverProblems?: boolean
  anyLiverProblemsDescription?: string
  anyKidneyProblems?: boolean
  anyKidneyProblemsDescription?: string
  everHadReactionAgainstAnesthesia?: boolean
  everHadReactionAgainstAnesthesiaDescription?: string
  isPregnant?: boolean
  isPregnantDescription?: string
  wasSmoker?: boolean
  wasSmokerDescription?: string
  isSmoker?: boolean
  isSmokerDescription?: string
  drinksAlchol?: boolean
  drinksAlcholDescription?: string
  useDrugs?: boolean
  useDrugsDescription?: string
}

export interface AnamneseCreateRequest extends AnamneseDTO {}

export interface AnamneseCreateResponse extends AnamneseDTO {}

export interface AnamneseUpdateRequest extends AnamneseDTO {
  id: string
  user: UserSelectResponse
}

export interface AnamneseUpdateResponse extends AnamneseDTO {
  id: string
  user: UserSelectResponse
}

export interface AnamneseDeleteRequest extends AnamneseDTO {
  id: string
}
