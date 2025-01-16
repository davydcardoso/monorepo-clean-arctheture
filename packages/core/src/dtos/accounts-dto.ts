import { AccountDto } from "../domain/entities/accounts";

export interface RegisterAccountBodyDto {
  name: string;
  email: string;
  password: string;
}

export interface RegisterAccountResponseDto extends AccountDto {}

export interface LoginAccountResponseDto {
  token: string;
  account: AccountDto;
}
