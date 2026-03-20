import { register, login, getMe, logout } from '../api/auth.api.js';
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from '../auth.slice.js'

export function useAuth() {
    const dispatch = useDispatch();

    const handleAuthError = (err) => {
        const message = err.response?.data?.message || "Something went wrong";
        dispatch(setError(message));
    };

    async function handleRegister(payload) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await register(payload);
            // Return success so the component knows it can redirect or show a success message
            return { success: true, data: res.data };
        } catch (err) {
            handleAuthError(err);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin(payload) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await login(payload);
            dispatch(setUser(res.data.user));
            return { success: true };
        } catch (err) {
            handleAuthError(err);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await getMe();
            dispatch(setUser(res.data.user));
            return { success: true };
        } catch (error) {
            // handleAuthError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await logout();
            return { success: true };
        } catch (error) {
            // handleAuthError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }
}