import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { removeReservation } from "./reservationsSlice";
import { addCustomer } from "../customers/customersSlice";

interface ReservationCardProps {
  name: string;
  index: number;
}

export const ReservationCard = ({
  name,
  index
}: ReservationCardProps): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div
      className="reservation-card-container"
      onClick={() => {
        dispatch(removeReservation(index));
        dispatch(addCustomer({ id: uuid(), name, foods: [] }));
      }}
    >
      {name}
    </div>
  );
};
