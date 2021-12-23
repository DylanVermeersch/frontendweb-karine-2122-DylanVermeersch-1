import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext
} from "react";
import * as notesApi from '../api/notes';
import { useSession } from './AuthProvider';

export const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
    const { ready: authReady } = useSession();
    const [initialLoad, setInitialLoad] = useState(false);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [currentNote, setCurrentNote] = useState({});

    const refreshNotes = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            const { data } = await notesApi.getAllNotes();
            setNotes(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (authReady && !initialLoad) {
            refreshNotes();
            setInitialLoad(true);
        }
    }, [authReady, refreshNotes, initialLoad]);

    const createOrUpdateNote = useCallback(async ({
        id, 
        title, 
        text, 
        date, 
        userId
    }) => {
            setError();
            setLoading(true);

            try {
                const { changedNote } = await notesApi.saveNote({
                    id,
                    title,
                    text,
                    date,
                    userId,
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

    const deleteNote = useCallback(async (id) => {
            try {
                setError();
                setLoading(true);
                await notesApi.deleteNote(id);
                refreshNotes();
            } catch (error) {
                console.log(error);
                setError(error);
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