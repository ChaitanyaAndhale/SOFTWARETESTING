import { Injectable, Logger } from '@nestjs/common';
import Docker from 'dockerode';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PlaywrightService {
    private readonly logger = new Logger(PlaywrightService.name);
    private docker: Docker;

    constructor() {
        this.docker = new Docker({ socketPath: '//./pipe/docker_engine' }); // Windows pipe
    }

    async runTest(testRunId: string, url: string, scriptContent: string) {
        this.logger.log(`Starting Playwright test for ${testRunId}`);

        // 1. Create a temporary test file
        const testDir = path.resolve('temp', testRunId);
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }
        fs.writeFileSync(path.join(testDir, 'test.spec.ts'), scriptContent);

        // 2. Define Docker container config
        const containerConfig = {
            Image: 'mcr.microsoft.com/playwright:v1.40.0-jammy',
            Cmd: ['npx', 'playwright', 'test'],
            Tty: true,
            HostConfig: {
                Binds: [`${testDir}:/tests`],
                AutoRemove: true,
            },
            WorkingDir: '/tests',
        };

        try {
            // 3. Run Container (Mock implementation for now)
            // await this.docker.createContainer(containerConfig).then(container => container.start());
            this.logger.log('Docker container started (mock)');
            return { status: 'STARTED' };
        } catch (error) {
            this.logger.error('Failed to start Docker container', error);
            throw error;
        }
    }
}
