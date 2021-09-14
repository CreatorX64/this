import { DateTime } from "luxon";

export const expenses = [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: DateTime.fromMillis(0)
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: DateTime.fromMillis(0).minus({ days: 4 })
  },
  {
    id: "3",
    description: "Credit card",
    note: "",
    amount: 4500,
    createdAt: DateTime.fromMillis(0).plus({ days: 4 })
  }
];
