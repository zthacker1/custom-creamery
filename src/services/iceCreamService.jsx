export const getAllCustomIceCream = () => {
  return fetch(`http://localhost:8088/customIceCream`).then((res) =>
    res.json()
  );
};

export const getAllBaseFlavors = () => {
  return fetch(`http://localhost:8088/baseFlavors`).then((res) => res.json());
};

export const getAllSizes = () => {
  return fetch(`http://localhost:8088/sizes`).then((res) => res.json());
};

export const getAllToppings = () => {
  return fetch(`http://localhost:8088/toppings`).then((res) => res.json());
};

export const getAllCustomIceCreamToppings = () => {
  return fetch(`http://localhost:8088/customIceCreamToppings`).then((res) =>
    res.json()
  );
};

export const editCustomIceCream = (o) => {
  return fetch(`http://localhost:8088/customIceCream/${o.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(o),
  });
};

export const getBaseFlavorsById = (o) => {
  return fetch(`http://localhost:8088/baseFlavors/${o.id}`).then((res) =>
    res.json()
  );
};

// Function to update custom ice cream details using Fetch API
export const updateCustomIceCream = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:8088/customIceCream/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating custom ice cream:", error);
    throw error;
  }
};
