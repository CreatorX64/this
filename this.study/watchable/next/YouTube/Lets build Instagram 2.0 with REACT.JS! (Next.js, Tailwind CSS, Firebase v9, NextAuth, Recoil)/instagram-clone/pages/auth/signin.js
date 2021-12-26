import { getProviders, signIn } from "next-auth/react";
import { Header } from "../../components/Header";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  };
}

export default function SignInPage({ providers }) {
  return (
    <>
      <Header />

      <div className="flex flex-col justify-center items-center min-h-screen -mt-20 px-14 py-2 text-center">
        <img className="w-80" src="/logo-lg.png" alt="Instagram logo" />

        <p className="text-gray-600">
          This is not a real app, it is for educational purposes only.
        </p>

        <div className="mt-32">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg p-3 text-white bg-blue-500"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
