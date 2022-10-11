import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Query,
  Res,
} from '@nestjs/common';
import { reply } from '../../../infrastructure/utils/reply';
import { useCatch } from '../../../infrastructure/utils/use-catch';
import { FilterQueryDto } from '../../../infrastructure/utils/filter-query';
import { RequestPaginationDto } from '../../../infrastructure/utils/pagination';
import { FindOneInvestmentByService } from '../services/query/find-one-investment-by.service';
import { FindInvestmentService } from '../services/query/find-investment.service';

@Controller('investments')
export class GetOneOrMultipleInvestmentController {
  constructor(
    private readonly findOneInvestmentByService: FindOneInvestmentByService,
    private readonly findInvestmentService: FindInvestmentService,
  ) {}

  @Get(`/`)
  async findAll(
    @Res() res,
    @Query() pagination: RequestPaginationDto,
    @Query() filterQuery: FilterQueryDto,
  ) {
    const [errors, results] = await useCatch(
      this.findInvestmentService.findAll({
        filterQuery,
        pagination,
      }),
    );
    if (errors) {
      throw new NotFoundException(errors);
    }
    return reply({ res, results });
  }

  @Get(`/show/:investment_uuid`)
  async getOneByUUID(
    @Res() res,
    @Param('investment_uuid', ParseUUIDPipe) investment_uuid: string,
  ) {
    const [error, result] = await useCatch(
      this.findOneInvestmentByService.findOneBy({
        option1: { investment_uuid },
      }),
    );

    if (error) {
      throw new NotFoundException(error);
    }
    return reply({ res, results: result });
  }
}
