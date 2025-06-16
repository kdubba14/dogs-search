import * as AuthMethods from "./auth";
import * as DogsMethods from "./dogs";
import * as LocationsMethods from "./locations";

export const ApiClient = {
  auth: AuthMethods,
  dogs: DogsMethods,
  locations: LocationsMethods,
};
