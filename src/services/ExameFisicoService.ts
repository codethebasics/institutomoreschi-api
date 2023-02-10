import {
  ExameFisicoResponse,
  ExameFisicoResquest,
} from "../interfaces/dto/exame-fisico/ExameFisicoDTO"
import { UserSelectResponse } from "../interfaces/dto/user/UserDTO"

export interface ExameFisicoService {
  create(
    exameFisico: ExameFisicoResquest,
    user: UserSelectResponse
  ): ExameFisicoResponse
}

export class ExameFisicoIntraOralService implements ExameFisicoService {
  create(
    exameFisico: ExameFisicoResquest,
    user: UserSelectResponse
  ): ExameFisicoResponse {
    throw new Error("Method not implemented.")
  }
}

export class ExameFisicoExtraOralService implements ExameFisicoService {
  create(
    exameFisico: ExameFisicoResquest,
    user: UserSelectResponse
  ): ExameFisicoResponse {
    throw new Error("Method not implemented.")
  }
}

export default {
  ExameFisicoIntraOralService,
  ExameFisicoExtraOralService,
}
