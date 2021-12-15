import axios from "axios";
import { 
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    useMemo
} from "react";
import config from "../config.json";

export const UsersContext = createContext();
export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({
    children
}) => {
    const [initialLoad, setInitialLoad] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const refreshUsers = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            const {
                data
            } = await axios.get(`${config.base_url}users`);
            setUsers(data.data);
            return data.data;
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            refreshUsers();
            setInitialLoad(true);
        }
    }, [initialLoad, refreshUsers]);

    const createOrUpdateUser = useCallback(async ({
        id, 
        name, 
        password, 
        emailAdres
    }) => {
        setError();
        setLoading(true);
        let data = {
            name, 
            password, 
            emailAdres
        };

        let method = id ? "put" : "post";
        let url = `${config.base_url}users/${id ?? ""}`;
        try {
            const {
                changedUser
            } = await axios({
                method,
                url, 
                data
            });
            await refreshUsers();
            return changedUser;
        } catch(error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [refreshUsers]);

    const deleteUser = useCallback(async (id) => {
        setLoading(true);
        setError();
        try {
            const {
                data
            } = await axios({
                method: "delete",
                url: `${config.base_url}users/${id}`
            });
            refreshUsers();
            return data;
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [refreshUsers]);

    const value = useMemo(() => ({
        currentUser,
        setCurrentUser,
        users,
        error,
        loading,
        deleteUser,
        createOrUpdateUser
    }), [users, error, loading, setCurrentUser, 
        currentUser, deleteUser, createOrUpdateUser]);
    
    return (
        <UsersContext.Provider value={value}>
            { children }
        </UsersContext.Provider>
    );
};
