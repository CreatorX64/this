let invoices = [
  {
    number: 1995,
    name: "Santa Monica",
    amount: "$10,800",
    due: "12/05/1995"
  },
  {
    number: 2000,
    name: "Stankonia",
    amount: "$8,000",
    due: "10/31/2000"
  },
  {
    number: 2003,
    name: "Ocean Avenue",
    amount: "$9,500",
    due: "07/22/2003"
  },
  {
    number: 1997,
    name: "Tubthumper",
    amount: "$14,000",
    due: "09/01/1997"
  },
  {
    number: 1998,
    name: "Wide Open Spaces",
    amount: "$4,600",
    due: "01/27/2998"
  }
];

export const getInvoices = () => invoices;

export const getInvoice = (number) => {
  return invoices.find((invoice) => invoice.number === number);
};

export const deleteInvoice = (number) => {
  invoices = invoices.filter((invoice) => invoice.number !== number);
};
