import { ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiCreatedResponse({ type: Cat, description: 'The record has been successfully created.'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @ApiOkResponse({type: Cat, isArray: true})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  async findAll(@Req() req): Promise<Cat[]> {
    console.log(req);
    return this.catsService.findAll();
  }
}
