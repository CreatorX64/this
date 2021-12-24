import { useSearchParams } from "react-router-dom";

export const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "User";

  return (
    <div>
      <h2>Hey {name}, Contact Us Here</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quaerat
        exercitationem ipsam vel praesentium maxime velit dolores possimus
        libero corrupti. Dolorum, quos sequi. Non deserunt libero adipisci
        voluptatibus ab reiciendis.
      </p>
    </div>
  );
};
