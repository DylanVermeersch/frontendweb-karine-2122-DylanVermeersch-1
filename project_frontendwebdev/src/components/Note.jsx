import { MdDeleteForever, MdEditNote } from 'react-icons/md';
import EditNote from "./EditNote";
import { Switch, Route } from "react-router-dom";

const Note = ({id, title, text, date, handleDeleteNote, handleEditNote }) => {
  return (
    <div className="note">
      <div className="note-header">{title}</div>
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <div className="icons">
          <MdEditNote onClick = { 
            <Switch>
              <Route path="edit/:id"> 
                <EditNote 
                  note = {{id, title, text, date}}
                  handleEditNote = {handleEditNote} /> 
              </Route>
            </Switch>
            }
            className="edit-icon" size="1.3em" /> 
          <MdDeleteForever onClick = {() => handleDeleteNote(id)} 
            className="delete-icon" size="1.3em" />
        </div>
      </div>
    </div>
  );
};

export default Note;