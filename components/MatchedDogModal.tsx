"use client";

import { Dog } from "~/types/dogs";

interface Props {
  close: () => void;
  matchedDog: Dog;
}

export const MatchedDogModal = ({ close, matchedDog }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-500 slide-in-from-bottom-4">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"
            style={{ backgroundColor: "#FBA919" }}
          >
            <span className="text-2xl animate-pulse">🎉</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-in slide-in-from-top-2 duration-700">
            It's a Match!
          </h3>
          <div className="mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="relative inline-block">
              <img
                src={matchedDog.img || "/placeholder.svg"}
                alt={matchedDog.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 animate-in zoom-in-50 duration-1000 delay-300"
              />
              <div className="absolute -top-2 -right-2 animate-bounce delay-1000">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 animate-in slide-in-from-left-2 duration-500 delay-500">
              {matchedDog.name}
            </h4>
            <p className="text-gray-600 animate-in slide-in-from-right-2 duration-500 delay-700">
              {matchedDog.breed} • {matchedDog.age}{" "}
              {matchedDog.age === 1 ? "year" : "years"}
            </p>
            <p className="text-gray-700 mt-2 animate-in fade-in duration-500 delay-1000">
              Located in ZIP: {matchedDog.zip_code}
            </p>
          </div>
          <button
            onClick={close}
            className="cursor-pointer px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 animate-in slide-in-from-bottom-2 duration-500 delay-1200"
            style={{ backgroundColor: "#300D38" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
