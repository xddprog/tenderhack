import axios from "axios";
import {
  IAuthorizationRequest,
  ICurrentUser,
  IRegistrationRequest,
} from "../types/types";
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

  public async registration(
    requestBody: IRegistrationRequest
  ): Promise<string> {
    const { data } = await axiosNoAuth.post<{ token: string }>(
      "auth/register",
      requestBody as unknown as Record<string, unknown>
    );

    return data.token;
  }
  public async authorization(
    requestBody: IAuthorizationRequest
  ): Promise<string> {
    const { data } = await axiosNoAuth.post<{ token: string }>(
      "auth/login",
      requestBody as unknown as Record<string, unknown>
    );

    return data.token;
  }
  public async getCurrentUser(): Promise<ICurrentUser> {
    const { data } = await axiosAuth.get<ICurrentUser>("auth/current_user");

    return data;
  }
}

export const { registration, authorization, getCurrentUser } =
  UserService.getInstance();
