export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log("server side code");

  // Can have the same properties as getStaticProps except "revalidate", because
  // getServerSideProps will be run at each request.
  return {
    props: {
      username: "Max"
    }
  };
}
