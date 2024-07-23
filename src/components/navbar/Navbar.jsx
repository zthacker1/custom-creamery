import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/users">All Users</Link>
      </li>
      <li className="navbar-item">
        <Link to="/customIceCreamList">All Custom Creations</Link>
      </li>
    </ul>
  );
};
