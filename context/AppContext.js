import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

const Context = createContext();

export const AppContext = ({ children }) => {
  const [isDelivery, setIsDelivery] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Context.Provider
      value={{
        isDelivery,
        setIsDelivery,
        isLoaded,
        setIsLoaded,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
