import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: { user_id: "", id: "", name: "" },
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setDataUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
    },
});

export const { setDataUser } = mainSlice.actions;

export default mainSlice.reducer;
