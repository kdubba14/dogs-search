"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ApiClient } from "~/clients/ApiClient";
import { DogSearchParams } from "~/types/dogs";

export function useDogs() {
  return {
    useBreeds: () =>
      useQuery({
        queryKey: ["dog-breeds"],
        queryFn: ApiClient.dogs.getBreeds,
      }),
    useGetDogs: (ids?: string[]) =>
      useQuery({
        enabled: !!ids,
        initialData: undefined,
        queryKey: ["get-dogs", ...(ids || [])],
        queryFn: () => ApiClient.dogs.getDogsByIds(ids || []),
      }),
    useSearch: (params: DogSearchParams) =>
      useQuery({
        queryKey: ["search-dogs", params],
        queryFn: () =>
          ApiClient.dogs.searchDogs({
            ...params,
            size: params.size ?? 24,
          }),
      }),
    useMatchDog: () =>
      useMutation({
        mutationFn: ApiClient.dogs.matchDog,
        onError: () =>
          toast.error("An error occurred. Please try again later."),
      }),
  };
}
