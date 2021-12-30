import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { spotifyApi } from "../lib/spotify-api";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/song";

export function useSpotifyApi() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // The refresh token logic should work. But if some reason it doesn't
      // work, we can check for the error name that we return in the handler
      // and redirect the user to the sign in page as a last resort
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return { spotifyApi };
}

export function useSongInfo() {
  const { spotifyApi } = useSpotifyApi();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    async function fetchSongInfo() {
      if (currentTrackId) {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`
            }
          }
        );
        const data = await response.json();

        setSongInfo(data);
      }
    }

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return { songInfo };
}
