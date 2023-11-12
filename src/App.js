import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";

import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";

import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";

import Prefetch from "./features/auth/Prefetch";

import PersistLogin from "./features/auth/PersistLogin";

import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
function App() {
  useTitle("Dan D. Repairs");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* protected routes */} {/* login persisted if they want */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              {/* here is where protected routes live lets connect the dots to how they'll be protected  */}
              <Route path="dash" element={<DashLayout />}>
                {/* dash layout has the header  */}
                {/* whats in here sandwiched will be the main in the middle */}
                {/* so when we go to /dash we go to the welcome page */}
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                {/* interesting layout here so we might add things to the path so we can use it like this another reason to nest besides wanting to protect routes or wanting to add a layout lets see how he uses it */}
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                {/* it also has the footer */}
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
