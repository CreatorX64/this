import { Outlet, useSearchParams } from "react-router-dom";
import { QueryNavLink } from "../components/QueryNavLink";
import { getInvoices } from "../../data/invoices";

export const Invoices = () => {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ borderRight: "solid 1px", padding: "1rem" }}>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            const filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />

        {invoices
          .filter((invoice) => {
            const filter = searchParams.get("filter");
            if (!filter) return true;
            const name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              key={invoice.number}
              to={`/invoices/${invoice.number}`}
              // className={({isActive}) => isActive ? "red" ? "blue"}
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : ""
                };
              }}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>

      <Outlet />
    </div>
  );
};
