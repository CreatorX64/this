import faker from "faker";
import { useEffect, useState } from "react";

export function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = new Array(5).fill().map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
      avatar: "/sample-avatar.jpg"
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for You</h3>
        <button className="font-semibold text-gray-600">See all</button>
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex justify-between items-center mt-3"
        >
          <img
            src={profile.avatar}
            alt="User avatar"
            className="w-10 h-10 border rounded-full p-[2px]"
          />

          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>

          <button className="text-xs font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
}
