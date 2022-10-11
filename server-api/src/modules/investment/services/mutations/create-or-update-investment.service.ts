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
    const {
      userId,
      expiredMinAt,
      expiredMaxAt,
      title,
      currency,
      description,
      amount,
    } = {
      ...options,
    };

    const investment = new Investment();
    investment.uuid = generateUUID();
    investment.currency = currency;
    investment.userId = userId;
    investment.title = title;
    investment.amount = amount;
    investment.expiredMinAt = new Date(expiredMinAt).getTime()
      ? expiredMinAt
      : null;
    investment.expiredMaxAt = new Date(expiredMaxAt).getTime()
      ? expiredMaxAt
      : null;
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
    const {
      expiredMinAt,
      expiredMaxAt,
      title,
      currency,
      description,
      status,
      amount,
      deletedAt,
    } = {
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
    findItem.currency = currency;
    findItem.status = status;
    findItem.amount = amount;
    findItem.expiredMinAt = expiredMinAt;
    findItem.expiredMaxAt = expiredMaxAt;
    findItem.deletedAt = deletedAt;

    const query = this.driver.save(findItem);

    const [errorUp, result] = await useCatch(query);
    if (errorUp) throw new NotFoundException(errorUp);

    return result;
  }
}
