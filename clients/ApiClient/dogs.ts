import { AxiosClient } from "~/clients/AxiosClient";
import { Dog, DogSearchParams, DogSearchResponse } from "~/types/dogs";

export const getBreeds = () => AxiosClient.get<string[]>("/dogs/breeds");

export const searchDogs = (params: DogSearchParams) =>
  AxiosClient.get<DogSearchResponse>("/dogs/search", { params });

export const getDogsByIds = (ids: string[]) =>
  AxiosClient.post<Dog[]>("/dogs", ids);

export const matchDog = (ids: string[]) =>
  AxiosClient.post<{ match: string }>("/dogs/match", ids);
