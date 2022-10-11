import { Injectable, NotFoundException } from '@nestjs/common';
import { Investment } from '../../../../models/Investment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { useCatch } from '../../../../infrastructure/utils/use-catch';
import { generateUUID } from '../../../../infrastructure/utils/commons';
import {
  CreateInvestmentOptions,
  UpdateInvestmentOptions,
  UpdateInvestmentSelections,
} from '../../types';

@Injectable()
export class CreateOrUpdateInvestmentService {
  constructor(
    @InjectRepository(Investment)
    private driver: Repository<Investment>,
  ) {}

  /** Create one Investment to the database. */
  async createOne(options: CreateInvestmentOptions): Promise<Investment> {
    const { userId, timerAt, expiredAt, title, description } = {
      ...options,
    };

    const investment = new Investment();
    investment.uuid = generateUUID();
    investment.userId = userId;
    investment.title = title;
    investment.expiredAt = expiredAt;
    investment.timerAt = timerAt;
    investment.description = description;

    const query = this.driver.save(investment);

    const [error, result] = await useCatch(query);
    if (error) throw new NotFoundException(error);

    return result;
  }

  /** Update one Investment to the database. */
  async updateOne(
    selections: UpdateInvestmentSelections,
    options: UpdateInvestmentOptions,
  ): Promise<Investment> {
    const { option1, option2 } = { ...selections };
    const { timerAt, expiredAt, title, description, status, deletedAt } = {
      ...options,
    };

    let findQuery = this.driver.createQueryBuilder('investment');

    if (option1) {
      findQuery = findQuery.where('investment.uuid = :uuid', {
        uuid: option1.investment_uuid,
      });
    }

    if (option2) {
      findQuery = findQuery.where('investment.id = :id', {
        id: option2.investmentId,
      });
    }

    const [errorFind, findItem] = await useCatch(findQuery.getOne());
    if (errorFind) throw new NotFoundException(errorFind);

    findItem.title = title;
    findItem.description = description;
    findItem.status = status;
    findItem.timerAt = timerAt;
    findItem.expiredAt = expiredAt;
    findItem.deletedAt = deletedAt;

    const query = this.driver.save(findItem);

    const [errorUp, result] = await useCatch(query);
    if (errorUp) throw new NotFoundException(errorUp);

    return result;
  }
}
