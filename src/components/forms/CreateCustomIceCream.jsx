import { useEffect, useState } from "react";
import {
  getAllBaseFlavors,
  getAllSizes,
  getAllToppings,
  createCustomIceCream,
  addCustomIceCreamToppings,
} from "../../services/iceCreamService";
import { useNavigate } from "react-router-dom";
import "./Forms.css";

export const CreateCustomIceCream = ({ currentUser }) => {
  const [allBaseFlavors, setAllBaseFlavors] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    userId: currentUser.id,
    sizeId: "",
    baseFlavorId: "",
  });
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllBaseFlavors().then((baseFlavors) => {
      setAllBaseFlavors(baseFlavors);
    });
    getAllSizes().then((sizes) => {
      setAllSizes(sizes);
    });
    getAllToppings().then((toppings) => {
      setAllToppings(toppings);
    });
  }, []);

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

    if (!formState.name || !formState.baseFlavorId || !formState.sizeId) {
      setFormError("Please fill out all fields.");
      return;
    }

    createCustomIceCream(formState)
      .then((newCustomIceCream) => {
        const newToppings = selectedToppings.map((toppingsId) => ({
          customIceCreamId: newCustomIceCream.id,
          toppingsId,
        }));
        return addCustomIceCreamToppings(newToppings);
      })
      .then(() => {
        navigate("/myCustomIceCream");
      })
      .catch((error) => {
        console.error("Failed to create custom ice cream:", error);
        // Optionally, display an error message to the user
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Custom Ice Cream</h2>
      {formError && <div style={{ color: "red" }}>{formError}</div>}
      <fieldset>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
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
            <option value="" disabled>
              Please select a base flavor
            </option>
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
            <option value="" disabled>
              Please select a size
            </option>
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
      </fieldset>
    </form>
  );
};
