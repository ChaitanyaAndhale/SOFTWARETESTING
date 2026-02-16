import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    create(userId: string, data: { name: string; description?: string; fileName: string }) {
        return this.prisma.project.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    findAll(userId: string) {
        return this.prisma.project.findMany({ where: { userId } });
    }

    findOne(id: string) {
        return this.prisma.project.findUnique({ where: { id } });
    }
}
