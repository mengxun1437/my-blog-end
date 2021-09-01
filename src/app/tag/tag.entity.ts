import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tagId: number;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ nullable: false })
  created: Date;
  @Column({ nullable: false })
  updated: Date;
}
