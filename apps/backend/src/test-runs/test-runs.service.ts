import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaywrightService } from '../playwright/playwright.service';

@Injectable()
export class TestRunsService {
    constructor(
        private prisma: PrismaService,
        private playwrightService: PlaywrightService
    ) { }

    async create(projectId: string) {
        const testRun = await this.prisma.testRun.create({
            data: {
                projectId,
                status: 'PENDING',
            },
        });

        // Fetch Project to get the filename
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project) {
            await this.prisma.testRun.update({
                where: { id: testRun.id },
                data: { status: 'FAILED', logs: 'Project not found' }
            });
            return testRun;
        }

        // Trigger Playwright Service with real filename
        this.playwrightService.runTest(testRun.id, project.fileName)
            .then(async (result) => {
                await this.prisma.testRun.update({
                    where: { id: testRun.id },
                    data: { status: result.status, qualityScore: result.qualityScore, logs: result.logs }
                });
            })
            .catch(async (err) => {
                await this.prisma.testRun.update({
                    where: { id: testRun.id },
                    data: { status: 'FAILED', logs: err.message }
                });
            });

        return testRun;
    }

    findAll(projectId: string) {
        return this.prisma.testRun.findMany({ where: { projectId } });
    }

    findOne(id: string) {
        return this.prisma.testRun.findUnique({ where: { id } });
    }
}
