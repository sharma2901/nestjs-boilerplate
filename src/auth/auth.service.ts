import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findOne({ email });
    if (admin) {
      const match = await compare(password, admin.hashedPassword);
      const returnUser = admin.toObject();
      delete returnUser.hashedPassword;
      return match ? returnUser : null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
