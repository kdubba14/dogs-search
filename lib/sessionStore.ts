"use client";

import { SessionStorageSchema } from "~/types/auth";

type SessionKey = keyof SessionStorageSchema;

export const SessionStore = {
  get<K extends SessionKey>(key: K): SessionStorageSchema[K] | null {
    try {
      const value = sessionStorage.getItem(key);
      return value ? (JSON.parse(value) as SessionStorageSchema[K]) : null;
    } catch {
      return null;
    }
  },

  set<K extends SessionKey>(key: K, value: SessionStorageSchema[K]): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Failed to save "${key}" to sessionStorage.`);
    }
  },

  remove<K extends SessionKey>(key: K): void {
    sessionStorage.removeItem(key);
  },

  has<K extends SessionKey>(key: K): boolean {
    return sessionStorage.getItem(key) !== null;
  },

  clear(): void {
    sessionStorage.clear();
  },
};
