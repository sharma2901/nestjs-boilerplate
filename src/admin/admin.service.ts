import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './schemas/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await hash(createAdminDto.password, 10);
    const createdAdmin = new this.adminModel({
      hashedPassword,
      ...createAdminDto,
    });
    return createdAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().select('-hashedPassword').exec();
  }

  async findById(id: string): Promise<Admin> {
    return this.adminModel.findById(id).select('-hashedPassword').exec();
  }

  async findOne(obj: any): Promise<Admin> {
    return this.adminModel.findOne(obj).exec();
  }
}
