import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from '../../models/Investment';
import {
  CreateOrUpdateInvestmentController,
  GetOneOrMultipleInvestmentController,
} from './controllers';
import { CreateOrUpdateInvestmentService } from './services/mutations/create-or-update-investment.service';
import { FindInvestmentService } from './services/query/find-investment.service';
import { FindOneInvestmentByService } from './services/query/find-one-investment-by.service';
import { CreateOrUpdateInvestment } from './services/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Investment])],
  controllers: [
    CreateOrUpdateInvestmentController,
    GetOneOrMultipleInvestmentController,
  ],
  providers: [
    /** Imports providers query */
    FindOneInvestmentByService,
    FindInvestmentService,

    /** Imports providers mutations */
    CreateOrUpdateInvestmentService,

    /** Imports providers use-cases */
    CreateOrUpdateInvestment,
  ],
})
export class InvestmentModule {}
