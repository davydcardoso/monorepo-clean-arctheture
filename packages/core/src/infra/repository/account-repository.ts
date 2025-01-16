import { Http } from "../../domain";

import { AccountRepository } from "../../domain/index";
import { RegisterAccountResponseDto } from "../../dtos/accounts-dto";

export const accountRepository = (client: Http): AccountRepository => {
  return {
    login: async (basicToken) => {
      return await client.post(
        "/auth/signin",
        {},
        { headers: { Authorization: `Basic ${basicToken}` } }
      );
    },
    register: async (body) => {
      return await client.post<RegisterAccountResponseDto>("/accounts", body);
    },
  };
};
