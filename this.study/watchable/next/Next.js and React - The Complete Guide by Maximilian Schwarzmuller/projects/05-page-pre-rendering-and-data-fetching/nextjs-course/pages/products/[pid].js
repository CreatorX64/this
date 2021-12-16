import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

export default function ProductDetailPage(props) {
  const { product } = props;

  // For "fallback: true"
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-api.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    }
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true
  };

  // return {
  //   paths: [
  //     { params: { pid: "p1" } }
  //     // { params: { pid: "p2" } },
  //     // { params: { pid: "p3" } }
  //   ],
  //   // fallback: false // default, no pages are generated for missing values above
  //   // fallback: true // pages are generated at client side for missing values above
  //   fallback: "blocking" // pages are generated at server side for missing values above
  // };
}
