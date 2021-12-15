import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import uuid from "uuid";
import Search from "./components/Search";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {

  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('project-frontendwebdev-tempdata'));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [])

  useEffect (() => {
    localStorage.setItem('project-frontendwebdev-tempdata', JSON.stringify(notes));
  }, [notes])

  const addNote = (title, text, date) => {
    const newNote = {
      id: uuid.v4(),
      title: title,
      text: text,
      date: date.toLocaleDateString("en-US", {day: 'numeric'}) + "/" + date.toLocaleDateString("en-US", {month: 'numeric'}) + "/" + date.toLocaleDateString("en-US", {year: 'numeric'})
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const addEditedNote = (id, title, text, date) => {
    const editNote = {
      id: id,
      title: title,
      text: text,
      date: date.toLocaleDateString("en-US", {day: 'numeric'}) + "/" + date.toLocaleDateString("en-US", {month: 'numeric'}) + "/" + date.toLocaleDateString("en-US", {year: 'numeric'})
    };
    deleteNote(id);
    const changedNotes = [...notes, editNote];
    setNotes(changedNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (<div className={`${darkMode && 'dark-mode'}`}>
    
    <div className="container">
      <Switch>
        <Route path="/notes"> 
          <Header handleToggleDarkMode = {setDarkMode} />
          <Search handleSearchNote = {setSearchText} />
          <NotesList 
            notes = {notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))} 
            handleAddNote = {addNote} 
            handleDeleteNote = {deleteNote} 
            handleEditNote = {addEditedNote}
          />
        </Route>
        <Route exact path="/"> 
          <Home />
        </Route>        
      </Switch>
    </div>
  </div>
  );
};

export default App;
