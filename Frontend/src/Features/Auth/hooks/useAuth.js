import { login, register, getme, logout, googleAuth, getCurrentUser } from "../services/auth.api"
import { setUser, setLoading, setError } from "../auth.slice"
import { useDispatch } from "react-redux"

export function useAuth() {
    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        dispatch(setLoading(true))
        try {
            const user = await register({ email, username, password })
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        dispatch(setLoading(true))
        try {
            const user = await login({ email, password })
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        dispatch(setLoading(true))
        try {
            const user = await getme()
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        dispatch(setLoading(true))
        try {
            await logout()
            dispatch(setUser(null))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    // ========== GOOGLE OAUTH HANDLER ==========
    async function handleGoogleLogin() {
        dispatch(setLoading(true))
        try {
            // Redirect to Google OAuth endpoint
            await googleAuth()
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
        }
    }

    // ========== SESSION CHECK HANDLER ==========
    async function handleCheckSession() {
        dispatch(setLoading(true))
        try {
            const data = await getCurrentUser()
            dispatch(setUser(data.user))
        } catch (error) {
            // No active session, user not logged in
            dispatch(setUser(null))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
        handleGoogleLogin,
        handleCheckSession
    }
}