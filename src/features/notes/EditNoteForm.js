import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth();
  // updating the func is updateNote
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  // deleting the func is deleteNote

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  // we will navigate somewhere it seems
  const navigate = useNavigate();

  // the states that will be held in our updated or deleted obj or array? i think this is just for the updating
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  // reset here for both update and delete if either is successful and here where we use navigate
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // here we are creating funcs to set our updating state i'm assuming, lets see where each is being used
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  // this is can save for save btn if title is full an text is full and userId is full and the state isn't on isLoading thats for updating because del has no isLoading just isSuccess and isErr and Err then return true otherwise return false we use this to disable the save btn
  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  // if canSave is true then we will update and we pass the note.id from note we get from EditNote comp and userId as user and title and text and completed this is triggered on btn click to update
  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };
  // this is for the delete btn, if its clicked then we get the id from note.id and pass that and that from our server will get the id and delete the note with the id
  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  // this more complex than the create note i think
  // more config for the created and updated
  // we have day and month and year and hour and min and sec why tho? all numeric beside month is long and i'm guessing it'll be letters same for updated
  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // options here like the previous comp, we here map over users and get each user and then for each user we create an options html and pass key and pass value which is user.id and inside it we pass user.username
  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  // not sure what this is but don't matter yeah its just for css
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";
  // hmm chooses which is the err either coming from update or from del or its empty?
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <>
      {/* so here we show the err, either it'll come from update or delete if so this here will show it otherwise it'll be empty */}
      <p className={errClass}>{errContent}</p>

      {/* on submit here does the prevent default its interesting so the update and delete will have their own btns */}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          {/* when did we add a note ticket? cant remember  */}
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              // this is the saving btn, will show if all fields are full and it updates the note and gets sent to backend
              onClick={onSaveNoteClicked}
              // only works if canSave is true
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {/* <button
              // this is the delete btn update btn and delete are next to each other
              className="icon-button"
              title="Delete"
              // the func for deleting if clicked the note is bye bye
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button> */}
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;

// okay got the jest of this buddy not sure if need be to go and check user probably the same ...
