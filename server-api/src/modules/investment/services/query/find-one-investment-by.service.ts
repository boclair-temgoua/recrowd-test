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
      .select('investment.uuid', 'uuid')
      .addSelect('investment.title', 'title')
      .addSelect('investment.status', 'status')
      .addSelect('investment.amount', 'amount')
      .addSelect('investment.currency', 'currency')
      .addSelect('investment.description', 'description')
      .addSelect('investment.expiredMaxAt', 'expiredMaxAt')
      .addSelect('investment.timeInvested', 'timeInvested')
      .addSelect(
        /*sql*/ `
    CASE WHEN ("investment"."expiredMaxAt" >= now()::date) THEN false 
        WHEN ("investment"."expiredMaxAt" < now()::date) THEN true
        ELSE false
        END
      `,
        'isExpiredAt',
      )
      .addSelect(
        /*sql*/ `(
        SELECT jsonb_build_object(
        'uuid', "us"."uuid",
        'userId', "us"."id",
        'fullName', "us"."fullName"
        )
        FROM "user" "us"
        WHERE "investment"."userId" = "us"."id"
        ) AS "user"`,
      )
      .addSelect('investment.createdAt', 'createdAt')
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

    const [error, result] = await useCatch(query.getRawOne());
    if (error)
      throw new HttpException('Investment not found', HttpStatus.NOT_FOUND);

    return result;
  }
}
