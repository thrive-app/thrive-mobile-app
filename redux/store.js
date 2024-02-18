import { createSlice } from "@reduxjs/toolkit"

export const initialStateValue = false;

export const store = createSlice({
    name: "loggedIn",
    initialState: {value: initialStateValue},
    reducers: {
        getData: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { getData } = store.actions

export default store.reducer