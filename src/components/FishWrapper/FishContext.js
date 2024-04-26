import React, { createContext, useContext, useReducer, useEffect } from "react";
import fishReducer from "./fishReducer";
// import { getCars } from "../../services/carsApi";
import { getFish } from "../../services/fishApi";

const FishContext = createContext();

export const CarsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fishReducer, []);
  useEffect(() => {
    const fetchData = async () => {
      const cardsData = await getFish();
      dispatch({ type: "SET_CARDS", payload: cardsData });
    };

    fetchData();
  }, []);

  return (
    <FishContext.Provider value={{ state, dispatch }}>
      {children}
    </FishContext.Provider>
  );
};

export const useCars = () => useContext(FishContext);
