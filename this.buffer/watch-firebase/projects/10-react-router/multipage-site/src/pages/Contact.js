import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [queryParams] = useSearchParams();

  const name = queryParams.get("name");

  return (
    <div>
      <h2>Hey {name}, contact us here</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
        molestias, aut quae eveniet error eligendi impedit corporis voluptate
        pariatur dolorum, labore architecto est quo corrupti eos voluptas
        dolores dignissimos! Magnam?
      </p>
    </div>
  );
};

export default Contact;
