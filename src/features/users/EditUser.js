import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

// new
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const EditUser = () => {
  // so this is the wrapping func
  const { id } = useParams();

  // use selector isn't querying the data again which is why we don't have a subscription?
  // he also says whe aren't using rtk quey and rtk query would know we already had that data and create that sub
  // he said well pulling this out of the cash and out of redux state and using select user by id rather than creating a new sub and we want the notes and the users thought the app
  // we solve tis with a comp called prefetch.js in the auth

  // we get the user using the selectUserById selector and pass the id we get from useParam
  // NOTE
  // const user = useSelector((state) => selectUserById(state, id));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  // content what gets returned is if there is a user, show the edit user page otherwise show loading
  // we pass user here too
  // NOTE
  // const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  if (!user) return <PulseLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
