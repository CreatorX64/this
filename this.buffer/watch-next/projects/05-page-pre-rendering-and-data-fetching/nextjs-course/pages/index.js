import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      <li>
        <Link href="/user-profile">User Profile</Link>
      </li>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("(Re-)Generating...");

  const filePath = path.join(process.cwd(), "data", "dummy-api.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data"
      }
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10 // Incremental Static Regeneration (ISR)
    // notFound: ...
    // redirect: ...
  };
}
