export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const ninjas = await response.json();
  const paths = ninjas.map((ninja) => ({
    params: { id: ninja.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const ninja = await res.json();

  return {
    props: {
      ninja
    }
  };
}

export default function Details({ ninja }) {
  return (
    <div>
      <h1>{ninja.name}</h1>
      <p>{ninja.email}</p>
      <p>{ninja.website}</p>
      <p>{ninja.address.city}</p>
    </div>
  );
}
