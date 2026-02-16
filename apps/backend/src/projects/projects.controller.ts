import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Request() req, @Body() createProjectDto: { name: string; description?: string; fileName: string }) {
        return this.projectsService.create(req.user.userId, createProjectDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.projectsService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }
}
