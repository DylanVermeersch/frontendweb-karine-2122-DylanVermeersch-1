import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext
} from "react";
import axios from "axios";
import config from "../config.json";

export const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
    const [initialLoad, setInitialLoad] = useState(false);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [currentNote, setCurrentNote] = useState({});

    const refreshNotes = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            const { data } = await axios.get(`${config.base_url}notes?limit=25&offset=0`);
            setNotes(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            refreshNotes();
            setInitialLoad(true);
        }
    }, [refreshNotes, initialLoad]);

    const createOrUpdateNote = useCallback(
        async ({ id, title, text, date, userId}) => {
            setError();
            setLoading(true);
            let data = {
                title, 
                text, 
                date, 
                userId
            };
            let method = id ? "put" : "post";
            let url = `${config.base_url}notes/${id ?? ""}`;
            try {
                const { changedNote } = await axios({
                    method, 
                    url, 
                    data
                });
                await refreshNotes();
                return changedNote;
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                setLoading(false);
            }
        }, [refreshNotes]);

    const deleteNote = useCallback(
        async (id) => {
            try {
                setError();
                setLoading(true);
                const { data } = await axios({
                    method: "delete",
                    url: `${config.base_url}notes/${id}`
                });
                refreshNotes();
                return data;
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        }, [refreshNotes]);
    
    const setNoteToUpdate = useCallback((id) => {
        setCurrentNote(
            id === null ? {} : notes.find((note) => note.id === id)
        );
    }, [notes]);

    const value = useMemo(() => ({
        notes,
        error,
        loading, 
        currentNote,
        createOrUpdateNote,
        deleteNote,
        setNoteToUpdate
        }), [notes, error, loading, currentNote, createOrUpdateNote, deleteNote, setNoteToUpdate]);

    return (
        <NotesContext.Provider value={value}>
            { children }
        </NotesContext.Provider>
    );
};