import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class AuthEntitle {
  @PrimaryColumn()
  id: number;
}
