"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import DogCard from "~/components/DogCard";
import FilterPanel from "~/components/FilterPanel";
import Pagination from "~/components/Pagination";
import FavoritesPanel from "~/components/FavoritesPanel";
import { useDogs } from "~/hooks/useDogs";
import { Dog } from "~/types/dogs";
import { useFavorites } from "~/providers/FavoritesProvider";
import { MatchedDogModal } from "~/components/MatchedDogModal";

export default function SearchPage() {
  const [showMatch, setShowMatch] = useState(false);

  // Filter and sort states
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 48;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBreeds, sortOrder]);

  const { favorites, toggleFavorite, showFavorites, toggleShowFavorites } =
    useFavorites();

  const { useBreeds, useSearch, useGetDogs, useMatchDog } = useDogs();

  const { data: breedsData, isFetching: isBreedsLoading } = useBreeds();
  const breeds = breedsData?.data || [];

  // NOTE: could add google maps api to search by areas/zipcodes
  const { data: dogSearchData, isFetching: isDogIdsLoading } = useSearch({
    breeds: selectedBreeds.length ? selectedBreeds : undefined,
    sort: `breed:${sortOrder}`,
    size: dogsPerPage,
    from: currentPage === 1 ? undefined : (currentPage - 1) * dogsPerPage,
  });
  const dogIds = dogSearchData?.data?.resultIds || [];
  const total = dogSearchData?.data?.total || 0;
  const totalPages = Math.ceil((total || 1) / dogsPerPage);

  const { data: dogsData, isFetching: isGetDogsLoading } = useGetDogs(dogIds);
  const dogs = dogsData?.data || [];
  const isDogsLoading = isDogIdsLoading || isGetDogsLoading;

  const {
    data: matchedDogIdData,
    mutate: matchDog,
    isPending: _isMatchingDog,
  } = useMatchDog();
  const matchedDogId = matchedDogIdData?.data.match;

  const { data: matchedDogData, isFetching: isGettingMatchedDogLoading } =
    useGetDogs(matchedDogId ? [matchedDogId] : undefined);
  const matchedDog: Dog | undefined = (matchedDogData?.data || [])[0];
  // const isMatchingDog = _isMatchingDog || isGettingMatchedDogLoading;

  const handlePageChange = (page: number) => {
    if (1 < page && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
    typeof window !== "undefined" &&
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateMatch = async () => {
    if (favorites.length === 0) return;

    matchDog(favorites);
    toggleShowFavorites();
    setShowMatch(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <FilterPanel
                breeds={breeds}
                loading={isBreedsLoading}
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Dogs {isDogsLoading ? "" : `(${total})`}
              </h2>
              <p className="text-gray-600">
                Find your perfect companion from our amazing dogs!
              </p>
            </div>

            {/* Dogs Grid */}
            {isDogsLoading && (
              <div className="flex w-full justify-center items-center">
                <Loader2 className="animate-spin text-[#FBA919]" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {dogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  isFavorite={favorites.includes(dog.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Favorites Panel */}
      {showFavorites && (
        <FavoritesPanel
          dogIds={favorites}
          onClose={toggleShowFavorites}
          onGenerateMatch={generateMatch}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Match Modal */}
      {showMatch && matchedDog && (
        <MatchedDogModal
          close={() => setShowMatch(false)}
          matchedDog={matchedDog}
        />
      )}
    </div>
  );
}
