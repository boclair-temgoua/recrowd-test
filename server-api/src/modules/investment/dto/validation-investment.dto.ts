import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsBoolean,
  IsOptional,
  IsInt,
  IsUUID,
} from 'class-validator';

export class CreateOrUpdateInvestmentDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  investment_uuid: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  currency: string;

  @IsNotEmpty()
  expiredMaxAt: Date;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  timeInvested?: number;

  @IsNotEmpty()
  @IsInt()
  amount?: number;
}

export class InvestmentUuidDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  investment_uuid: string;
}
