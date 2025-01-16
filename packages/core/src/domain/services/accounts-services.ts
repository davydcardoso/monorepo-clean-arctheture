import { AccountRepository } from "../repositories/account-repository";

export const accountServices = (
  repository: AccountRepository
): AccountRepository => ({
  login: (basicToken) => {
    return repository.login(basicToken);
  },
  register: (data) => {
    return repository.register(data);
  },
});
