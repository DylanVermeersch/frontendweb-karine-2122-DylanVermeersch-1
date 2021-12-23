import { useEffect, useCallback } from "react";
import { useForm, FormProvider } from  "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import { useNotes } from "../contexts/NotesProvider";
import LabelInput from "../components/LabelInput";
import { useSession } from "../contexts/AuthProvider";
import ErrorMessage from "../components/ErrorMessage";

const validationRules = {
    user: {
        required: "this is required",
        minLength: { value: 2, message: "Min length is 2" },
    },
    date: { required: "this is required" },
    title: { required: "this is required" },
    text: { required: "this is required" },
};

const toDateInputString = (date) => {
    if (!date) return null;
    if (typeof date !== Object) {
        date = new Date(date);
    }

    const asString = date.toISOString();
    return asString.substring(0, asString.indexOf("T"));
};

export default function NotesForm() {
    const { id } = useParams();
    const { user } = useSession();
    const history = useHistory();
    const methods = useForm();
    const {
        handleSubmit, 
        reset, 
        setValue
    } = methods;

    const {
        error,
        currentNote,
        setNoteToUpdate,
        createOrUpdateNote
    } = useNotes();

    useEffect(() => {
        if (
            currentNote && 
            (Object.keys(currentNote).length !== 0 ||
            currentNote.constructor !== Object)
        ) {
            const dateAsString = toDateInputString(new Date(currentNote.date));
            
            setValue("date", dateAsString);
            setValue("user", currentNote.user.name);
            setValue("title", currentNote.title);
            setValue("text", currentNote.text);
        } else {
            reset();
            setValue("user", user?.id);
        }
    }, [currentNote, user, setValue, reset]);

    useEffect(() => {
        setNoteToUpdate(id);
    }, [id, setNoteToUpdate]);

    const onSubmit = useCallback(
        async (data) => {
            try {
                await createOrUpdateNote({
                    id: currentNote?.id,
                    title: data.title,
                    text: data.text,
                    date: new Date(data.date),
                    user: user.id,
                });
                setNoteToUpdate(null);
                history.push("/notes");
            } catch(error) {
                console.error(error);
            }
        },
        [
            createOrUpdateNote,
            currentNote?.id,
            setNoteToUpdate,
            history,
            user,
        ]
    );

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="note-form">
                <ErrorMessage error={error} />
                <div className="form-grid">
                    <LabelInput 
                        label="date"
                        type="date"
                        defaultvalue={toDateInputString(new Date())}
                        validation={validationRules.date}
                        data-cy="date_input"
                    />
                    <LabelInput 
                        label="title"
                        type="text"
                        defaultvalue=""
                        validation={validationRules.title}
                        data-cy="title_input"
                    />
                    <LabelInput 
                        label="text"
                        type="text"
                        defaultvalue=""
                        validation={validationRules.text}
                        data-cy="text_input"
                    />
                    <div className="form-bottom">
                        <div className="form-buttons">
                            <button type="submit" data-cy="submit_note">
                                {currentNote?.id
                                ? "Save note"
                                : "Add note"}
                            </button>
                            <button className="button"> 
                                <Link className="button" to="/notes">
                                    Cancel
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}