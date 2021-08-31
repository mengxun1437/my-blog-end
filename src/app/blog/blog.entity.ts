import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 36, unique: true })
  blogId: string;
  @Column({ default: '' })
  title: string;
  @Column({ nullable: true, default: '' })
  cover?: string;
  @Column({ nullable: true, default: '' })
  tags: string;
  @Column({ default: 'draft' })
  status: string;
  @Column({ nullable: false })
  created: Date;
  @Column({ nullable: false })
  updated: Date;
}
