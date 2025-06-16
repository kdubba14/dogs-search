import { AxiosClient } from "~/clients/AxiosClient";

export const getLocationsByZip = (zipCodes: string[]) =>
  AxiosClient.post<Location[]>("/locations", zipCodes);

export const searchLocations = (body: any) =>
  AxiosClient.post<{ results: Location[]; total: number }>(
    "/locations/search",
    body
  );
