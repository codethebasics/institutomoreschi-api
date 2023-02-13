import { PrismaClient } from "@prisma/client"

export default class ArchiveRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<any> {
    return await this.prisma.archive.findMany({
      select: {
        id: true,
        title: true,
        extension: true,
        blob: true,
        checksum: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            active: true,
            created_at: true,
            updated_at: true,
            user_role: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.archive.findUnique({
      select: {
        id: true,
        title: true,
        extension: true,
        blob: true,
        checksum: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            active: true,
            created_at: true,
            updated_at: true,
            user_role: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: id,
      },
    })
  }

  async create(archive: any): Promise<any> {
    return await this.prisma.archive.create({
      data: {
        title: archive.title,
        extension: archive.extension,
        blob: archive.blob,
        checksum: archive.checksum,
        userId: archive.userId,
      },
      select: {
        id: true,
        title: true,
        extension: true,
        blob: true,
        checksum: true,
      },
    })
  }

  async update(archive: any) {
    return await this.prisma.archive.update({
      data: {
        title: archive.title,
        extension: archive.extension,
        blob: archive.blob,
        checksum: archive.checksum,
        userId: archive.userId,
      },
      where: {
        id: archive.id,
      },
      select: {
        id: true,
        title: true,
        extension: true,
        blob: true,
        checksum: true,
      },
    })
  }

  async remove(archive: any) {
    return await this.prisma.archive.delete({
      where: {
        id: archive.id,
      },
      select: {
        id: true,
        title: true,
        extension: true,
        blob: true,
        checksum: true,
      },
    })
  }
}
