import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  // useEffect(() => {
  //   // this is a manual sub to notes and users that will remain active want to know more
  //   console.log("subscribing");
  //   const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

  //   const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

  //   return () => {
  //     // this un-sub when we leave the protected routes
  //     console.log("unsubscribing");
  //     notes.unsubscribe();
  //     users.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
  }, []);

  // returns all the children so this will warp the whole app, wonder on top of the layout or under it? oh its so the protected pages so under the layout i think

  // prefetch helps with prefilling the form and if we want to re-load and still have the state
  return <Outlet />;
};
export default Prefetch;
