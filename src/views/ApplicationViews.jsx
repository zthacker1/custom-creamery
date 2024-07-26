import { useEffect, useState } from "react";
import { AdminView } from "./AdminView";
import { UserView } from "./UserView";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCCUser = localStorage.getItem("cc_user");
    const CCUserObject = JSON.parse(localCCUser);

    setCurrentUser(CCUserObject);
  }, []);

  return currentUser.isAdmin === true ? (
    <AdminView currentUser={currentUser} />
  ) : (
    <UserView currentUser={currentUser} />
  );
};
