import { Outlet, Route, Routes } from "react-router-dom";
import { CustomIceCreamList } from "../components/iceCream/CustomIceCreamList";
import { Users } from "../components/user/Users";
import { Navbar } from "../components/navbar/Navbar";
import { Welcome } from "../components/welcome/Welcome";
import { useEffect, useState } from "react";
import { MyCustomIceCream } from "../components/iceCream/MyCustomIceCream";
import { EditCustomIceCream } from "../components/forms/EditCustomIceCream";
import { CreateCustomIceCream } from "../components/forms/CreateCustomIceCream";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCCUser = localStorage.getItem("cc_user");
    const CCUserObject = JSON.parse(localCCUser);

    setCurrentUser(CCUserObject);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Welcome />} />
          <Route
            path="customIceCreamList"
            element={<CustomIceCreamList currentUser={currentUser} />}
          />
          <Route
            path="customIceCreamList/:customIceCreamListId"
            element={<EditCustomIceCream currentUser={currentUser} />}
          />
          <Route
            path="myCustomIceCream"
            element={<MyCustomIceCream currentUser={currentUser} />}
          />
          <Route
            path="myCustomIceCream/:customIceCreamListId"
            element={<EditCustomIceCream currentUser={currentUser} />}
          />
          <Route
            path="createCustomIceCream"
            element={<CreateCustomIceCream currentUser={currentUser} />}
          />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};
