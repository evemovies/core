import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Logger, getUserForLog } from 'src/common/utils/logger';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private adminService: AdminService) {}

  @Get('stats')
  getStats(@Request() req) {
    this.logger.log(`${getUserForLog(req)} is getting admin stats`);
    return this.adminService.getStats();
  }
}
