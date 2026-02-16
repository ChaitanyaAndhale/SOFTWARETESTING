import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestRunsService {
    constructor(private prisma: PrismaService) { }

    create(projectId: string) {
        return this.prisma.testRun.create({
            data: {
                projectId,
                status: 'PENDING',
            },
        });
    }

    findAll(projectId: string) {
        return this.prisma.testRun.findMany({ where: { projectId } });
    }

    findOne(id: string) {
        return this.prisma.testRun.findUnique({ where: { id } });
    }
}
