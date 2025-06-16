"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionStore } from "~/lib/sessionStore";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  showFavorites: boolean;
  toggleShowFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = SessionStore.get("favorites");
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  // NOTE: ideally we would want to persist this in a db somewhere
  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) => {
      const _favorites = prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId];

      SessionStore.set("favorites", _favorites);

      return _favorites;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    SessionStore.set("favorites", []);
  };

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <FavoritesContext.Provider
      value={{
        showFavorites,
        toggleShowFavorites,
        favorites,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
