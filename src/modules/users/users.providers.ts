import { USER_RESPOSITORY } from "src/core/constants";
import { User } from "./user.entity";

export const usersProviders = [
  {
    provide: USER_RESPOSITORY,
    useValue: User
  }
];
