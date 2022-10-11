import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateOrUpdateInvestmentDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  investment_uuid: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class FaqUuidDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  investment_uuid: string;
}
