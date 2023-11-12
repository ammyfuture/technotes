import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { selectUserById } from "./usersApiSlice";

import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

const User = ({ userId }) => {
  // const user = useSelector((state) => selectUserById(state, userId));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    // this code is giving us spaces between each role and adding a comma like this ,
    // yeah basically it adds comma and space (, ) <= this
    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}> {user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        {/* <td className={`table__cell ${cellStatus}`}>{user.roles}</td> */}

        <td className={`table__cell ${cellStatus}`}>
          {/* this code takes us to dash/users/userId to update the user which will be a user editing form */}
          {/* this updates the user so either update or delete not new  */}
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);
export default memoizedUser;
