import { Role } from '#src/common/constant/role.constant';
import { BaseEntity } from '#src/core/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  user_name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refresh_token_hash: string;

  @Column('enum', { default: Role.ADMIN, enum: Role })
  role: Role;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: true, unique: true })
  email: string;
}
