import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import "./App.css";
import { RootState } from "./store";
import { ReservationCard } from "../features/reservations/ReservationCard";
import { addReservation } from "../features/reservations/reservationsSlice";
import { CustomerCard } from "../features/customers/CustomerCard";

export const App = (): JSX.Element => {
  const [reservationNameInput, setReservationNameInput] = useState("");
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  );
  const customers = useSelector((state: RootState) => state.customers.value);

  const handleAddReservation = (): void => {
    if (!reservationNameInput.trim()) {
      return;
    }
    dispatch(addReservation(reservationNameInput));
    setReservationNameInput("");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((name, index) => (
                <ReservationCard key={uuid()} name={name} index={index} />
              ))}
            </div>
          </div>
          <div className="reservation-input-container">
            <input
              value={reservationNameInput}
              onChange={(e) => setReservationNameInput(e.target.value)}
            />
            <button onClick={handleAddReservation}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          {customers.map((customer) => (
            <CustomerCard
              key={uuid()}
              id={customer.id}
              name={customer.name}
              foods={customer.foods}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
