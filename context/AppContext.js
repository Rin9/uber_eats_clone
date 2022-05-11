import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

const Context = createContext();

export const AppContext = ({ children }) => {
  const [isDelivery, setIsDelivery] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // filter part start
  const [filterState, setFilterState] = useState({
    sort: "pfy",
    switch: {
      "switch-1": false,
      "switch-2": false,
    },
    price: {
      "price-1": false,
      "price-2": false,
      "price-3": false,
      "price-4": false,
    },
    delivery: {
      "delivery-1": false,
      "delivery-2": false,
      "delivery-3": false,
      "delivery-4": false,
    },
    dietary: {
      "dietary-1": false,
      "dietary-2": false,
    },
  });
  // this is for sort
  const [sortState, setSortState] = useState("pfy");
  //this is for the switch in from uber eats
  const [switchValue, setSwitchValue] = useState({
    "switch-1": false,
    "switch-2": false,
  });

  // this is the price range tag
  const [priceTag, setPriceTag] = useState({
    "price-1": false,
    "price-2": false,
    "price-3": false,
    "price-4": false,
  });
  // this is for the delivery fee tag
  const [deliveryFee, setDeliveryFee] = useState({
    "delivery-1": false,
    "delivery-2": false,
    "delivery-3": false,
    "delivery-4": false,
  });
  const [dietary, setDietary] = useState({
    "dietary-1": false,
    "dietary-2": false,
  });
  // filter part end

  return (
    <Context.Provider
      value={{
        isDelivery,
        setIsDelivery,
        isLoaded,
        setIsLoaded,
        sortState,
        setSortState,
        switchValue,
        setSwitchValue,
        priceTag,
        setPriceTag,
        deliveryFee,
        setDeliveryFee,
        dietary,
        setDietary,
        filterState,
        setFilterState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
