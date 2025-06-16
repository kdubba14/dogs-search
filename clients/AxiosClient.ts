import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Important for sending/receiving cookies
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      typeof window !== "undefined" && (window.location.href = "/sign-in");
    }

    return Promise.reject(error); // Let React Query catch it too
  }
);
