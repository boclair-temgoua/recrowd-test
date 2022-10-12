import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { useCatch } from '../../../../infrastructure/utils/use-catch';
import { CreateOrUpdateInvestmentService } from '../mutations/create-or-update-investment.service';
import { CreateOrUpdateInvestmentDto } from '../../dto/validation-investment.dto';
import { FindOneInvestmentByService } from '../query/find-one-investment-by.service';

@Injectable()
export class CreateOrUpdateInvestment {
  constructor(
    private readonly createOrUpdateInvestmentService: CreateOrUpdateInvestmentService,
    private readonly findOneInvestmentByService: FindOneInvestmentByService,
  ) {}

  /** Create one Investment Or Update to the database. */
  async createOrUpdate(options: CreateOrUpdateInvestmentDto): Promise<any> {
    const {
      investment_uuid,
      title,
      status,
      currency,
      amount,
      description,
      timeInvested,
      expiredMaxAt,
    } = {
      ...options,
    };

    if (investment_uuid) {
      const [error, findInvestment] = await useCatch(
        this.findOneInvestmentByService.findOneBy({
          option1: { investment_uuid },
        }),
      );
      if (error) {
        throw new NotFoundException(error);
      }
      if (!findInvestment)
        throw new HttpException(
          `Investment invalid or expired`,
          HttpStatus.NOT_FOUND,
        );
      const [errorUpdate, update] = await useCatch(
        this.createOrUpdateInvestmentService.updateOne(
          { option1: { investment_uuid } },
          {
            title,
            currency,
            expiredMaxAt,
            timeInvested,
            amount,
            status,
            description,
          },
        ),
      );
      if (errorUpdate) {
        throw new NotFoundException(errorUpdate);
      }

      return update;
    } else {
      const [_errorSave, investment] = await useCatch(
        this.createOrUpdateInvestmentService.createOne({
          title,
          currency,
          expiredMaxAt,
          timeInvested,
          amount,
          status,
          description,
          userId: 1,
        }),
      );
      if (_errorSave) {
        throw new NotFoundException(_errorSave);
      }
      return investment;
    }
  }

  /** Delete one Investment to the database. */
  async deleteOne(options: { investment_uuid: string }): Promise<any> {
    const { investment_uuid } = { ...options };
    const [error, findInvestment] = await useCatch(
      this.findOneInvestmentByService.findOneBy({
        option1: { investment_uuid },
      }),
    );
    if (error) {
      throw new NotFoundException(error);
    }
    if (!findInvestment)
      throw new HttpException(
        `Investment invalid or expired`,
        HttpStatus.NOT_FOUND,
      );

    /** Delete one Investment */
    const [_error, _delete] = await useCatch(
      this.createOrUpdateInvestmentService.updateOne(
        { option1: { investment_uuid } },
        { deletedAt: new Date() },
      ),
    );
    if (_error) {
      throw new NotFoundException(_error);
    }

    return _delete;
  }
}
