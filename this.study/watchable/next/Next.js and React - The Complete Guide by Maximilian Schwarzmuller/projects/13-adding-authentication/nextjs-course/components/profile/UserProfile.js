import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

export default function UserProfile() {
  // We don't need client side session-checking because we handle this in the
  // getServerSideProps of the /profile page.

  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       // window.location.href = "/auth";
  //       router.replace("/auth");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function handleChangePassword(oldPassword, newPassword) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword} />
    </section>
  );
}
