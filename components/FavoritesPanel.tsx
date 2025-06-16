"use client";

import { Loader2 } from "lucide-react";
import { useDogs } from "~/hooks/useDogs";

interface Props {
  dogIds: string[];
  onClose: () => void;
  onGenerateMatch: () => void;
  onToggleFavorite: (dogId: string) => void;
}

export default function FavoritesPanel({
  dogIds,
  onClose,
  onGenerateMatch,
  onToggleFavorite,
}: Props) {
  const { useGetDogs } = useDogs();
  const { data: dogsData, isFetching: isGetDogsLoading } = useGetDogs(dogIds);
  const dogs = dogsData?.data || [];

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Favorites ({dogs.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {dogIds.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">💔</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600">
              Start adding dogs to your favorites to generate matches!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto mb-6">
              {isGetDogsLoading && (
                <Loader2 className="animate-spin text-[#FBA919]" />
              )}
              {dogs.map((dog) => (
                <div
                  key={dog.id}
                  className="bg-gray-50 rounded-lg p-3 relative hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => onToggleFavorite(dog.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    ❤️
                  </button>
                  <img
                    src={dog.img || "/placeholder.svg"}
                    alt={dog.name}
                    className="w-full h-42 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-semibold text-gray-900">{dog.name}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-600">{dog.breed}</p>
                    <p className="text-xs text-gray-600">
                      {dog.age} {dog.age === 1 ? "year" : "years"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    ZIP: {dog.zip_code}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onGenerateMatch}
                className="px-8 cursor-pointer py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: "#300D38" }}
              >
                🎯 Generate My Perfect Match!
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
