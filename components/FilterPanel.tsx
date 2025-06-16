"use client";

interface Props {
  breeds: string[];
  loading: boolean;
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}

export default function FilterPanel({
  breeds,
  loading,
  selectedBreeds,
  setSelectedBreeds,
  sortOrder,
  setSortOrder,
}: Props) {
  const handleBreedToggle = (breed: string) => {
    setSelectedBreeds(
      selectedBreeds.includes(breed)
        ? selectedBreeds.filter((b) => b !== breed)
        : [...selectedBreeds, breed]
    );
  };

  const clearFilters = () => {
    setSelectedBreeds([]);
    setSortOrder("asc");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Sort Order */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort by Breed
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
        >
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </div>

      {/* Breed Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Breeds ({selectedBreeds.length} selected)
        </label>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {loading && (
            <span className="ml-2 text-sm text-gray-700">Loading...</span>
          )}
          {breeds?.map((breed) => (
            <label key={breed} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleBreedToggle(breed)}
                className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="ml-2 text-sm text-gray-700">{breed}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
