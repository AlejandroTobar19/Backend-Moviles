import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { UsersService } from './users.service';
import { UpdateProfileDto, UpdateThemeDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: any) {
    const u = await this.users.findById(user.sub);
    const { passwordHash, ...safe } = u as any;
    return safe;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateMe(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.users.updateProfile(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/theme')
  updateTheme(@CurrentUser() user: any, @Body() dto: UpdateThemeDto) {
    return this.users.updateProfile(user.sub, { theme: dto.theme });
  }
}
