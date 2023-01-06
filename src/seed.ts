import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { DentistCreateRequest } from "./interfaces/dto/dentist/DentistDTO";
import { PatientCreateRequest } from "./interfaces/dto/patient/PatientDTO";
import { SecretaryCreateRequest } from "./interfaces/dto/secretary/SecretaryDTO";
import { UserCreateRequest } from "./interfaces/dto/user/UserDTO";

import DentistProcedureService from "./services/DentistProcedureService";
import DentistService from "./services/DentistService";
import HealthInsuranceService from "./services/HealthInsuranceService";
import PacientHealthInsuranceService from "./services/PacientHealthInsuranceService";
import PatientService from "./services/PatientService";
import ProcedureService from "./services/ProcedureService";
import RoleService from "./services/RoleService";
import SecretaryService from "./services/SecretaryService";
import UserRoleService from "./services/UserRoleService";
import UserService from "./services/UserService";

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

// =======
// USER #1
// =======
let bruno: UserCreateRequest = {
    name: 'Bruno Carneiro',
    email: 'bruno.carneiro@gmail.com',
    password: randomUUID()
};

// =======
// USER #2
// =======
let pepe: UserCreateRequest = {
    name: 'João Pedro',
    email: 'pepe@gmail.com',
    password: randomUUID()
};

// =======
// USER #3
// =======
let gabi: UserCreateRequest = {
    name: 'Gabriela Moreschi',
    email: 'gabi@gmail.com',
    password: randomUUID()
}

/**
 * ============
 * CREATE ROLES
 * ============
 */
 async function createRoles() {
    const admin = { name: 'admin', description: 'Administrador do sistema' }
    const secretary = { name: 'secretaria', description: 'Secretária da clínica' }
    const patient = { name: 'paciente', description: 'Paciente da clínica'}
    const dentist = { name: 'dentista', description: 'Dentista da clínica'}
    
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
    await userService.create(bruno);
    await userService.create(pepe);
    await userService.create(gabi); 
}

/**
 * ===============
 * CREATE PATIENTS
 * ===============
 */
async function createPatients() {
    const brunoRecovered = await userService.findByEmail(bruno.email);
    if (brunoRecovered) {
        const patientBruno: PatientCreateRequest = {
            birth_date: new Date('1987-07-29'),
            health_insurance_card_number: '7777777',
            userId: brunoRecovered.id
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
            userId: joaoRecovered.id
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
            cro: '1234567',
            userId: gabiRecovered.id
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
    const pacienteBruno = await patientService.findByEmail('bruno.carneiro@gmail.com')
    
    if (!pacienteBruno) {
        throw "Não foi possível encontrar o paciente"
    }

    const pacienteRoleAdmin = await roleService.findByName('paciente')
    const pacienteRolePaciente = await roleService.findByName('admin')
    const pacientes = [pacienteRoleAdmin, pacienteRolePaciente]
    
    if (!pacienteRolePaciente || !pacienteRoleAdmin) {
        throw "Não foi possível encontrar a permissão"
    }

    const pacienteUser = await userService.findById(pacienteBruno.userId)

    if (!pacienteUser) {
        throw "Não foi possível encontrar o usuário do paciente"
    }

    await userRoleService.addRoleToUser(pacientes, pacienteUser)
}

/**
 * =================
 * CREATE PROCEDURES
 * =================
 */
async function createProcedures() {

    const periodontia = {
        name: 'Periodontia',
        price: 100
    }

    const ortodontia = {
        name: 'Ortodontia',
        price: 150
    }

    const endodontia = {
        name: 'Endodontia',
        price: 200
    }

    const procedures = [periodontia, ortodontia, endodontia]

    await procedureService.createMany(procedures)
}

/**
 * ========================
 * CREATE HEALTH INSURANCES
 * ========================
 */
async function createHealthInsurances() {
    await healthInsuranceService.create({
        name: 'Amil',
        code: '001'
    })

    await healthInsuranceService.create({
        name: 'GoldenCross',
        code: '002'
    })

    await healthInsuranceService.create({
        name: 'Pro social',
        code: '003'
    })
}

/**
 * ===============================
 * ADD PATIENT TO HEALTH INSURANCE
 * ===============================
 */
async function addPatientToHealhInsurance() {
    const patientBruno = await patientService.findByEmail('bruno.carneiro@gmail.com')

    if (!patientBruno) {
        throw "Não foi possível encontrar o paciente"
    }

    const amil = await healthInsuranceService.findByCode('001')
    const goldenCross = await healthInsuranceService.findByCode('002')

    if (!amil || !goldenCross) {
        throw "Não foi possível encontrar os convênios"
    }
    
    await patientHealthInsuranceService
        .addHealthInsuranceToPatient(amil.id, patientBruno.id)
    
    await patientHealthInsuranceService
        .addHealthInsuranceToPatient(goldenCross.id, patientBruno.id)
    
}

/**
 * =========================
 * ADD PROCEDURE TO DENTISTS
 * =========================
 */
async function addProcedureToDentist() {
    const dentistGabi = await dentistService.findByCRO("1234567")
    const ortodontia = await procedureService.findByName("ortodontia")
    const patientBruno = await patientService.findByEmail('bruno.carneiro@gmail.com')

    if (!ortodontia || !dentistGabi || !patientBruno) {
        throw "Erro ao buscar registros"
    }
    
    await dentistProcedureService
        .addProcedureToDentistAndPatient(
            ortodontia.id, 
            dentistGabi.id, 
            patientBruno.id)
}

async function main() {

    console.log()
    console.log('Seeding database ...')
    console.log()

    await createRoles();
    console.log('Criando permissões ............................................. [✔]')    
    
    await createUsers();
    console.log('Criando usuários ............................................... [✔]')    
    
    await createPatients();
    console.log('Criando pacientes .............................................. [✔]')    
    
    await createSecretaries();
    console.log('Criando secretárias ............................................ [✔]')    
    
    await createDentists();
    console.log('Criando dentistas .............................................. [✔]')    
    
    await addRoleToUser()
    console.log('Adicionando permissão ao usuário ............................... [✔]')    
    
    await createProcedures();
    console.log('Criando procedimento ........................................... [✔]')    
    
    await createHealthInsurances();
    console.log('Criando seguro de saúde .......................................  [✔]')    
    
    await addPatientToHealhInsurance();
    console.log('Adicionando paciente ao seguro de saúde .......................  [✔]')    
    
    await addProcedureToDentist();
    console.log('Adicionando procedimento ao dentista ........................... [✔]')    
}

main()
    .catch(async (e) => {
        console.error(e)
    })
    .finally(() => {
        prisma.$disconnect;
        process.exit(0)
    })

