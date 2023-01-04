import { Role, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export default class UserRoleService {    
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addRoleToUser(role: Role[], user: User) {
        role.forEach(role => {
            this.prisma.userRole.create({
                data: {
                    roleId: role.id,
                    userId: user.id
                }
            })
        })
    }
}