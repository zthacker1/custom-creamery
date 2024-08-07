import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { useEffect, useState } from "react";
import { MyCustomIceCream } from "../components/iceCream/MyCustomIceCream";
import { EditCustomIceCream } from "../components/forms/EditCustomIceCream";
import { CreateCustomIceCream } from "../components/forms/CreateCustomIceCream";
import { UserNavbar } from "../components/navbar/UserNavbar";

export const UserView = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCCUser = localStorage.getItem("cc_user");
    const CCUserObject = JSON.parse(localCCUser);

    setCurrentUser(CCUserObject);
  }, []);

  return (
    <>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Welcome />} />

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
        </Route>
      </Routes>
    </>
  );
};
