import { useEffect, useState } from "react";
import {
  getAllBaseFlavors,
  getAllCustomIceCream,
  getAllSizes,
  updateCustomIceCream,
} from "../../services/iceCreamService";
import { useParams, useNavigate } from "react-router-dom";

export const EditCustomIceCream = ({ currentUser }) => {
  const [allCustomIceCream, setAllCustomIceCream] = useState([]);
  const [allBaseFlavors, setAllBaseFlavors] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [formState, setFormState] = useState({ name: "", baseFlavorId: "" });
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
  }, []);

  useEffect(() => {
    const currentCustomIceCream = allCustomIceCream.find(
      (customIceCream) => customIceCream.id === parseInt(customIceCreamListId)
    );
    if (currentCustomIceCream) {
      setFormState({
        name: currentCustomIceCream.name,
        baseFlavorId: currentCustomIceCream.baseFlavorId,
        userId: currentUser.id,
        sizeId: currentCustomIceCream.sizeId,
      });
    }
  }, [allCustomIceCream, customIceCreamListId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomIceCream(customIceCreamListId, formState)
      .then(() => {
        navigate("/customIceCreamList");
      })
      .catch((error) => {
        console.error("Failed to update custom ice cream:", error);
        // Optionally, display an error message to the user
      });
  };

  if (!formState.name || !allBaseFlavors.length) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Custom Ice Cream</h2>
      <fieldset>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Base Flavor:</label>
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
        <button type="submit">Save</button>
      </fieldset>
    </form>
  );
};
