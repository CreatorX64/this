import { getSession } from "next-auth/react";
import AuthForm from "../components/auth/AuthForm";

export default function AuthPage() {
  // We don't need client side session-checking because we handle this in the
  // getServerSideProps of this page (below).

  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // // We could do this in getServerSideProps (and we should do it there preferably).
  // // But for practice, we are checking the sesion on the client side.
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace("/");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
}
