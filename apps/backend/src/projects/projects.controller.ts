import { Controller, Get, Post, Body, UseGuards, Request, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File, @Body() body: { name: string; description?: string }) {
        if (!file) {
            throw new Error('File is not uploaded');
        }
        return this.projectsService.create(req.user.userId, {
            name: body.name,
            description: body.description,
            fileName: file.filename
        });
    }

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
