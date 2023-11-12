// import { useSelector } from "react-redux";
// import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const NewNote = () => {
  // const users = useSelector(selectAllUsers);
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  // if (!users?.length) return <p>Not Available Currently</p>;

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;

// some diff here than new user comp
// this page gets users and then if users exist creates a newNoteForm component and if they don't it renders loading
// where is this shown? well i'll know through newNoteForm its content is the content that will be rendered
// why do u need to check if there are users before creating a new note tho?
