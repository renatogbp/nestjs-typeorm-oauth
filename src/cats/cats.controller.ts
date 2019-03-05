import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiCreatedResponse({ type: Cat, description: 'The record has been successfully created.'})
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @ApiOkResponse({type: Cat, isArray: true})
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
