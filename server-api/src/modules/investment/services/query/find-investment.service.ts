import { Injectable, NotFoundException } from '@nestjs/common';
import { Investment } from '../../../../models/Investment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { useCatch } from '../../../../infrastructure/utils/use-catch';
import { withPagination } from '../../../../infrastructure/utils/pagination';
import { GetInvestmentsSelections } from '../../types';

@Injectable()
export class FindInvestmentService {
  constructor(
    @InjectRepository(Investment)
    private driver: Repository<Investment>,
  ) {}

  async findAll(
    selections: GetInvestmentsSelections,
  ): Promise<GetInvestmentsSelections> {
    const { filterQuery, pagination, option1 } = { ...selections };

    let query = this.driver
      .createQueryBuilder('investment')
      .select('investment.uuid', 'uuid')
      .addSelect('investment.title', 'title')
      .addSelect('investment.status', 'status')
      .addSelect('investment.amount', 'amount')
      .addSelect('investment.currency', 'currency')
      .addSelect('investment.description', 'description')
      .addSelect('investment.expiredMaxAt', 'expiredMaxAt')
      .addSelect('investment.expiredMinAt', 'expiredMinAt')
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
      const { userId } = { ...option1 };
      query = query.andWhere('investment.userId = :userId', { userId });
    }

    if (filterQuery?.q) {
      query = query.andWhere('investment.title ::text ILIKE :searchQuery', {
        searchQuery: `%${filterQuery?.q}%`,
      });
    }

    const [errorRowCount, rowCount] = await useCatch(query.getCount());
    if (errorRowCount) throw new NotFoundException(errorRowCount);

    const [error, investments] = await useCatch(
      query
        .orderBy('investment.createdAt', pagination?.sort)
        .limit(pagination.limit)
        .offset((pagination.page - 1) * pagination.limit)
        .getRawMany(),
    );

    if (error) throw new NotFoundException(error);
    return withPagination({
      pagination,
      rowCount,
      data: investments,
    });
  }
}
