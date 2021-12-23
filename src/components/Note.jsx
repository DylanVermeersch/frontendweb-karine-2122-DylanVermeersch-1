import { MdDeleteForever, MdEditNote } from 'react-icons/md';
import { Link } from "react-router-dom";
import { memo, useCallback, useContext } from "react";
import { NotesContext } from "../contexts/NotesProvider";

const Note = memo(({ id, title, text, date, userId }) => {
  const { deleteNote } = useContext(NotesContext);

  const handleDeleteNote = useCallback(() => {
    deleteNote(id);
  }, [deleteNote, id]);

  return (
    <div className="note">
      <div className="note-header">{title}</div>
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <div className="icons">
          <Link 
            className="button"
            data-cy="note_edit_btn"
            to={`/notes/edit/${id}`}
          >
            <MdEditNote /> 
          </Link>
          <MdDeleteForever onClick = {() => handleDeleteNote(id)} 
            className="delete-icon" size="1.3em" />
        </div>
      </div>
    </div>
  );
});

export default Note;