import {
  LoginAccountResponseDto,
  RegisterAccountBodyDto,
  RegisterAccountResponseDto,
} from "../../dtos/accounts-dto";

export interface AccountRepository {
  login(basicToken: string): Promise<LoginAccountResponseDto>;
  register(data: RegisterAccountBodyDto): Promise<RegisterAccountResponseDto>;
}
