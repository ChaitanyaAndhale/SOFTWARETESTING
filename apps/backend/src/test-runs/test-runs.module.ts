import { Module } from '@nestjs/common';
import { TestRunsService } from './test-runs.service';
import { TestRunsController } from './test-runs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PlaywrightModule } from '../playwright/playwright.module';

@Module({
    imports: [PrismaModule, PlaywrightModule],
    controllers: [TestRunsController],
    providers: [TestRunsService],
})
export class TestRunsModule { }
