import { Outlet, Route, Routes } from "react-router-dom";
import { CustomIceCreamList } from "./components/iceCream/CustomIceCreamList";
import { Users } from "./components/user/Users";
import { Navbar } from "./components/navbar/Navbar";
import { Welcome } from "./components/welcome/Welcome";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="customIceCreamList" element={<CustomIceCreamList />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};
