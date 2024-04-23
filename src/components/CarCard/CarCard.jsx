import { useState } from "react";
import styles from "./CarCard.module.css";
import Modal from "../Modal/Modal";
import { useSearchParams } from "react-router-dom";

const CarCard = ({ id, img, make, year, price, onCloseModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const carIdQueryParam = searchParams.get("id");
  const [isShowing, setIsShowing] = useState(carIdQueryParam === id.toString());
  const [stars, setStars] = useState(0);

  const showCar = () => {
    setIsShowing(true);
    setSearchParams({ id });
  };

  const closeModal = () => {
    setIsShowing(false);
    onCloseModal();
    setSearchParams({});
  };

  const handleStarClick = () => {
    setStars(stars + 1);
  };

  // Define a CSS class conditionally based on the value of the 'year' prop
  // const cardClassName = year < 2019 ? "car red-background" : "car";
  //  className={`car ${cardClassName}`}

  // Function to generate star symbols based on the count
  const renderStars = () => {
    let starIcons = "";
    for (let i = 0; i < stars; i++) {
      starIcons += "⭐";
    }
    return starIcons;
  };

  return (
    <>
      <div className={styles.card}>
        <img className={styles.cardImg} src={img} alt={make} />
        <h3>Make: {make}</h3>
        {year > 2010 ? (
          <p style={{ color: "green" }}>Year: {year}</p>
        ) : (
          <p style={{ color: "red" }}>Year: {year}</p>
        )}
        <p>Price: {price}</p>
        <button onClick={() => showCar()}>Show</button>
      </div>

      {isShowing && (
        <Modal onClose={() => closeModal()}>
          <img className={styles.img} src={img} alt={make} />
          <span className={styles.starContainer}>
            Stars: {renderStars()} {stars}
            <button
              className={styles.starButton}
              onClick={() => {
                if (stars < 10) {
                  handleStarClick();
                }
              }}
            >
              👍
            </button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default CarCard;
