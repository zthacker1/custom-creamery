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

export const getCustomIceCreamToppings = () => {
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

export const updateCustomIceCreamToppings = async (
  customIceCreamId,
  updatedToppings
) => {
  try {
    // First, fetch existing toppings for the custom ice cream
    const existingToppingsResponse = await fetch(
      `http://localhost:8088/customIceCreamToppings?customIceCreamId=${customIceCreamId}`
    );
    const existingToppings = await existingToppingsResponse.json();

    // Delete existing toppings
    await Promise.all(
      existingToppings.map((topping) =>
        fetch(`http://localhost:8088/customIceCreamToppings/${topping.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
      )
    );

    // Add the updated toppings
    const postResponses = await Promise.all(
      updatedToppings.map((topping) =>
        fetch(`http://localhost:8088/customIceCreamToppings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(topping),
        })
      )
    );

    const data = await Promise.all(postResponses.map((res) => res.json()));
    return data;
  } catch (error) {
    console.error("Error updating custom ice cream toppings:", error);
    throw error;
  }
};

export const createCustomIceCream = async (newCustomIceCream) => {
  try {
    const response = await fetch(`http://localhost:8088/customIceCream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomIceCream),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating custom ice cream:", error);
    throw error;
  }
};

export const addCustomIceCreamToppings = async (newToppings) => {
  try {
    const postResponses = await Promise.all(
      newToppings.map((topping) =>
        fetch(`http://localhost:8088/customIceCreamToppings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(topping),
        })
      )
    );

    const data = await Promise.all(postResponses.map((res) => res.json()));
    return data;
  } catch (error) {
    console.error("Error adding custom ice cream toppings:", error);
    throw error;
  }
};

export const deleteCustomIceCreamToppings = async (toppingId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/customIceCreamToppings/${toppingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Error deleting custom ice cream topping:", error);
    throw error;
  }
};

export const deleteCustomIceCream = async (customIceCreamId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/customIceCream/${customIceCreamId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Error deleting custom ice cream:", error);
    throw error;
  }
};
