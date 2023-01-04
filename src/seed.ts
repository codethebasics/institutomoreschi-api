import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { randomUUID } from "crypto";

import PatientService from "./services/PatientService";
import RoleService from "./services/RoleService";
import UserService from "./services/UserService";

const prisma = new PrismaClient()
const userService = new UserService()
const patientService = new PatientService()
const roleService = new RoleService()

const bruno = {
    id: randomUUID(),
    name: 'Bruno Carneiro',
    email: 'bruno.carneiro@gmail.com',
    password: randomUUID(),
    active: UserStatus.ACTIVE
};

const pepe = {
    id: randomUUID(),
    name: 'João Pedro',
    email: 'pepe@gmail.com',
    password: randomUUID()
};

const gabi = {
    id: randomUUID(),
    name: 'Gabriela Moreschi',
    email: 'gabi@gmail.com',
    password: randomUUID()
}

async function createUsers() {    
    const brunoCreated = await userService.create(bruno);
    const pepeCreated = await userService.create(pepe);
    const gabiCreated = await userService.create(gabi); 
    console.log('User criado: ', brunoCreated)   
    console.log('User criado: ', pepeCreated)   
    console.log('User criado: ', gabiCreated)   
}

// Criando Roles
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

// Criando pacientes
async function createPatients() {
   
}

// Adicionando permissões aos usuários
async function adicionarPermissaoAoUsuario() {
    
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
    //await createPatients();
    //await createSecretaries();
    //await createDentists();
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

