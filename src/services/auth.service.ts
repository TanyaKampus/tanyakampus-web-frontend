import api from "./api";
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "@/utils/interface";

export const loginService = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/api/auth/login",
    payload
  );

  return response.data;
};

export const logoutService = async () => {
  const res = await api.delete(
    "/api/auth/logout",
    { withCredentials: true }
  );
  return res.data;
};

export const registerService = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/api/auth/register",
    payload,
  );

  return response.data;
};
