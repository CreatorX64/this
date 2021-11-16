import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  id: string;
  name: string;
  foods: string[];
}

interface CustomersState {
  value: Customer[];
}

const initialState: CustomersState = {
  value: []
};

interface AddFoodToCustomerPayload {
  id: string;
  food: string;
}

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    addFoodToCustomer: (
      state,
      action: PayloadAction<AddFoodToCustomerPayload>
    ) => {
      state.value.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.foods.push(action.payload.food);
        }
      });
    }
  }
});

export const { addCustomer, addFoodToCustomer } = customersSlice.actions;

export const customersReducer = customersSlice.reducer;
