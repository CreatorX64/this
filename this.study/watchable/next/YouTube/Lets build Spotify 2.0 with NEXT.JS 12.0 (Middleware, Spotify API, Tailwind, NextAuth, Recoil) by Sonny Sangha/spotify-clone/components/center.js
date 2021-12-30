import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { shuffle } from "lodash";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { playlistIdState, playlistState } from "../atoms/playlist";
import { useSpotifyApi } from "../hooks/spotify-api";
import { Songs } from "./songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500"
];

export function Center() {
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const { data: session } = useSession();
  const { spotifyApi } = useSpotifyApi();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => {
        console.log("Something went wrong:", error);
      });
  }, [playlistId, spotifyApi, setPlaylist]);

  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center space-x-3 rounded-full p-1 pr-2 opacity-90 cursor-pointer text-white bg-black hover:opacity-80"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt="User avatar"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 h-80 p-8 text-white bg-gradient-to-b ${color} to-black`}
      >
        <img
          className="w-44 h-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}
