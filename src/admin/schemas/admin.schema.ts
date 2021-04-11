import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true, lowercase: true }) email: string;
  @Prop({ required: true }) hashedPassword: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
