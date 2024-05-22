import { useEffect, useState } from "react";
import { useProvider } from "../../../context/AuthProvider";

export const useFetchUser = () => {

    const { getUser } = useProvider();
    const [currentuser, setCurrentUser] = useState(null);
    const [loadingcurrentuser, setLoadingCurrentUser] = useState(true);

    const fetchCurrentUser = () => {
        const data = getUser();
        setCurrentUser(data);
        setLoadingCurrentUser(false);
    }

    useEffect(() => {
        fetchCurrentUser()
    }, []);

    return {
        currentuser,
        loadingcurrentuser,
        setCurrentUser,
    }
}