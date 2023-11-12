import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

// we have regex here for some reason
const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  // adding a new user hook
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  // navigating
  const navigate = useNavigate();

  // the new user info state, we have a username, a validUsername and a pass and a valid pass and a roles
  // the info is username and pass and roles the other two are to check the validity of data lets see where and how they're used
  const [username, setUserName] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  // here we have two useEffect, re-renders if the username or pass is changed
  // it checks if the user name is following the regex rules
  // it checks if the pass is following the regex rules
  // we are setting the validity states, how do we use them later tho?
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  // if the adding works, then reset and navigate to users page
  useEffect(() => {
    if (isSuccess) {
      setUserName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  // here are the functions that set the username and the pass lets see where they're used and lets check he page that gets rendered
  const onUsernameChanged = (e) => setUserName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  // he says this approach is because we are allowing more than one option to be selected so wonder how it'll look like if there was one option allowed
  // here we have the setter for the roles, we create values and then thats what we pass to set the roles
  // values is saying create an array from e.target.selectedOptions and also an anon func that takes options (where is options come from?) and gets option.value
  // wonder what values really return ... gotta ask chat
  // here array takes selectedOptions which is an html collection and transforms it to an array and then gets each option and extracts whats inside it whether its employee or manager and saves it in values and we basically set up in the values array, so it can be just one or more because we are doing the selectedOptions route here
  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  // can save here is slightly diff it checks if roles has length thats the min and checks if the pass and user is valid so thats how we use them and if its not loading if thats the case then the save btn can be used now and we can also use the addNew user hook
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  // here the func for adding a new user if canSave is true then we can add new use and we pas the username and pass and roles array this will be passed to the form not on a btn since we prevent default here
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  // this here takes roles which i'm guessing is an obj and makes it an array and then maps over each role if there is more than one and creates an option html for it that we render later in the form
  // so yeah, roles is an obj and we transform it to array using this code
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // conditional class rendering stuff
  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  // content here
  const content = (
    <>
      {/* like usual shows the err msg from the new hook if there */}
      <p className={errClass}>{error?.data?.message}</p>

      {/* the form and the saving new user func here */}
      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            {/* only works if can save checks out otherwise disabled  */}
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          // how user name changes
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          // how pass changes
          onChange={onPasswordChanged}
        />

        {/* since we have drop own of options we use select  */}
        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          // these here are new for me lets see how it looks without them the purpose seems to be able to choose more than one option i think
          multiple={true}
          size="3"
          //
          value={roles}
          // this is the func that sets the roles
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};
export default NewUserForm;
