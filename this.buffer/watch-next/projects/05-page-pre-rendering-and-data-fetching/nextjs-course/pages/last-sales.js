import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSales(data);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // } else if (!isLoading && !sales) {
  //   return <p>No data found!</p>;
  // }

  // Using useSWR() hook from the swr package

  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    (...args) => fetch(...args).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setSales(data);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} &lt;{sale.email}&gt;
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return {
    props: {
      sales: data
    }
  };
}
