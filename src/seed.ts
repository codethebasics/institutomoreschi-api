import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {

    const role = await prisma.role.create({
        data: {
            name: 'admin',
            description: 'Administrador do sistema'
        }        
    })
    console.log(role)

    const user = await prisma.user.create({ 
        data: {
            name: 'Bruno Carneiro',
            email: 'bruno.carneiro312@gmail.com',
            password: 'teste',
        }
    })

    const usuarios_permissoes = await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: role.id
        }
    })
    console.log('Permissões atribuídas com sucesso', usuarios_permissoes)

    console.log(user)
}

main()
    .then(async() => {
        await prisma.$disconnect
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect
        process.exit(1)
    })