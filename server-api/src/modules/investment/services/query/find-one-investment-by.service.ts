import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Investment } from '../../../../models/Investment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { useCatch } from '../../../../infrastructure/utils/use-catch';
import { GetOneInvestmentSelections } from '../../types/index';

@Injectable()
export class FindOneInvestmentByService {
  constructor(
    @InjectRepository(Investment)
    private driver: Repository<Investment>,
  ) {}

  async findOneBy(selections: GetOneInvestmentSelections): Promise<Investment> {
    const { option1, option2 } = { ...selections };
    let query = this.driver
      .createQueryBuilder('investment')
      .where('investment.deletedAt IS NULL');

    if (option1) {
      const { investment_uuid } = { ...option1 };
      query = query.andWhere('investment.uuid = :uuid', {
        uuid: investment_uuid,
      });
    }

    if (option2) {
      const { investmentId } = { ...option2 };
      query = query.andWhere('investment.id = :id', { id: investmentId });
    }

    const [error, result] = await useCatch(query.getOne());
    if (error)
      throw new HttpException('Investment not found', HttpStatus.NOT_FOUND);

    return result;
  }
}
