import graphArena from "../services/arena.api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setData, setLoading, setError } from '../arena.slice.js';


const useArena = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleArena = async (prompt) => {
        dispatch(setLoading(true));
        try {
            const data = await graphArena(prompt);
            dispatch(setData(data));
            dispatch(setLoading(false));
            dispatch(setError(null));
            return data;
        } catch (error) {
            dispatch(setError(error.message || 'An error occurred'));
            dispatch(setLoading(false));
        }
    }
    return handleArena;
}

export default useArena;
