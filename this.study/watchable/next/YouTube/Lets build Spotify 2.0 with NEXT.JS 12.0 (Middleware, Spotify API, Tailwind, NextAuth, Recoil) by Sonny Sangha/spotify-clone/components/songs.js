import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlist";
import { Song } from "./song";

export function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map(({ track }, index) => (
        <Song key={track.id} track={track} order={index} />
      ))}
    </div>
  );
}
