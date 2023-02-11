import { PatientSelectResponse } from "../patient/PatientDTO"

export interface ExameFisicoDTO {
  id: String
  patient: PatientSelectResponse
}

export interface ExameFisicoExtraOral extends ExameFisicoDTO {
  pele?: String
  simetria_facial?: String
  articulacao_temporomandibular?: String
  linfonodos?: String
}

export interface ExameFisicoIntraOral extends ExameFisicoDTO {
  labios?: String
  lingual?: String
  assoalho_bucal?: String
  palato_duro?: String
  palato_mole?: String
  mucosa_jugal?: String
  mucosa_aleolar?: String
  orofaringe_retromolar?: String
  descricao_da_lesao?: String
}

export interface ExameFisicoResponse {
  exame_fisico_intra_oral?: ExameFisicoIntraOral
  exame_fisico_extra_oral?: ExameFisicoExtraOral
}

export interface ExameFisicoIntraOralResponse extends ExameFisicoIntraOral {}

export interface ExameFisicoExtraOralResponse extends ExameFisicoExtraOral {}

export interface ExameFisicoResquest {
  exame_fisico_intra_oral: ExameFisicoIntraOral
  exame_fisico_extra_oral: ExameFisicoExtraOral
}
