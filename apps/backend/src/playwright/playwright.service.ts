import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { spawn } from 'child_process';

@Injectable()
export class PlaywrightService {
    private readonly logger = new Logger(PlaywrightService.name);

    constructor() { }

    async runTest(testRunId: string, fileName: string) {
        this.logger.log(`Starting Playwright test for ${testRunId} with file ${fileName}`);

        const uploadPath = path.resolve('uploads', fileName);
        const testDir = path.resolve('temp', testRunId);

        // 1. Unzip the project
        try {
            if (!fs.existsSync(testDir)) {
                fs.mkdirSync(testDir, { recursive: true });
            }
            if (!fs.existsSync(uploadPath)) {
                throw new Error(`Project file not found: ${uploadPath}`);
            }

            const zip = new AdmZip(uploadPath);
            zip.extractAllTo(testDir, true);
            this.logger.log(`Extracted project to ${testDir}`);
        } catch (error) {
            this.logger.error('Failed to unzip project', error);
            throw error;
        }

        // 2. Install dependencies and Run Test
        return new Promise<{ status: string; logs: string; qualityScore?: number }>((resolve, reject) => {
            const child = spawn('cmd.exe', ['/c', 'npm install && npx playwright test'], {
                cwd: testDir,
                // stdio: 'pipe', // Default
                shell: true
            });

            let logs = '';

            child.stdout.on('data', (data) => {
                const chunk = data.toString();
                logs += chunk;
                this.logger.log(chunk);
            });

            child.stderr.on('data', (data) => {
                const chunk = data.toString();
                logs += chunk;
                this.logger.error(chunk);
            });

            child.on('close', (code) => {
                this.logger.log(`Test process exited with code ${code}`);
                // Cleanup
                // fs.rmSync(testDir, { recursive: true, force: true });

                if (code === 0) {
                    resolve({ status: 'COMPLETED', logs, qualityScore: 100 });
                } else {
                    resolve({ status: 'FAILED', logs }); // Resolve as FAILED, don't reject promise to avoid crashing service
                }
            });

            child.on('error', (err) => {
                logs += `\nSpawn error: ${err.message}`;
                resolve({ status: 'FAILED', logs });
            });
        });
    }
}
