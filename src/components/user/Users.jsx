import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import "./Users.css";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const getAndSetUsers = () => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  };

  useEffect(() => {
    getAndSetUsers();
  }, []);

  return (
    <>
      <div className="users-container">
        <h2>All Users</h2>
        <article className="users">
          {users.map((user) => {
            return (
              <section className="user" key={user.id}>
                <header>{user.name}</header>
                <section>
                  <div>Address: {user.address}</div>
                  <div>Email: {user.email}</div>
                </section>
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
};
