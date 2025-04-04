import axios from "axios";
import { IAuthorizationRequest, IRegistrationRequest } from "../types/types";
import { axiosAuth, axiosNoAuth } from "@/shared/api/baseQueryInstanse";

class UserService {
  private static instance: UserService;

  constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async registration(requestBody: IRegistrationRequest) {
    const { data } = await axiosNoAuth.post(
      "",
      requestBody as unknown as Record<string, unknown>
    );

    return data;
  }
  public async authorization(requestBody: IAuthorizationRequest) {
    const { data } = await axiosNoAuth.post(
      "",
      requestBody as unknown as Record<string, unknown>
    );

    return data;
  }
  public async getCurrentUser() {
    return await axiosAuth.get("");
  }
}

export const {} = UserService.getInstance();
