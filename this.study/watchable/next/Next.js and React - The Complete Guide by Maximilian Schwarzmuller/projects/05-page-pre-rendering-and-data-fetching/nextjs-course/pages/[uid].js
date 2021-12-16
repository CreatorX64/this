export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  // Can have the same properties as getStaticProps except "revalidate", because
  // getServerSideProps will be run at each request.
  return {
    props: {
      id: `userId-${userId}`
    }
  };
}
