import { useEffect, useState } from "react";
import {
  getAllBaseFlavors,
  getAllCustomIceCream,
  getAllCustomIceCreamToppings,
} from "../../services/iceCreamService";
import "./CustomIceCreamList.css";

export const CustomIceCreamList = () => {
  const [allCustomIceCream, setAllCustomIceCream] = useState([]);
  const [allBaseFlavors, setAllBaseFlavors] = useState([]);
  const [allCustomIceCreamToppings, setAllCustomIceCreamToppings] = useState(
    []
  );

  useEffect(() => {
    getAllCustomIceCream().then((customIceCreamArray) => {
      setAllCustomIceCream(customIceCreamArray);
    });
  }, []);

  useEffect(() => {
    getAllBaseFlavors().then((allBaseFlavors) => {
      setAllBaseFlavors(allBaseFlavors);
    });
  }, []);

  useEffect(() => {
    getAllCustomIceCreamToppings().then((allToppings) => {
      setAllCustomIceCreamToppings(allToppings);
    });
  }, []);

  const size = (id) => {
    if (id === 1) {
      return "pint";
    } else if (id === 2) {
      return "quart";
    } else if (id === 3) {
      return "gallon";
    } else if (id === 4) {
      return " 3-gallon";
    }
  };

  let currentBaseFlavor = (customIceCream) => {
    return allBaseFlavors.find(
      (baseFlavor) => baseFlavor.id === parseInt(customIceCream.baseFlavorId)
    );
  };

  return (
    <>
      <div className="customIceCream-container">
        <h2>All Custom Ice Cream</h2>
        <article className="customIceCreams">
          {allCustomIceCream.map((customIceCream) => {
            const baseFlavor = currentBaseFlavor(customIceCream);
            return (
              <section className="customIceCream" key={customIceCream.id}>
                <header>{customIceCream.name}</header>
                <ul>Size: {size(customIceCream.sizeId)}</ul>
                <ul>Base Flavor: {baseFlavor ? baseFlavor.name : "Unknown"}</ul>
                <ul>Toppings:</ul>
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
};
