import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { TestRunsService } from './test-runs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('test-runs')
@UseGuards(AuthGuard('jwt'))
export class TestRunsController {
    constructor(private readonly testRunsService: TestRunsService) { }

    @Post(':projectId')
    create(@Param('projectId') projectId: string) {
        return this.testRunsService.create(projectId);
    }

    @Get('project/:projectId')
    findAll(@Param('projectId') projectId: string) {
        return this.testRunsService.findAll(projectId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testRunsService.findOne(id);
    }
}
