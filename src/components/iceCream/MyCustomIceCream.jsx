import { useEffect, useState } from "react";
import {
  getAllBaseFlavors,
  getAllCustomIceCream,
  getAllCustomIceCreamToppings,
  getAllToppings,
} from "../../services/iceCreamService";
import "./CustomIceCreamList.css";

export const MyCustomIceCream = ({ currentUser }) => {
  const [allCustomIceCream, setAllCustomIceCream] = useState([]);
  const [allBaseFlavors, setAllBaseFlavors] = useState([]);
  const [allCustomIceCreamToppings, setAllCustomIceCreamToppings] = useState(
    []
  );
  const [allToppings, setAllToppings] = useState([]);

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
    getAllToppings().then((allToppings) => {
      setAllToppings(allToppings);
    });
  }, []);

  useEffect(() => {
    getAllCustomIceCreamToppings().then((allToppings) => {
      setAllCustomIceCreamToppings(allToppings);
    });
  }, []);

  const size = (id) => {
    switch (id) {
      case 1:
        return "pint";
      case 2:
        return "quart";
      case 3:
        return "gallon";
      case 4:
        return "3-gallon";
      default:
        return "Unknown size";
    }
  };

  const currentBaseFlavor = (customIceCream) => {
    return allBaseFlavors.find(
      (baseFlavor) => baseFlavor.id === parseInt(customIceCream.baseFlavorId)
    );
  };

  const currentToppings = (customIceCream) => {
    return allCustomIceCreamToppings
      .filter((topping) => topping.customIceCreamId === customIceCream.id)
      .map((topping) => {
        const toppingDetails = allToppings.find(
          (top) => top.id === topping.toppingsId
        );
        return toppingDetails ? toppingDetails.name : "Unknown topping";
      });
  };

  return (
    <>
      <div className="customIceCream-container">
        <h2>All Custom Ice Cream</h2>
        <article className="customIceCreams">
          {allCustomIceCream
            .filter(
              (customIceCream) => customIceCream.userId === currentUser.id
            )
            .map((customIceCream) => {
              const baseFlavor = currentBaseFlavor(customIceCream);
              const toppings = currentToppings(customIceCream);
              return (
                <section className="customIceCream" key={customIceCream.id}>
                  <header>{customIceCream.name}</header>
                  <ul>Size: {size(customIceCream.sizeId)}</ul>
                  <ul>
                    Base Flavor: {baseFlavor ? baseFlavor.name : "Unknown"}
                  </ul>
                  <ul>
                    Toppings:
                    {toppings.length > 0
                      ? toppings.map((topping, index) => (
                          <li key={index}>{topping}</li>
                        ))
                      : "None"}
                  </ul>
                  <footer>
                    <div className="edit-btn">Edit</div>
                  </footer>
                </section>
              );
            })}
        </article>
      </div>
    </>
  );
};
