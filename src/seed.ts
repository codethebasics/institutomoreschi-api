import { PrismaClient, UserStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { DentistCreateRequest } from "./interfaces/request/dentists/DentistCreateRequest";
import { PatientCreateRequest } from "./interfaces/request/patient/PatientCreateRequest";
import { SecretaryCreateRequest } from "./interfaces/request/secretary/SecreataryCreateRequest";
import DentistService from "./services/DentistService";

import PatientService from "./services/PatientService";
import RoleService from "./services/RoleService";
import SecretaryService from "./services/SecretaryService";
import UserService from "./services/UserService";

const prisma = new PrismaClient()
const userService = new UserService()
const patientService = new PatientService()
const roleService = new RoleService()
const secretaryService = new SecretaryService()
const dentistService = new DentistService()

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

/*const createPatients = async () => {

    const userBruno = await prisma.user.findUnique({
        where: {
            email: bruno.email
        }
    })
    if (userBruno) {
        const response = await prisma.patient.create({
            data: {
                birth_date: new Date(),
                health_insurance_card_number: '111222333',
                userId: userBruno.id
            },        
        })
        console.log('Criando pacientes', response)
    }
}

const createSecretaries = async () => {
    const userJoao = await prisma.user.findUnique({
        where: {
            email: joao.email
        }
    })
    if (userJoao) {
        const response = await prisma.secretary.create({
            data: {
                userId: userJoao.id
            }
        })
        console.log('Criando secretárias', response)
    }
}

const createDentists = async () => {
    const userGabi = await prisma.user.findUnique({
        where: {
            email: gabi.email
        }
    })
    if (userGabi) {
        const response = await prisma.dentist.create({
            data: {
                cro: '1111',
                userId: userGabi.id
            }
        })
        console.log('Criando dentistas', response)
    }
}

const createHealthInsurances = async () => {
    const amil = { name: 'Amil', code: '001' };
    const goldenCross = { name: 'Golden Cross', code: '002' };
    const proSocial = { name: 'ProSocial', code: '002' };
    const healthInsurances = [amil, goldenCross, proSocial]
    const response = await prisma.healthInsurance.createMany({
        data: healthInsurances
    })
    console.log('Criando convênios', response)
}

const createProcedures = async () => {
    const endodontia = { name: 'Endodontia', price: 50 }
    const periodontia = { name: 'Periodontia', price: 55 }
    const ortodontia = { name: 'Ortodontia', price: 60 }
    const procedures = [endodontia, periodontia, ortodontia]
    const response = await prisma.procedure.createMany({
        data: procedures
    })
    console.log('Criando procedimentos', response)
}*/

async function main() {
    await createRoles();
    await createUsers();
    await createPatients();
    await createSecretaries();
    await createDentists();
    //await createHealthInsurances();
    //await createProcedures();
}

main()
    .catch(async (e) => {
        console.error(e)
    })
    .finally(() => {
        prisma.$disconnect;
        process.exit(0)
    })

