const API_URL = "http://localhost:9000";

export const getFish = async () => {
  const response = await fetch(`${API_URL}/fishes`);

  if (!response.ok) {
    throw new Error("Failed to fetch fish");
  }
  const data = await response.json();
  return data;
};

export const createCard = async (cardData) => {
  const response = await fetch(`${API_URL}/fishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  if (!response.ok) {
    throw new Error("Failed to create card");
  }
  const data = await response.json();
  return data;
};
