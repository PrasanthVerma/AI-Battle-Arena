
import { createSlice } from "@reduxjs/toolkit";

const arenaSlice = createSlice({
    name: "arena",

    initialState: {
        data: null,

        loading: false,

        error: null,

        status: "",

        model1: "",

        model2: "",

        judge: null,

        streaming: false,
    },

    reducers: {

        setData(state, action) {
            state.data = action.payload;
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setError(state, action) {
            state.error = action.payload;
        },

        setStatus(state, action) {
            state.status = action.payload;
        },

        appendModel1(state, action) {
            state.model1 += action.payload;
        },

        appendModel2(state, action) {
            state.model2 += action.payload;
        },

        setJudge(state, action) {
            state.judge = action.payload;
        },

        setStreaming(state, action) {
            state.streaming = action.payload;
        },

        resetStream(state) {
            state.status = "";
            state.model1 = "";
            state.model2 = "";
            state.judge = null;
            state.streaming = false;
        },
    },
});

export const {setData,setLoading,setError,setStatus,appendModel1,appendModel2,setJudge,setStreaming,resetStream,} = arenaSlice.actions;

export default arenaSlice.reducer;