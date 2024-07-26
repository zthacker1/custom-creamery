import { useEffect, useState } from "react";
import {
  deleteCustomIceCream,
  deleteCustomIceCreamToppings,
  getAllBaseFlavors,
  getAllCustomIceCream,
  getAllSizes,
  getAllToppings,
  getCustomIceCreamToppings,
  updateCustomIceCream,
  updateCustomIceCreamToppings,
} from "../../services/iceCreamService";
import { useParams, useNavigate } from "react-router-dom";
import "./Forms.css";

export const EditCustomIceCream = () => {
  const [allCustomIceCream, setAllCustomIceCream] = useState([]);
  const [allBaseFlavors, setAllBaseFlavors] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [allCustomIceCreamToppings, setAllCustomIceCreamToppings] = useState(
    []
  );
  const [formState, setFormState] = useState({
    name: "",
    userId: 0,
    sizeId: 1,
    baseFlavorId: "",
  });
  const [selectedToppings, setSelectedToppings] = useState([]);
  const { customIceCreamListId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomIceCream().then((customIceCreamArray) => {
      setAllCustomIceCream(customIceCreamArray);
    });
    getAllBaseFlavors().then((baseFlavors) => {
      setAllBaseFlavors(baseFlavors);
    });
    getAllSizes().then((sizes) => {
      setAllSizes(sizes);
    });
    getAllToppings().then((toppings) => {
      setAllToppings(toppings);
    });
    getCustomIceCreamToppings().then((toppings) => {
      setAllCustomIceCreamToppings(toppings);
    });
  }, []);

  useEffect(() => {
    const currentCustomIceCream = allCustomIceCream.find(
      (customIceCream) => customIceCream.id === parseInt(customIceCreamListId)
    );
    if (currentCustomIceCream) {
      setFormState({
        name: currentCustomIceCream.name,
        baseFlavorId: currentCustomIceCream.baseFlavorId,
        userId: currentCustomIceCream.userId,
        sizeId: currentCustomIceCream.sizeId,
      });

      const currentToppings = allCustomIceCreamToppings
        .filter(
          (topping) => topping.customIceCreamId === currentCustomIceCream.id
        )
        .map((topping) => topping.toppingsId);
      setSelectedToppings(currentToppings);
    }
  }, [allCustomIceCream, customIceCreamListId, allCustomIceCreamToppings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;
    setSelectedToppings((prevToppings) =>
      checked
        ? [...prevToppings, parseInt(value)]
        : prevToppings.filter((t) => t !== parseInt(value))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomIceCream(customIceCreamListId, formState)
      .then(() => {
        const updatedToppings = selectedToppings.map((toppingsId) => ({
          customIceCreamId: parseInt(customIceCreamListId),
          toppingsId,
        }));
        return updateCustomIceCreamToppings(
          customIceCreamListId,
          updatedToppings
        );
      })
      .then(() => {
        navigate("/myCustomIceCream");
      })
      .catch((error) => {
        console.error("Failed to update custom ice cream:", error);
        // Optionally, display an error message to the user
      });
  };

  const handleDelete = async () => {
    try {
      // First, delete all associated toppings
      const toppingsToDelete = allCustomIceCreamToppings.filter(
        (topping) => topping.customIceCreamId === parseInt(customIceCreamListId)
      );

      await Promise.all(
        toppingsToDelete.map((topping) =>
          deleteCustomIceCreamToppings(topping.id)
        )
      );

      // Then, delete the custom ice cream
      await deleteCustomIceCream(customIceCreamListId);

      // Navigate back to the custom ice cream list
      navigate("/myCustomIceCream");
    } catch (error) {
      console.error("Failed to delete custom ice cream:", error);
    }
  };

  if (
    !formState.name ||
    !allBaseFlavors.length ||
    !allSizes.length ||
    !allToppings.length
  )
    return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Custom Ice Cream</h2>
      <fieldset>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Base Flavor: </label>
          <select
            name="baseFlavorId"
            value={formState.baseFlavorId}
            onChange={handleChange}
          >
            {allBaseFlavors.map((flavor) => (
              <option key={flavor.id} value={flavor.id}>
                {flavor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Size: </label>
          <select
            name="sizeId"
            value={formState.sizeId}
            onChange={handleChange}
          >
            {allSizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Toppings: </label>
          {allToppings.map((topping) => (
            <div key={topping.id}>
              <input
                type="checkbox"
                name="toppings"
                value={topping.id}
                checked={selectedToppings.includes(topping.id)}
                onChange={handleToppingChange}
              />
              {topping.name}
            </div>
          ))}
        </div>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </button>
      </fieldset>
    </form>
  );
};
