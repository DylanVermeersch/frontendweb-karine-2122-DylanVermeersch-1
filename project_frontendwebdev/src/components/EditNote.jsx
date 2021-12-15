import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditNote = ({ note, handleEditNote }) => {
  const [noteDate, setNoteDate] = useState(note.date);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.text);
  const characterLimit = 200;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0){
      setNoteText(event.target.value);
    }
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  }

  const handleSaveClick = () => {
    if (noteText.trim().length > 0 && noteTitle.trim().length > 0) {
      handleEditNote(note.id, noteTitle, noteText, noteDate);
      setNoteText("");
      setNoteTitle("");
      setNoteDate(new Date());
    }
  };

  const handleCancelClick = () => {
      setNoteText(note.text);
      setNoteTitle(note.title);
      setNoteDate(note.date);

      handleSaveClick();
  }

  return (
    <div className="note edit">
      <div className="edit-title">
        <textarea 
        rows="1" 
        value={noteTitle} 
        onChange={handleTitleChange}>{ noteTitle }</textarea>
      </div>
      <textarea 
      rows="8" 
      cols="10" 
      value={noteText}
      onChange={handleChange}>{ noteText }</textarea>
      <div className="note-footer">
        <Datepicker className="date-picker"
          selected={ noteDate } 
          onChange={ date => setNoteDate(date) }
          dateFormat="dd/MM/yyyy" 
          showPopperArrow={false} />
          <div> 
            <button className="save" onClick={handleSaveClick}>Save</button>
            <button className="cancel" onClick={handleCancelClick}>Cancel</button>
          </div>
      </div>
    </div>
  );
};

export default EditNote;