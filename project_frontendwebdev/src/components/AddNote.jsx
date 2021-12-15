import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNote = ({handleAddNote}) => {
  const [noteDate, setNoteDate] = useState(new Date());
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
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
      handleAddNote( noteTitle, noteText, noteDate);
      setNoteText("");
      setNoteTitle("");
      setNoteDate(new Date());
    }
  };

  return (
    <div className="note new">
      <div className="new-title">
        <textarea 
        rows="1" 
        placeholder="Type to add a title..." 
        value={noteTitle} 
        onChange={handleTitleChange}></textarea>
      </div>
      <textarea 
      rows="8" 
      cols="10" 
      placeholder="Type to add a note..."
      value={noteText}
      onChange={handleChange}></textarea>
      <div className="note-footer">
        <Datepicker className="date-picker"
          selected={ noteDate } 
          onChange={ date => setNoteDate(date) }
          dateFormat="dd/MM/yyyy" 
          showPopperArrow={false} />
        <button className="save" onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default AddNote;