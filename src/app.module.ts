import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TutorsModule } from './tutors/tutors.module';

@Module({ imports: [UsersModule, AuthModule] })
export class AppModule {}