import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyApi, LOGIN_URL } from "../../../lib/spotify-api";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    // Called whenever a JSON Web Token is created
    async jwt({ account, user, token }) {
      // Initial sign in
      if (account && user) {
        console.log("******************** generating new token");
        return {
          ...token,
          accessToken: account.access_token,
          // We are handling expiry times in milliseconds (see
          // refreshAccessToken() method below)
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("******************** using existing valid token");
        return token;
      }

      // Access token has expired, refresh it
      console.log("******************** refreshing expired token");
      return await refreshAccessToken(token);
    },
    // Called whenever a session is checked. Basically these are properties
    // that are exposed to the client (e.g. through getSession(), useSession())
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    }
  }
});

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedTokens } = await spotifyApi.refreshAccessToken();
    console.log("******************** refreshed tokens:", refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      // Unlike the "account.expires_at" value (which a UNIX timstamp of the
      // expiry date) in the jwt() method above, the "refresedToken.expires_in"
      // value here is not a date but a value of 3600 seconds (1 hour). So
      // instead of assigning it directly, we add it to the current date. We
      // also convert the seconds value to milliseconds because unlike UNIX
      // timestamps (which have a unit of seconds), Date.now() returns and
      // works with milliseconds since UNIX epoch
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // Replace refresh token if a new one was sent from Spotify
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError"
    };
  }
}
