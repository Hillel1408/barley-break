import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: { user_id: "", id: "", name: "" },
    alert: {
        name: "",
        color: "",
    },
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setDataUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
        setAlert(state, action) {
            state.alert = action.payload;
        },
        resetAlert(state) {
            state.alert.name = "";
        },
    },
});

export const { setDataUser, resetAlert, setAlert } = mainSlice.actions;

export default mainSlice.reducer;
