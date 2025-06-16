"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLoginParams, loginSchema } from "~/types/auth";
import { useAuth } from "~/hooks/useAuth";

// NOTE: ideally we would want to redirect to the homepage if a user is already logged in

export default function LoginPage() {
  const router = useRouter();
  const { useLogin } = useAuth();
  const { mutateAsync: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthLoginParams>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: AuthLoginParams) => {
    try {
      await login(data);
      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #300D38 0%, #4A1A5C 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#FBA919" }}
          >
            <span className="text-3xl">🐕</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dogs Search</h1>
          <p className="text-gray-600">Find your perfect furry companion</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your full name"
              required
            />
            {errors.name && (
              <p className="text-red-500 animate-pulse">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email address"
              required
            />
            {errors.email && (
              <p className="text-red-500 animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#FBA919" }}
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Ready to find your new best friend? 🐾
        </div>
      </div>
    </div>
  );
}
