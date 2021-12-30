import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon
} from "@heroicons/react/solid";

import { currentTrackIdState, isPlayingState } from "../atoms/song";
import { useSongInfo, useSpotifyApi } from "../hooks/spotify-api";
import { debounce } from "lodash";

export function Player() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [volume, setVolume] = useState(50);

  const { data: session } = useSession();
  const { spotifyApi } = useSpotifyApi();
  const { songInfo } = useSongInfo();

  // If there's a currently playing song the first time user opens our web app,
  // fetch it and set the currentId state so that songInfo can update, which will
  // cause  our player to update
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      function fetchCurrentSong() {
        if (!songInfo) {
          spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            setCurrentTrackId(data.body?.item?.id);
            spotifyApi.getMyCurrentPlaybackState().then((data) => {
              setIsPlaying(data.body?.is_playing);
            });
          });
        }
      }

      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      if (isPlaying) {
        spotifyApi.setVolume(volume);
      }
    }, 500),
    [volume, spotifyApi, isPlaying]
  );

  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }

  return (
    <div className="grid grid-cols-3 text-xs h-24 px-2 bg-gradient-to-b from-black to-gray-900 text-white md:text-base md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        {songInfo?.album.images?.[0].url ? (
          <img
            className="hidden md:inline w-10 h-10"
            src={songInfo?.album.images?.[0].url}
            alt="Song album cover"
          />
        ) : (
          <div className="hidden md:inline w-10 h-10 border border-gray-600 bg-gray-900" />
        )}

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.map((artist) => artist.name).join(", ")}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-evenly items-center">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          // The API is not working
          // onClick={() => spotifyApi.skipToPrevious()}
        />

        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}

        <FastForwardIcon
          className="button"
          // The API is not working
          // onClick={() => spotifyApi.skipToNext()}
        />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex justify-end items-center space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() => {
            if (volume > 0 && volume <= 10) {
              setVolume(0);
            } else if (volume > 10) {
              setVolume(volume - 10);
            }
          }}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
          onChange={(event) => setVolume(Number(event.target.value))}
          value={volume}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => {
            if (volume >= 90 && volume < 100) {
              setVolume(100);
            } else if (volume < 90) {
              setVolume(volume + 10);
            }
          }}
        />
      </div>
    </div>
  );
}
