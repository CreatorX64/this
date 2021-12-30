import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";

import { playlistIdState } from "../atoms/playlist";
import { useSpotifyApi } from "../hooks/spotify-api";
import { MenuItem } from "./menu-item";

export function Sidebar() {
  const [_, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlists, setPlaylists] = useState([]);
  const { data: session } = useSession();
  const { spotifyApi } = useSpotifyApi();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="hidden flex-shrink-0 max-w-[12rem] h-screen overflow-y-scroll scrollbar-hide border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <MenuItem text="Home" icon={HomeIcon} />
        <MenuItem text="Search" icon={SearchIcon} />
        <MenuItem text="Your Library" icon={LibraryIcon} />

        <hr className="border-t-[0.1px] border-gray-900" />

        <MenuItem text="Create Playlist" icon={PlusCircleIcon} />
        <MenuItem
          text="Liked Songs"
          icon={HeartIcon}
          className="text-blue-500"
        />
        <MenuItem
          text="Your Episodes"
          icon={RssIcon}
          className="text-green-500"
        />

        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}
