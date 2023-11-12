import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

// another regex for user and pass this one is for updating and deleting the user
const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  // update hook
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  // delete hook
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  // navigate
  const navigate = useNavigate();

  // the updating states user, pass, roles and we have another which is active? where do we use this and why do we need it?
  // unlike new these already have values and where are they getting it from? we have user as a prop lets see from where
  // user.username
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  // pass is empty why?
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  // user.roles
  const [roles, setRoles] = useState(user.roles);
  // user.active
  const [active, setActive] = useState(user.active);

  // whats this prop?

  // setting the validation for user and pass using useEffect
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  // doing the reset and navigation if update or delete is gucci
  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // handlers
  // the name and pass and roles one, same code from before
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  // new code, a handler for active? it just flips the state if user.active is true, this is false or opposite
  const onActiveChanged = () => setActive((prev) => !prev);

  // this is the saving func, we check if pass is updated to first, so right now, pass is an empty string, which is a false, so if its full then we send the new pass with the update otherwise we just send the rest
  // the thing i'm not seeing here is the can save one?
  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };
  // deleting simple just pass the user.id
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  // options for the roles, same as before
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  // cans save is diff here, its a let
  let canSave;
  // if pass is filled in
  if (password) {
    canSave =
      // check roles length, and check the valid name and pass and if is loading is not true
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    // else check the roles length and the valid user and if is Loading is not true
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  // classes
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";
  // err messages
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  // content here
  const content = (
    <>
      {/* err msg if there is any */}
      <p className={errClass}>{errContent}</p>
      {/* like the edit for note the func for submit is just for prevent here and the handler will be on a btn */}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              // saving func,
              onClick={onSaveUserClicked}
              // i guess no need to use can save to get to the func part because the tbn will be disabled until conditions are fulfilled
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              // delete func
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
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
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            // active is a checkbox, but when did we add it? i guess we only have it here? its false by default in the server so here we can update it to active but shouldn't we have done it in the new too? that would make since instead of having to navigate here just to change it let me try to create a new user
            checked={active}
            // this changes active to opposite if clicked its a check list
            onChange={onActiveChanged}
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          // same as before for multiple options
          multiple={true}
          size="3"
          //
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};
export default EditUserForm;
