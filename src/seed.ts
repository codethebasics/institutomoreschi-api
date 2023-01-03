import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient()


const bruno = {
    id: undefined,
    name: 'Bruno Carneiro',
    email: 'bruno.carneiro@gmail.com',
    password: randomUUID()
}

const joao = {
    id: undefined,
    name: 'João Pedro Ferreira Almeida',
    email: 'joao@email.com',
    password: randomUUID()
}

const gabi = {
    id: undefined,
    name: 'Gabriela Moreschi',
    email: 'gabi@email.com',
    password: randomUUID()
}

const createUsers = async () => {
    const users = [bruno, joao, gabi]
    const response = await prisma.user.createMany({
        data: users
    })
    console.log('criando usuários', response)
}


const createRoles = async () => {
    const admin = { name: 'admin', description: 'Administrador do sistema' }
    const secretary = { name: 'secretaria', description: 'Secretária da clínica' }
    const patient = { name: 'paciente', description: 'Paciente da clínica'}
    const dentist = { name: 'dentista', description: 'Dentista da clínica'}
    const roles = [admin, secretary, patient, dentist]

    const response = await prisma.role.createMany({
        data: roles
    })
    console.log('Criando permissões', response)
}

const createPatients = async () => {
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
}

async function main() {
    await createUsers();
    await createRoles();
    await createPatients();
    await createSecretaries();
    await createDentists();
    await createHealthInsurances();
    await createProcedures();
}

main()
    .catch(async (e) => {
        console.error(e)
    })
    .finally(() => {
        prisma.$disconnect;
        process.exit(0)
    })

