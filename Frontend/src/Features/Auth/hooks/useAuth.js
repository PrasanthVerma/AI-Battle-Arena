import { login, register, getme, logout, googleAuth, getCurrentUser } from "../services/auth.api"
import { setUser, setLoading, setError } from "../auth.slice"
import { useDispatch } from "react-redux"
import { withToast, handleApiError } from "../../../utils/apiErrorHandler"
import toast from "react-hot-toast"

export function useAuth() {
    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        dispatch(setLoading(true))
        try {
            const user = await withToast(
                () => register({ email, username, password }),
                { loading: "Creating your account...", success: "Account created! Welcome to the Arena 🎉" }
            )
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
            const user = await withToast(
                () => login({ email, password }),
                { loading: "Signing in...", success: "Welcome back! ⚡" }
            )
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
            await withToast(
                () => logout(),
                { loading: "Signing out...", success: "Logged out successfully" }
            )
            dispatch(setUser(null))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGoogleLogin() {
        dispatch(setLoading(true))
        try {
            toast.loading("Redirecting to Google...", { id: "google-auth" })
            await googleAuth()
        } catch (error) {
            toast.dismiss("google-auth")
            handleApiError(error)
            dispatch(setError(error.message))
            dispatch(setLoading(false))
        }
    }

    async function handleCheckSession() {
        dispatch(setLoading(true))
        try {
            const data = await getCurrentUser()
            dispatch(setUser(data.user))
        } catch {
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