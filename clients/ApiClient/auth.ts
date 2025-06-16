import { AxiosClient } from "~/clients/AxiosClient";

export const login = (data: { name: string; email: string }) =>
  AxiosClient.post("/auth/login", data);

export const logout = () => AxiosClient.post("/auth/logout");
