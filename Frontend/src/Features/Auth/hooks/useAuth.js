import {login , register , getme , logout} from "../services/auth.api"
import {setUser , setLoading , setError} from "../auth.slice"
import {useDispatch} from "react-redux"

export function useAuth(){
    const dispatch = useDispatch()

    async function handleRegister({email,username,password}){
        dispatch(setLoading(true))
        try{
            const user = await register({email,username,password})
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email,password}){
        dispatch(setLoading(true))
        try{
            const user = await login({email,password})
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        dispatch(setLoading(true))
        try{
            const user = await getme()
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout(){
        dispatch(setLoading(true))
        try{
            await logout()
            dispatch(setUser(null))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {handleRegister, handleLogin, handleGetMe, handleLogout}
}