import { PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"
import { DentistCreateRequest } from "./interfaces/dto/dentist/DentistDTO"
import { PatientCreateRequest } from "./interfaces/dto/patient/PatientDTO"
import { SecretaryCreateRequest } from "./interfaces/dto/secretary/SecretaryDTO"
import { UserCreateRequest } from "./interfaces/dto/user/UserDTO"

import DentistProcedureService from "./services/DentistProcedureService"
import DentistService from "./services/DentistService"
import HealthInsuranceService from "./services/HealthInsuranceService"
import MedicalHistoryService from "./services/MedicalHistoryService"
import PacientHealthInsuranceService from "./services/PacientHealthInsuranceService"
import PatientService from "./services/PatientService"
import ProcedureService from "./services/ProcedureService"
import RoleService from "./services/RoleService"
import SecretaryService from "./services/SecretaryService"
import UserRoleService from "./services/UserRoleService"
import UserService from "./services/UserService"
import ExameFisicoExtraOralService from "./services/ExameFisicoExtraOralService"
import ExameFisicoIntraOralService from "./services/ExameFisicoIntraOralService"
import { AnamneseCreateRequest } from "./interfaces/dto/anamnese/AnamneseDTO"
import AnamneseService from "./services/AnamneseService"
import ArchiveService from "./services/ArchiveService"
import { ArchiveCreateRequest } from "./interfaces/dto/archive/ArchiveDTO"

const prisma = new PrismaClient()
const userService = new UserService()
const patientService = new PatientService()
const roleService = new RoleService()
const secretaryService = new SecretaryService()
const dentistService = new DentistService()
const userRoleService = new UserRoleService()
const procedureService = new ProcedureService()
const healthInsuranceService = new HealthInsuranceService()
const patientHealthInsuranceService = new PacientHealthInsuranceService()
const dentistProcedureService = new DentistProcedureService()
const medicalHistoryService = new MedicalHistoryService()
const exameFisicoExtraOralService = new ExameFisicoExtraOralService()
const exameFisicoIntraOralService = new ExameFisicoIntraOralService()
const anamneseService = new AnamneseService()
const archiveService = new ArchiveService()

let bruno: UserCreateRequest = {
  name: "Bruno Carneiro",
  email: "bruno.carneiro@gmail.com",
  password: randomUUID(),
  phone: "61985770401",
}

let pepe: UserCreateRequest = {
  name: "João Pedro",
  email: "pepe@gmail.com",
  password: randomUUID(),
  phone: "6177777777",
}

let gabi: UserCreateRequest = {
  name: "Gabriela Moreschi",
  email: "gabi@gmail.com",
  password: randomUUID(),
  phone: "6188888888",
}

/**
 * ============
 * CREATE ROLES
 * ============
 */
async function createRoles() {
  const admin = { name: "admin", description: "Administrador do sistema" }
  const secretary = { name: "secretaria", description: "Secretária da clínica" }
  const patient = { name: "paciente", description: "Paciente da clínica" }
  const dentist = { name: "dentista", description: "Dentista da clínica" }

  const roles = [admin, secretary, patient, dentist]

  for (const role of roles) {
    await roleService.create(role)
  }
}

/**
 * ============
 * CREATE USERS
 * ============
 */
async function createUsers() {
  await userService.create(bruno)
  await userService.create(pepe)
  await userService.create(gabi)
}

/**
 * ===============
 * CREATE PATIENTS
 * ===============
 */
async function createPatients() {
  const brunoRecovered = await userService.findByEmail(bruno.email)
  if (brunoRecovered) {
    const patientBruno: PatientCreateRequest = {
      birth_date: new Date("1987-07-29"),
      health_insurance_card_number: "7777777",
      userId: brunoRecovered.id,
      cpf: "00825346169",
    }
    await patientService.create(patientBruno)
  }
}

/**
 * ==================
 * CREATE SECRETARIES
 * ==================
 */
async function createSecretaries() {
  const joaoRecovered = await userService.findByEmail(pepe.email)
  if (joaoRecovered) {
    const secreataryJoao: SecretaryCreateRequest = {
      userId: joaoRecovered.id,
    }
    await secretaryService.create(secreataryJoao)
  }
}

/**
 * ===============
 * CREATE DENTISTS
 * ===============
 */
async function createDentists() {
  const gabiRecovered = await userService.findByEmail(gabi.email)
  if (gabiRecovered) {
    const dentistGabi: DentistCreateRequest = {
      cro: "1234567",
      user: gabi,
    }
    await dentistService.create(dentistGabi)
  }
}

/**
 * ================
 * ADD ROLE TO USER
 * ================
 */
async function addRoleToUser() {
  const pacienteBruno = await patientService.findByEmail(
    "bruno.carneiro@gmail.com"
  )
  const dentistaGabi = await dentistService.findByCRO("1234567")
  const secretariaJoao = await secretaryService.findByEmail("pepe@gmail.com")

  const usersValid = !pacienteBruno || !dentistaGabi || !secretariaJoao

  if (usersValid) {
    throw "ERRO: Não foi possível encontrar os usuários"
  }

  const roleAdmin = await roleService.findByName("admin")
  const rolePaciente = await roleService.findByName("paciente")
  const roleSecretaria = await roleService.findByName("secretaria")
  const roleDentista = await roleService.findByName("dentista")

  const rolesValid =
    !rolePaciente || !roleAdmin || !roleSecretaria || !roleDentista

  if (rolesValid) {
    throw "Não foi possível encontrar a permissão"
  }

  if (!pacienteBruno.id || !dentistaGabi.id || !secretariaJoao.id) {
    throw "Não foi possível recuperar o id do usuário"
  }

  const pacienteUserIsValid =
    pacienteBruno && pacienteBruno.user && pacienteBruno.user.id

  const dentistaUserIsValid =
    dentistaGabi && dentistaGabi.user && dentistaGabi.user.id

  const secretariaUserIsValid = secretariaJoao && secretariaJoao.user.id

  const valid =
    pacienteUserIsValid && dentistaUserIsValid && secretariaUserIsValid

  if (!valid) {
    throw "ERRO: Não foi possível encontrar o usuário do paciente"
  }

  const pacienteUser = await userService.findById(pacienteBruno.user!.id)
  const dentistaUser = await userService.findById(dentistaGabi.user.id)
  const secretariaUser = await userService.findById(secretariaJoao.user.id)

  if (!pacienteUser || !dentistaUser || !secretariaUser) {
    throw "ERRO: Não foi possível encontrar o usuário do paciente"
  }

  await userRoleService.addRoleToUser([roleAdmin, rolePaciente], pacienteUser)
  await userRoleService.addRoleToUser([roleDentista], dentistaUser)
  await userRoleService.addRoleToUser([roleSecretaria], secretariaUser)
}

/**
 * =================
 * CREATE PROCEDURES
 * =================
 */
async function createProcedures() {
  const periodontia = {
    name: "Periodontia",
    price: 100,
  }

  const ortodontia = {
    name: "Ortodontia",
    price: 150,
  }

  const endodontia = {
    name: "Endodontia",
    price: 200,
  }

  await procedureService.create(periodontia)
  await procedureService.create(ortodontia)
  await procedureService.create(endodontia)
}

/**
 * ========================
 * CREATE HEALTH INSURANCES
 * ========================
 */
async function createHealthInsurances() {
  await healthInsuranceService.create({
    name: "Amil",
    code: "001",
  })

  await healthInsuranceService.create({
    name: "GoldenCross",
    code: "002",
  })

  await healthInsuranceService.create({
    name: "Pro social",
    code: "003",
  })
}

/**
 * ===============================
 * ADD PATIENT TO HEALTH INSURANCE
 * ===============================
 */
async function addPatientToHealhInsurance() {
  try {
    const patientBruno = await patientService.findByEmail(
      "bruno.carneiro@gmail.com"
    )

    if (!patientBruno || !patientBruno.id) {
      throw "Não foi possível encontrar o paciente"
    }

    const amil = await healthInsuranceService.findByCode("001")
    const goldenCross = await healthInsuranceService.findByCode("002")

    if (!amil || !goldenCross) {
      throw "Não foi possível encontrar os convênios"
    }

    if (amil.id && goldenCross.id) {
      await patientHealthInsuranceService.addHealthInsuranceToPatient(
        amil.id,
        patientBruno.id
      )

      await patientHealthInsuranceService.addHealthInsuranceToPatient(
        goldenCross.id,
        patientBruno.id
      )
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * =========================
 * ADD PROCEDURE TO DENTISTS
 * =========================
 */
async function addProcedureToDentist() {
  const dentistGabi = await dentistService.findByCRO("1234567")
  const ortodontia = await procedureService.findByName("ortodontia")
  const patientBruno = await patientService.findByEmail(
    "bruno.carneiro@gmail.com"
  )

  if (!ortodontia || !dentistGabi || !patientBruno) {
    throw "Erro ao buscar registros"
  }

  await dentistProcedureService.addProcedureToDentistAndPatient({
    dentistId: dentistGabi.id,
    procedureId: ortodontia.id,
    scheduled_for: new Date(),
    patientId: patientBruno.id,
  })
}

/**
 * ======================
 * CREATE EXTRA ORAL EXAM
 * ======================
 */
async function createExameFisicoExtraOral() {
  const patient = await patientService.findByEmail("bruno.carneiro@gmail.com")

  if (!patient) throw "Patient not found"

  const extraOralExam = {
    patientId: patient.id,
    skin: "pardo",
    facialSimmetry: "moderado",
    earJawArticulation: "normal",
    linfonodos: "nenhum",
  }

  await exameFisicoExtraOralService.create(extraOralExam)
}

/**
 * ======================
 * CREATE INTRA ORAL EXAM
 * ======================
 */
async function createExameFisicoIntraOral() {
  const patient = await patientService.findByEmail("bruno.carneiro@gmail.com")

  if (!patient) throw "Patient not found"

  const intraOralExam = {
    patientId: patient.id,
    lips: "labios normais",
    tongue: "lingua normal",
    buccalFloor: "assoalho normal",
    hardPalate: "palato duro normal",
    softPalate: "palato mole normal",
    mucosaJugal: "mucosa julgal normal",
    mucosaAleolar: "mucosa aleolar normal",
    orofaringeRetromolar: "normal",
    injuryDescription: "nenhuma lesão",
  }

  await exameFisicoIntraOralService.create(intraOralExam)
}

/**
 * ======================
 * CREATE MEDICAL HISTORY
 * ======================
 */
type MedicalHistoryRequestType = {
  description: string
  patientId: string
  dentistId: string
}

type MedicalHistoryResponseType = {
  id: string
  description: string
  patientId: string
  dentistId: string
}

async function createMedicalHistory() {
  const patientBruno = await patientService.findByEmail(
    "bruno.carneiro@gmail.com"
  )
  const dentistGabi = await dentistService.findByCRO("1234567")

  if (patientBruno && dentistGabi) {
    const _medicalHistoryRequest: MedicalHistoryRequestType = {
      description: "Histórico odontológico",
      patientId: patientBruno.id,
      dentistId: dentistGabi.id,
    }

    await medicalHistoryService.create(_medicalHistoryRequest)
  }
}

async function createAnamnese() {
  const patientBruno = await patientService.findByEmail(
    "bruno.carneiro@gmail.com"
  )

  const anamneseCreateRequest: AnamneseCreateRequest = {
    reasonForConsultation: "dor de dente",
    isUnderMedicalTreatment: false,
    takeSomeMedicine: true,
    medicationsUsed: "Alopurinol / Colchicina",
    familyHistoryOfIllnesses: "Gota, Diabetes, Problemas Renais",
    everHadHypertensionHeartAttackOrOther: false,
    everHadHypertensionHeartAttackOrOtherDescription: "",
    everHadRheumaticFever: false,
    everHadRheumaticFeverDescription: "",
    everHadCancer: false,
    everHadCancerDescription: "",
    everHadDiabetes: false,
    everHadDiabetesDescription: "",
    everHadClottingRelatedProblems: false,
    everHadClottingRelatedProblemsDescription: "",
    everHadReactionToPenicillin: false,
    everHadReactionToPenicillinDescription: "",
    everHadHepatitis: false,
    everHadHepatitisDescription: "",
    haveBeenVaccinatedAgainstHepatitisB: true,
    anyLiverProblems: false,
    anyLiverProblemsDescription: "",
    anyKidneyProblems: true,
    anyKidneyProblemsDescription: "kidney stones",
    everHadReactionAgainstAnesthesia: false,
    everHadReactionAgainstAnesthesiaDescription: "",
    isPregnant: false,
    isPregnantDescription: "",
    wasSmoker: false,
    wasSmokerDescription: "",
    isSmoker: false,
    isSmokerDescription: "",
    drinksAlchol: true,
    drinksAlcholDescription: "um dia por semana aos finais de semana",
    useDrugs: false,
    useDrugsDescription: "",
    patientId: patientBruno.id,
  }

  await anamneseService.create(anamneseCreateRequest)
}

async function createArchive() {
  const userBruno = await userService.findByEmail("bruno.carneiro@gmail.com")

  const buffer = Buffer.from("")

  const archiveCreateRequest: ArchiveCreateRequest = {
    userId: userBruno.id,
    title: "perfil",
    extension: "jpg",
    blob: buffer,
    checksum: "",
  }

  await archiveService.create(archiveCreateRequest)
}

async function main() {
  console.log()
  console.log("Seeding database ...")
  console.log()

  await createRoles()
  console.log(
    "Criando permissões ............................................. [✔]"
  )

  await createUsers()
  console.log(
    "Criando usuários ............................................... [✔]"
  )

  await createPatients()
  console.log(
    "Criando pacientes .............................................. [✔]"
  )

  await createSecretaries()
  console.log(
    "Criando secretárias ............................................ [✔]"
  )

  await createDentists()
  console.log(
    "Criando dentistas .............................................. [✔]"
  )

  await addRoleToUser()
  console.log(
    "Adicionando permissão ao usuário ............................... [✔]"
  )

  await createProcedures()
  console.log(
    "Criando procedimento ........................................... [✔]"
  )

  await createHealthInsurances()
  console.log(
    "Criando seguro de saúde ........................................ [✔]"
  )

  await addPatientToHealhInsurance()
  console.log(
    "Adicionando paciente ao seguro de saúde ........................ [✔]"
  )

  await addProcedureToDentist()
  console.log(
    "Adicionando procedimento ao dentista ........................... [✔]"
  )

  await createExameFisicoIntraOral()
  console.log(
    "Criando exame intra oral ....................................... [✔]"
  )

  await createExameFisicoExtraOral()
  console.log(
    "Criando exame extra oral ....................................... [✔]"
  )

  await createMedicalHistory()
  console.log(
    "Criando histórico médico ....................................... [✔]"
  )

  await createAnamnese()
  console.log(
    "Criando anamnese ............................................... [✔]"
  )

  await createArchive()
  console.log(
    "Criando arquivo ................................................ [✔]"
  )

  console.log()
  console.log("Done!")
}

main()
  .catch(async (e) => {
    console.error(e)
  })
  .finally(() => {
    prisma.$disconnect
    process.exit(0)
  })
