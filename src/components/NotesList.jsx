import Note from "./Note";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../contexts/NotesProvider";
import ErrorMessage from './ErrorMessage';

const NotesList = ({ search }) => {
  const { notes, error, loading } = useContext(NotesContext);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return note.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [notes, search]);

  if (loading) return <h1 data-cy="loading">Loading...</h1>;

  if (error) {
    return (
     <ErrorMessage error={error} />
    );
  }

  if (!notes || !notes.length) {
    return (
      <p>
        <span>There are no notes</span>
        <Link to="add" className="button">
          Create one
        </Link>
      </p>
    );
  }

  return (
    <div className="notes-list">
      { filteredNotes.map((note) => {
        return <Note key={note.id} {...note} />;
      }) }
    </div>
  );
};

export default NotesList;