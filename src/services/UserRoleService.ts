import { Role, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export default class UserRoleService {    
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addRoleToUser(role: Role[], user: any): Promise<Boolean> {
        try {
            for (let r of role) {
                await this.prisma.userRole.create({
                    data: {
                        roleId: r.id,
                        userId: user.id
                    }
                })
            }
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }
}