import { createSlice } from "@reduxjs/toolkit";


const arenaSlice = createSlice({
    name:"arena",
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{
        setData(state,action){
            state.data = action.payload
        },
        setLoading(state,action){
            state.loading = action.payload
        },       
        setError(state,action){
            state.error = action.payload
        }
    }
})

export const {setData,setLoading,setError} = arenaSlice.actions;
export default arenaSlice.reducer;