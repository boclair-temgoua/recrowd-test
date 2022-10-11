import {
  Controller,
  Post,
  NotFoundException,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  Request,
  Put,
  Res,
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

  /** Create */
  @Post(`/create`)
  async createOne(
    @Res() res,
    @Request() req: any,
    @Body() createOrUpdateInvestmentDto: CreateOrUpdateInvestmentDto,
  ) {
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

  /** Update */
  @Put(`/update/:investment_uuid`)
  async updateOne(
    @Res() res,
    @Body() createOrUpdateInvestmentDto: CreateOrUpdateInvestmentDto,
    @Param('investment_uuid', ParseUUIDPipe) investment_uuid: string,
  ) {
    const [errors, results] = await useCatch(
      this.createOrUpdateInvestment.createOrUpdate({
        ...createOrUpdateInvestmentDto,
        investment_uuid,
      }),
    );
    if (errors) {
      throw new NotFoundException(errors);
    }
    return reply({ res, results });
  }

  /** Delete */
  @Delete(`/delete/:investment_uuid`)
  async deleteOne(
    @Res() res,
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
