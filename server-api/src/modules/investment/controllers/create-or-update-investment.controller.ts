import {
  Controller,
  Post,
  Response,
  NotFoundException,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { reply } from '../../../infrastructure/utils/reply';
import { useCatch } from '../../../infrastructure/utils/use-catch';

import { CreateOrUpdateInvestmentDto } from '../dto/validation-investment.dto';
import { CreateOrUpdateInvestment } from '../services/use-cases';

@Controller('investments')
export class CreateOrUpdateInvestmentController {
  constructor(
    private readonly createOrUpdateInvestment: CreateOrUpdateInvestment,
  ) {}

  @Post(`/create-or-update`)
  async createOne(
    @Response() res: any,
    @Request() req: any,
    @Body() createOrUpdateInvestmentDto: CreateOrUpdateInvestmentDto,
  ) {
    const { user } = req;
    const [errors, results] = await useCatch(
      this.createOrUpdateInvestment.createOrUpdate({
        ...createOrUpdateInvestmentDto,
      }),
    );
    if (errors) {
      throw new NotFoundException(errors);
    }
    return reply({ res, results });
  }

  @Delete(`/delete/:investment_uuid`)
  async deleteOne(
    @Response() res: any,
    @Param('investment_uuid', ParseUUIDPipe) investment_uuid: string,
  ) {
    const [errors, results] = await useCatch(
      this.createOrUpdateInvestment.deleteOne({ investment_uuid }),
    );
    if (errors) {
      throw new NotFoundException(errors);
    }
    return reply({ res, results });
  }
}
