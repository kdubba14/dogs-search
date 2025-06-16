"use client";

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { ApiClient } from "~/clients/ApiClient";
import { AuthLoginParams } from "~/types/auth";

export function useAuth() {
  return {
    useLogin: () =>
      useMutation({
        mutationFn: (params: AuthLoginParams) => ApiClient.auth.login(params),
        onError: () =>
          toast.error("An error occurred. Please try again later."),
      }),
    useLogout: () =>
      useMutation({
        mutationFn: ApiClient.auth.logout,
        onError: () =>
          toast.error("An error occurred. Please try again later."),
      }),
  };
}
