import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../Modal/Modal";
import { createCard } from "../../services/fishApi";

const Form = styled.form`
  min-width: 300px;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CreateCarForm = () => {
  const navigate = useNavigate();
  const { dispatchCards } = useOutletContext();

  const infoInputRef = useRef(null);

  useEffect(() => {
    infoInputRef.current.focus();
  }, []);

  const [carForm, setCarForm] = useState({
    id: Math.random() + "",
    info: "",
    region: "",
    scientificName: "",
    name: "",
    img: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCarForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatchCards({ type: "LOADING", payload: true });

    const errors = validateForm();
    setFormErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        const newCar = await createCard(carForm);
        dispatchCards({ type: "ADD_CARD", payload: newCar });
        dispatchCards({ type: "LOADING", payload: false });

        navigate("/fishes");
      } catch (error) {
        console.error("Failed to create fish card", error);
        dispatchCards({ type: "LOADING", payload: false });
      }
      // Reset form
      setCarForm({
        id: Math.random() + "",
        info: "",
        region: "",
        scientificName: "",
        name: "",
        img: ""
      });
      dispatchCards({ type: "LOADING" });
    } else {
      console.log("Form is invalid");
      dispatchCards({ type: "LOADING", payload: false });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (carForm.info.trim() === "") {
      errors.info = "info is required!";
    }


    if (carForm.name.trim() === "") {
      errors.make = "name is required!";
    }



    if (carForm.img.trim() === "") {
      errors.img = "Image URL is required!";
    }

    return errors;
  };

  const handleClose = () => {
    navigate("/fishes");
  };

  return (
    <Modal onClose={() => handleClose()}>
      <Form onSubmit={handleSubmit}>
        <label>
          Info:
          <Input
            type="text"
            name="info"
            value={carForm.info}
            onChange={handleChange}
            ref={infoInputRef}
          />
        </label>
        {formErrors.info && <ErrorMessage>{formErrors.info}</ErrorMessage>}
        <br />
        <label>
          Region:
          <Input
            type="text"
            name="region"
            value={carForm.region}
            onChange={handleChange}
          />
          {formErrors.region && <ErrorMessage>{formErrors.region}</ErrorMessage>}
        </label>
        <br />
        <label>
          Scientific Name:
          <Input
            type="text"
            name="scientificName"
            value={carForm.scientificName}
            onChange={handleChange}
          />
          {formErrors.scientificName && (
            <ErrorMessage>{formErrors.scientificName}</ErrorMessage>
          )}
        </label>
        <br />
        <label>
          Name:
          <Input
            type="text"
            name="name"
            value={carForm.name}
            onChange={handleChange}
          />
          {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
        </label>
        <br />
        <label>
          Image URL:
          <Input
            type="text"
            name="img"
            value={carForm.img}
            onChange={handleChange}
          />
          {formErrors.img && <ErrorMessage>{formErrors.img}</ErrorMessage>}
        </label>
        <br />
        <Button type="submit">Create Fish Card</Button>
      </Form>
    </Modal>
  );
};

export default CreateCarForm;
