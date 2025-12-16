import { 
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards, 
  UseInterceptors, UploadedFile, Inject // <--- 1. Importa o Inject
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storageConfig = diskStorage({
  destination: './server/uploads',
  filename: (req: any, file: any, callback: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(PostsService) // <--- 2. Adiciona esta linha
    private readonly postsService: PostsService
  ) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string) {
    if (!isNaN(Number(idOrSlug))) {
      return this.postsService.findOne(Number(idOrSlug));
    }
    return this.postsService.findBySlug(idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig }))
  create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      body.image = `/uploads/${file.filename}`;
    }
    return this.postsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig }))
  update(@Param('id') id: string, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      body.image = `/uploads/${file.filename}`;
    }
    return this.postsService.update(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(Number(id));
  }
}