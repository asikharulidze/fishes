const API_URL = "http://localhost:9000";

export const getCars = async () => {
  const response = await fetch(`${API_URL}/cars`);

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await response.json();
  return data;
};

export const createCar = async (carData) => {
  const response = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new Error("Failed to create car");
  }
  const data = await response.json();
  return data;
};
