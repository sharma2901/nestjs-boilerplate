import { Request as Req } from 'express';
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './schemas/create-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ForbiddenException, NotFoundException } from '../utils/exceptions';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id) {
    const admin = await this.adminService.findById(id);
    if (!admin) {
      throw new NotFoundException({
        message: `Can not find admin with id ${id}`,
      });
    }
    return admin;
  }

  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const found = await this.adminService.findOne({ email });
    if (!found) {
      throw new NotFoundException({
        message: `Can not find admin with email ${email}`,
      });
    }
    const admin = found.toObject();
    delete admin.hashedPassword;
    return admin;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAdminDto: CreateAdminDto) {
    const query = {
      email: createAdminDto.email.toLowerCase(),
    };
    const found = await this.adminService.findOne(query);

    if (found) {
      let errorMsg = 'Admin already registered';
      if (found.email === createAdminDto.email) {
        errorMsg = 'Email is already registered';
      }
      throw new ForbiddenException({
        message: errorMsg,
      });
    }

    const res = await this.adminService.create(createAdminDto);
    const adminCreated = res.toObject();
    delete adminCreated.hashedPassword;
    return adminCreated;
  }
}
