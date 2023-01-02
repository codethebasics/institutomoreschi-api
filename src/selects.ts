import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    const patients = await prisma.patient.findMany()
    console.log(patients)
}

main()
    .then(() => console.log('Concluído com sucesso.'))
    .catch(e => console.error(e))
    .finally(() => {
        prisma.$disconnect;
        process.exit(0);
    })