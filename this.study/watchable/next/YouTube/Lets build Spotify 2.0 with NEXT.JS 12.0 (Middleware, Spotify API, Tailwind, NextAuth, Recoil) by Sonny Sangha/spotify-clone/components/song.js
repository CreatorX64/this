import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song";
import { useSpotifyApi } from "../hooks/spotify-api";
import { millisToMinutesAndSeconds } from "../lib/time";

export function Song({ order, track }) {
  const { spotifyApi } = useSpotifyApi();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  function playSong() {
    setCurrentTrackId(track.id);
    setIsPlaying(true);

    spotifyApi
      .play({
        uris: [track.uri]
      })
      .catch((error) => {
        if (error.name === "WebapiPlayerError") {
          alert(
            "Please open Spotify in one of your devices. You might also need to press play & pause to any song to make sure Spotify knows the device is active."
          );
        } else {
          alert("Something went wrong :( Try again later.");
        }
      });
  }

  return (
    <div
      className="grid grid-cols-2 gap-4 rounded-lg px-5 py-4 cursor-pointer text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track.album.images[0].url}
          alt="Track's album cover"
        />
        <div className="overflow-hidden">
          <p className="truncate text-white">{track.name}</p>
          <p className="truncate">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between ml-auto md:ml-0">
        <p className="hidden truncate md:inline">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}
