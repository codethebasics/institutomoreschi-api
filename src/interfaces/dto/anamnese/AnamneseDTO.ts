import { UserSelectResponse } from "../user/UserDTO"

export interface AnamneseDTO {
  id?: String
  user: UserSelectResponse
  reasonForConsultation?: String
  isUnderMedicalTreatment?: Boolean
  takeSomeMedicine?: Boolean
  medicationsUsed?: String
  familyHistoryOfIllnesses?: String
  everHadHypertensionHeartAttackOrOther?: Boolean
  everHadHypertensionHeartAttackOrOtherDescription?: String
  everHadRheumaticFever?: Boolean
  everHadRheumaticFeverDescription?: String
  everHadCancer?: Boolean
  everHadCancerDescription?: String
  everHadDiabetes?: Boolean
  everHadClottingRelatedProblems?: Boolean
  everHadClottingRelatedProblemsDescription?: String
  everHadReactionToPenicillin?: Boolean
  everHadReactionToPenicillinDescription?: String
  everHadHepatitis?: Boolean
  haveBeenVaccinatedAgainstHepatitisB?: String
  anyLiverProblems?: Boolean
  anyLiverProblemsDescription?: String
  anyKidneyProblems?: Boolean
  everHadReactionAgainstAnesthesia?: Boolean
  everHadReactionAgainstAnesthesiaDescription?: String
  isPregnant?: Boolean
  isPregnantDescription?: String
  wasSmoker?: Boolean
  wasSmokerDescription?: String
  isSmoker?: Boolean
  isSmokerDescription?: String
  drinksAlchol?: Boolean
  drinksAlcholDescription?: String
  useDrugs?: Boolean
  useDrugsDescription?: String
}

export interface AnamneseCreateRequest extends AnamneseDTO {
  user: UserSelectResponse
}

export interface AnamneseCreateResponse extends AnamneseDTO {
  user: UserSelectResponse
}

export interface AnamneseUpdateRequest extends AnamneseDTO {
  id: string
  user: UserSelectResponse
}

export interface AnamneseUpdateResponse extends AnamneseDTO {
  id: string
  user: UserSelectResponse
}
