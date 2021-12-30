import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";
import spotifyLogo from "../assets/spotify-logo.png";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  };
}

export default function LoginPage({ providers }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-black">
      <div className="w-44 mb-5">
        <Image src={spotifyLogo} alt="Spotify logo" />
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full p-5 text-white bg-[#18d860]"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
