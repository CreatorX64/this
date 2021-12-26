import faker from "faker";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Story } from "./Story";

export function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = new Array(20).fill().map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
      avatar: "/sample-avatar.jpg"
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="overflow-x-scroll flex space-x-2 mt-8 border border-gray-200 rounded-sm p-6 bg-white scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}
