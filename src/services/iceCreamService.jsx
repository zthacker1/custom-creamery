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
