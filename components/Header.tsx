"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "~/hooks/useAuth";
import { useFavorites } from "~/providers/FavoritesProvider";

export const Header = () => {
  const router = useRouter();
  const { useLogout } = useAuth();
  const { mutate: logout } = useLogout();

  const { favorites, toggleShowFavorites } = useFavorites();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#FBA919" }}
            >
              <span className="text-xl">🐕</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#300D38" }}>
              Dogs Search
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleShowFavorites}
              className="relative cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: "#FBA919", color: "white" }}
            >
              Favorites ({favorites.length})
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
