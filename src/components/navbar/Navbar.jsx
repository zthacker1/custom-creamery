import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/users">All Users</Link>
      </li>
      <li className="navbar-item">
        <Link to="/customIceCreamList">All Custom Ice Cream</Link>
      </li>
      <li className="navbar-item">
        <Link to="/myCustomIceCream">My Custom Ice Cream</Link>
      </li>
      <li className="navbar-item">
        <Link to="/createCustomIceCream">Create New Ice Cream</Link>
      </li>
      {localStorage.getItem("cc_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("cc_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
