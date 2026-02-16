import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TestRunsModule } from './test-runs/test-runs.module';
import { PlaywrightModule } from './playwright/playwright.module';

@Module({
  imports: [PrismaModule, AuthModule, ProjectsModule, TestRunsModule, PlaywrightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
