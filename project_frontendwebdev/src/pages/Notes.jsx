import { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import NotesList from "../components/NotesList";

export default function Notes() {
    const [text, setText]  = useState("");
    const [search, setSearch] = useState("");

    const handleInputChange = useCallback((event) => setText(event.target.value), []);
    const handleSearch = useCallback(() => setSearch(text), [text]);

    return (
        <>
            <h1>Notes</h1>
            <div className="notes-input">
                <input 
                    data-cy="notes_search_input"
                    type="search"
                    value={text}
                    onChange={handleInputChange}
                    className="notes-search-input"
                    placeholder="Search for a note" 
                />
                <button
                    type="button"
                    data-cy="notes_search_btn"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            
            <div className="add-note">
                <Link 
                    className="btn-add-note"
                    to="/notes/add" 
                >
                    <MdAdd /> New note
                </Link>    
            </div>
            <NotesList search={search} /> 
        </>
    );
}