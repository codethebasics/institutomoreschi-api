import { PrismaClient } from "@prisma/client"

import {
  AnamneseCreateRequest,
  AnamneseUpdateRequest,
  AnamneseDeleteRequest,
} from "../interfaces/dto/anamnese/AnamneseDTO"

export default class AnamneseRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<any> {
    return await this.prisma.anamnese.findMany({
      select: {
        id: true,
        reasonForConsultation: true,
        isUnderMedicalTreatment: true,
        takeSomeMedicine: true,
        medicationsUsed: true,
        familyHistoryOfIllnesses: true,
        everHadHypertensionHeartAttackOrOther: true,
        everHadHypertensionHeartAttackOrOtherDescription: true,
        everHadRheumaticFever: true,
        everHadRheumaticFeverDescription: true,
        everHadCancer: true,
        everHadCancerDescription: true,
        everHadDiabetes: true,
        everHadDiabetesDescription: true,
        everHadClottingRelatedProblems: true,
        everHadClottingRelatedProblemsDescription: true,
        everHadReactionToPenicillin: true,
        everHadReactionToPenicillinDescription: true,
        everHadHepatitis: true,
        everHadHepatitisDescription: true,
        haveBeenVaccinatedAgainstHepatitisB: true,
        anyLiverProblems: true,
        anyLiverProblemsDescription: true,
        anyKidneyProblems: true,
        anyKidneyProblemsDescription: true,
        everHadReactionAgainstAnesthesia: true,
        everHadReactionAgainstAnesthesiaDescription: true,
        isPregnant: true,
        isPregnantDescription: true,
        wasSmoker: true,
        wasSmokerDescription: true,
        isSmoker: true,
        isSmokerDescription: true,
        drinksAlchol: true,
        drinksAlcholDescription: true,
        useDrugs: true,
        useDrugsDescription: true,
        patient: true,
      },
    })
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.anamnese.findUnique({
      select: {
        id: true,
        reasonForConsultation: true,
        isUnderMedicalTreatment: true,
        takeSomeMedicine: true,
        medicationsUsed: true,
        familyHistoryOfIllnesses: true,
        everHadHypertensionHeartAttackOrOther: true,
        everHadHypertensionHeartAttackOrOtherDescription: true,
        everHadRheumaticFever: true,
        everHadRheumaticFeverDescription: true,
        everHadCancer: true,
        everHadCancerDescription: true,
        everHadDiabetes: true,
        everHadDiabetesDescription: true,
        everHadClottingRelatedProblems: true,
        everHadClottingRelatedProblemsDescription: true,
        everHadReactionToPenicillin: true,
        everHadReactionToPenicillinDescription: true,
        everHadHepatitis: true,
        everHadHepatitisDescription: true,
        haveBeenVaccinatedAgainstHepatitisB: true,
        anyLiverProblems: true,
        anyLiverProblemsDescription: true,
        anyKidneyProblems: true,
        anyKidneyProblemsDescription: true,
        everHadReactionAgainstAnesthesia: true,
        everHadReactionAgainstAnesthesiaDescription: true,
        isPregnant: true,
        isPregnantDescription: true,
        wasSmoker: true,
        wasSmokerDescription: true,
        isSmoker: true,
        isSmokerDescription: true,
        drinksAlchol: true,
        drinksAlcholDescription: true,
        useDrugs: true,
        useDrugsDescription: true,
        patient: true,
      },
      where: {
        id: id,
      },
    })
  }

  async create(anamnese: AnamneseCreateRequest): Promise<any> {
    return await this.prisma.anamnese.create({
      data: {
        patientId: anamnese.patientId,
        reasonForConsultation: anamnese.reasonForConsultation || "-",
        isUnderMedicalTreatment: !!anamnese.isUnderMedicalTreatment,
        takeSomeMedicine: !!anamnese.takeSomeMedicine,
        medicationsUsed: anamnese.medicationsUsed || "-",
        familyHistoryOfIllnesses: anamnese.familyHistoryOfIllnesses || "-",
        everHadHypertensionHeartAttackOrOther:
          !!anamnese.everHadHypertensionHeartAttackOrOther,
        everHadHypertensionHeartAttackOrOtherDescription:
          anamnese.everHadHypertensionHeartAttackOrOtherDescription || "-",
        everHadRheumaticFever: !!anamnese.everHadRheumaticFever,
        everHadRheumaticFeverDescription:
          anamnese.everHadRheumaticFeverDescription || "-",
        everHadCancer: !!anamnese.everHadCancer,
        everHadCancerDescription: anamnese.everHadCancerDescription || "-",
        everHadDiabetes: !!anamnese.everHadDiabetes,
        everHadDiabetesDescription: anamnese.everHadDiabetesDescription || "-",
        everHadClottingRelatedProblems:
          !!anamnese.everHadClottingRelatedProblems,
        everHadClottingRelatedProblemsDescription:
          anamnese.everHadClottingRelatedProblemsDescription || "-",
        everHadReactionToPenicillin: !!anamnese.everHadReactionToPenicillin,
        everHadReactionToPenicillinDescription:
          anamnese.everHadReactionToPenicillinDescription || "-",
        everHadHepatitis: !!anamnese.everHadHepatitis,
        everHadHepatitisDescription:
          anamnese.everHadHepatitisDescription || "-",
        haveBeenVaccinatedAgainstHepatitisB:
          !!anamnese.haveBeenVaccinatedAgainstHepatitisB,
        anyLiverProblems: !!anamnese.anyLiverProblems,
        anyLiverProblemsDescription:
          anamnese.anyLiverProblemsDescription || "-",
        anyKidneyProblems: !!anamnese.anyKidneyProblems,
        anyKidneyProblemsDescription:
          anamnese.anyKidneyProblemsDescription || "-",
        everHadReactionAgainstAnesthesia:
          !!anamnese.everHadReactionAgainstAnesthesia,
        everHadReactionAgainstAnesthesiaDescription:
          anamnese.everHadReactionAgainstAnesthesiaDescription || "-",
        isPregnant: !!anamnese.isPregnant,
        isPregnantDescription: anamnese.isPregnantDescription || "-",
        wasSmoker: !!anamnese.wasSmoker,
        wasSmokerDescription: anamnese.wasSmokerDescription || "-",
        isSmoker: !!anamnese.isSmoker,
        isSmokerDescription: anamnese.isSmokerDescription || "-",
        drinksAlchol: !!anamnese.drinksAlchol,
        drinksAlcholDescription: anamnese.drinksAlcholDescription || "-",
        useDrugs: !!anamnese.useDrugs,
        useDrugsDescription: anamnese.useDrugsDescription || "-",
      },
    })
  }

  async update(anamnese: AnamneseUpdateRequest): Promise<any> {
    return this.prisma.anamnese.update({
      data: {
        reasonForConsultation: anamnese.reasonForConsultation || "-",
        isUnderMedicalTreatment: !!anamnese.isUnderMedicalTreatment,
        takeSomeMedicine: !!anamnese.takeSomeMedicine,
        medicationsUsed: anamnese.medicationsUsed || "-",
        familyHistoryOfIllnesses: anamnese.familyHistoryOfIllnesses || "-",
        everHadHypertensionHeartAttackOrOther:
          !!anamnese.everHadHypertensionHeartAttackOrOther,
        everHadHypertensionHeartAttackOrOtherDescription:
          anamnese.everHadHypertensionHeartAttackOrOtherDescription || "-",
        everHadRheumaticFever: !!anamnese.everHadRheumaticFever,
        everHadRheumaticFeverDescription:
          anamnese.everHadRheumaticFeverDescription || "-",
        everHadCancer: !!anamnese.everHadCancer,
        everHadCancerDescription: anamnese.everHadCancerDescription || "-",
        everHadDiabetes: !!anamnese.everHadDiabetes,
        everHadDiabetesDescription: anamnese.everHadDiabetesDescription || "-",
        everHadClottingRelatedProblems:
          !!anamnese.everHadClottingRelatedProblems,
        everHadClottingRelatedProblemsDescription:
          anamnese.everHadClottingRelatedProblemsDescription || "-",
        everHadReactionToPenicillin: !!anamnese.everHadReactionToPenicillin,
        everHadReactionToPenicillinDescription:
          anamnese.everHadReactionToPenicillinDescription || "-",
        everHadHepatitis: !!anamnese.everHadHepatitis,
        everHadHepatitisDescription:
          anamnese.everHadHepatitisDescription || "-",
        haveBeenVaccinatedAgainstHepatitisB:
          !!anamnese.haveBeenVaccinatedAgainstHepatitisB,
        anyLiverProblems: !!anamnese.anyLiverProblems,
        anyLiverProblemsDescription:
          anamnese.anyLiverProblemsDescription || "-",
        anyKidneyProblems: !!anamnese.anyKidneyProblems,
        anyKidneyProblemsDescription:
          anamnese.anyKidneyProblemsDescription || "-",
        everHadReactionAgainstAnesthesia:
          !!anamnese.everHadReactionAgainstAnesthesia,
        everHadReactionAgainstAnesthesiaDescription:
          anamnese.everHadReactionAgainstAnesthesiaDescription || "-",
        isPregnant: !!anamnese.isPregnant,
        isPregnantDescription: anamnese.isPregnantDescription || "-",
        wasSmoker: !!anamnese.wasSmoker,
        wasSmokerDescription: anamnese.wasSmokerDescription || "-",
        isSmoker: !!anamnese.isSmoker,
        isSmokerDescription: anamnese.isSmokerDescription || "-",
        drinksAlchol: !!anamnese.drinksAlchol,
        drinksAlcholDescription: anamnese.drinksAlcholDescription || "-",
        useDrugs: !!anamnese.useDrugs,
        useDrugsDescription: anamnese.useDrugsDescription || "-",
      },
      where: {
        id: anamnese.id,
      },
    })
  }

  async remove(anamnese: AnamneseDeleteRequest): Promise<any> {
    return this.prisma.anamnese.delete({
      where: {
        id: anamnese.id,
      },
    })
  }
}
