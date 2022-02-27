import axios from "axios";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import { useUserContext } from "../context/user";

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      },
      props: {}
    };
  }

  return {
    props: {}
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useUserContext();

  async function loadPortal() {
    const { data } = await axios.get("/api/portal");
    router.push(data.url);
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">Dashboard</h1>

      {!isLoading && (
        <>
          <p className="mb-6">
            {user?.is_subscribed
              ? `Subscribed: ${user.interval}`
              : "Not subscribed"}
          </p>
          <button onClick={loadPortal}>Manage subscription</button>
        </>
      )}
    </div>
  );
}
