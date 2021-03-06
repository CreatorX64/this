// Action creators (people dropping off a form)

const createPolicy = (name, amount) => {
  // Action (the form)
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

// Reducers (company departments)

const accounting = (bagOfMoney = 100, action) => {
  // We care about this action (form)
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }

  // We don't care about this action (form)
  return bagOfMoney;
};

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    return [...oldListOfClaims, action.payload];
  }

  return oldListOfClaims;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }

  return listOfPolicies;
};

const { combineReducers, createStore } = Redux;

const ourDepartmnets = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartmnets);

store.dispatch(createPolicy("Alex", 20));
store.dispatch(createPolicy("Jim", 30));
store.dispatch(createPolicy("Bob", 40));

store.dispatch(createClaim("Alex", 120));
store.dispatch(createClaim("Jim", 50));

store.dispatch(deletePolicy("Bob"));

console.log(store.getState());
