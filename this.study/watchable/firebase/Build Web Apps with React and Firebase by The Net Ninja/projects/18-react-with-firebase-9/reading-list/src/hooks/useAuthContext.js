import { useContext } from "react";

import AuthContext from "context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext() must be inside AuthContext.Provider");
  }

  return context;
};

export default useAuthContext;
