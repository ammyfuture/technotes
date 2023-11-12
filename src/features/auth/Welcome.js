import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  // new date here
  const date = new Date();

  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome {username}!</h1>
      <div>
        <p>
          <Link to="/dash/notes">View techNotes</Link>
        </p>

        <p>
          <Link to="/dash/notes/new">Add New techNote</Link>
        </p>

        {(isManager || isAdmin) && (
          <p>
            <Link to="/dash/users">View User Settings</Link>
          </p>
        )}
        {(isManager || isAdmin) && (
          <p>
            <Link to="/dash/users/new">Add New User</Link>
          </p>
        )}
      </div>
    </section>
  );

  return content;
};
export default Welcome;

// this comp has an h1 with a welcome and then bunch of links to different pages we have, one for the dash/notes one for dash/notes/new one for dash/users and one for dash/users/new we also show a day before all of that.
