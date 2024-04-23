import React, { useReducer } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router-dom";
import styles from "./CarsWrapper.module.css";
import FishCard from "../CarCard/FishCard";
import { getFish } from "../../services/fishApi";
import cardsReducer from "./fishReducer";
import { nanoid } from 'nanoid';
import { useAuthCont } from "../../context/AuthContext";
export async function carsLoader() {
  const fish = await getFish();

  return fish;
}

const CardsWrapper = () => {
  const { isAuth, user } = useAuthCont();

  const navigate = useNavigate();
  const cards = useLoaderData();
  const [cardsState, dispatchCards] = useReducer(cardsReducer, {
    cardsList: cards,
    loading: false,
  });

  return (
    <div  className={styles.cardsWrapper}>
      {cardsState.loading && <div>Loading...</div>}
      {isAuth ? 
        <button onClick={() => navigate("/fishes/create")} className={"p-4 mb-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50"}>
          Create New Card
        </button>
      : 
      <div className={"p-4 mb-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50"} role="alert">
        <span className={"font-medium"}>Info alert!</span> To create a new card please login first.
      </div>
      }
      

      <Outlet context={{ dispatchCards }} />
      <div className={styles.cardsContainer}>
        {cardsState.cardsList.map((fish) => {
          return (
            <FishCard 
                    key={nanoid()}
                    id={fish.id}
                    src={fish?.illustrationPhoto?.src || "fishes/demo.jpg"} 
                    alt={fish?.illustrationPhoto?.alt || "no image"} 
                    title={fish.scientificName}
                    region={fish.region}
                    name={fish.name}
                    info={fish.info}
                    onCloseModal={() => navigate("/fishes")}
                    />
          );
        })}
      </div>
    </div>
  );
};

export default CardsWrapper;
