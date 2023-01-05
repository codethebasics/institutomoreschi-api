import { PrismaClient, UserStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { DentistCreateRequest } from "./interfaces/request/dentists/DentistCreateRequest";
import { PatientCreateRequest } from "./interfaces/request/patient/PatientCreateRequest";
import { SecretaryCreateRequest } from "./interfaces/request/secretary/SecreataryCreateRequest";
import DentistService from "./services/DentistService";

import PatientService from "./services/PatientService";
import ProcedureService from "./services/ProcedureService";
import RoleService from "./services/RoleService";
import SecretaryService from "./services/SecretaryService";
import UserRoleService from "./services/UserRoleService";
import UserService from "./services/UserService";
import HealthInsuranceService from "./services/HealthInsuranceService";

const prisma = new PrismaClient()
const userService = new UserService()
const patientService = new PatientService()
const roleService = new RoleService()
const secretaryService = new SecretaryService()
const dentistService = new DentistService()
const userRoleService = new UserRoleService()
const procedureService = new ProcedureService()
const healthInsuranceService = new HealthInsuranceService()

// =======
// USER #1
// =======
let bruno = {
    name: 'Bruno Carneiro',
    email: 'bruno.carneiro@gmail.com',
    password: randomUUID(),
    active: UserStatus.ACTIVE
};

// =======
// USER #2
// =======
let pepe = {
    name: 'João Pedro',
    email: 'pepe@gmail.com',
    password: randomUUID()
};

// =======
// USER #3
// =======
let gabi = {
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
        const response = await roleService.create(role)
        console.log('Role criada: ', response)
    }    
}

/**
 * ============
 * CREATE USERS
 * ============
 */
async function createUsers() {    
    const brunoCreated = await userService.create(bruno);
    const pepeCreated = await userService.create(pepe);
    const gabiCreated = await userService.create(gabi); 
    console.log('User criado: ', brunoCreated)   
    console.log('User criado: ', pepeCreated)   
    console.log('User criado: ', gabiCreated)
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
            birth_date: new Date('1987-07-29'),
            health_insurance_card_number: '7777777',
            userId: brunoRecovered.id
        }
        const response = await patientService.create(patientBruno)
        console.log('paciente criado:', response)
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
        const response = await secretaryService.create(secreataryJoao)
        console.log('secretária criada:', response)
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
        const response = await dentistService.create(dentistGabi)
        console.log('dentista criado:', response)
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

    const response = await userRoleService.addRoleToUser(pacientes, pacienteUser)

    response 
        ? console.log("Permissões atribuídas com sucesso", response)
        : console.log("Erro ao atribuir as permissões")
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

    const response = await procedureService.createMany(procedures)
    console.log('Procedimentos criados com sucesso')
}

/**
 * ========================
 * CREATE HEALTH INSURANCES
 * ========================
 */
async function createHealthInsurances() {
    const amil = await healthInsuranceService.create({
        name: 'Amil',
        code: '001'
    })

    const goldenCross = await healthInsuranceService.create({
        name: 'GoldenCross',
        code: '002'
    })

    const proSocial = await healthInsuranceService.create({
        name: 'Pro social',
        code: '003'
    })

    console.log('Convênios criados com sucesso')
    console.log(amil, goldenCross, proSocial)
}

async function main() {
    await createRoles();
    await createUsers();
    await createPatients();
    await createSecretaries();
    await createDentists();
    await addRoleToUser()
    await createProcedures();
    await createHealthInsurances();
}

main()
    .catch(async (e) => {
        console.error(e)
    })
    .finally(() => {
        prisma.$disconnect;
        process.exit(0)
    })

