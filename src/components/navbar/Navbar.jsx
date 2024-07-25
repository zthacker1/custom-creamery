import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/users">All Users</Link>
      </li>
      <li className="navbar-item">
        <Link to="/customIceCreamList">All Custom Ice Cream</Link>
      </li>
    </ul>
  );
};
