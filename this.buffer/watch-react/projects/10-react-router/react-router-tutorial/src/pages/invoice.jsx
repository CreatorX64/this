import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../../data/invoices";

export const Invoice = () => {
  const navigate = useNavigate();
  const params = useParams();
  const invoice = getInvoice(Number(params.invoiceId));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
};
