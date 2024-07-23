import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li>
      <li className="navbar-item">
        <Link to="/workout">My Workouts</Link>
      </li>
    </ul>
  );
};
