import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addFoodToCustomer } from "./customersSlice";

interface CustomerCardProps {
  id: string;
  name: string;
  foods: string[];
}

export const CustomerCard = ({
  id,
  name,
  foods
}: CustomerCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const [customerFoodInput, setCustomerFoodInput] = useState("");

  return (
    <div className="customer-food-card-container">
      <p>{name}</p>
      <div className="customer-foods-container">
        <div className="customer-food">
          {foods.map((food) => (
            <p key={uuid()}>{food}</p>
          ))}
        </div>
        <div className="customer-food-input-container">
          <input
            value={customerFoodInput}
            onChange={(e) => setCustomerFoodInput(e.target.value)}
          />
          <button
            onClick={() => {
              if (!customerFoodInput.trim()) {
                return;
              }
              dispatch(addFoodToCustomer({ id, food: customerFoodInput }));
              setCustomerFoodInput("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
