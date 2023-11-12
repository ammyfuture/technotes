import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { selectNoteById } from "./notesApiSlice";

import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from "react";

// this page renders the body of the table
const Note = ({ noteId }) => {
  // to use selectNoteById we need the state and id and we get the id from noteList and state from useSelector and now we have a note based on their id.
  // now we have our note
  // const note = useSelector((state) => selectNoteById(state, noteId));

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  // we pass path to navigate() and it redirects us there
  const navigate = useNavigate();
  // console.log(note);
  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedNote = memo(Note);
export default memoizedNote;
// this code is extracting stuff from the note obj and its putting them as values for the cells of the body in order, first gets either completed or open based on whether the value in the obj is true or false and second gets created and third updated and fourth gets note.title and fifth gets the username and sixth gets a func that redirects to a page to edit the obj info
// thing i want to understand is whats going on with updated and created because the initial result from the obj is being manipulated but besides that its all gucci
