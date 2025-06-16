"use client";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Props {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (dogId: string) => void;
}

export default function DogCard({ dog, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="relative bg-white min-w-sm mx-auto md:min-w-auto md:mx-0 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
      <div className="relative">
        <img
          src={dog.img || "/placeholder.svg"}
          alt={dog.name}
          className="w-full h-56 object-cover"
        />
        <button
          onClick={() => onToggleFavorite(dog.id)}
          className={`absolute cursor-pointer top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-[#300D38]/70 bg-opacity-30 text-gray-400 hover:text-red-500"
          }`}
        >
          <span className="text-lg">{isFavorite ? "❤️" : "🤍"}</span>
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#300D38] transition-colors">
          {dog.name}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-600 text-xs">{dog.breed}</p>
          <span
            className="text-xs px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: "#FBA919" }}
          >
            {dog.age} {dog.age === 1 ? "year" : "years"}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span className="inline-flex items-center">
            <span className="mr-1">📍</span>
            {dog.zip_code}
          </span>
        </div>
      </div>
    </div>
  );
}
