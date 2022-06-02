import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = [];

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state = [...state, action.payload];
            AsyncStorage.setItem('employee', JSON.stringify(state))
            return state;
        },
        addAllEmployee: (state, action) => {
            state = action.payload
            return state;
        },
        updateEmployee: (state, action) => {
            let id = action.payload.id;
            let fav = action.payload.fav;
            let arrayState = state?.filter((item => item.id != id))
            let currentObject = state?.filter((item => item.id === id))?.[0]
            state = [...arrayState, { ...currentObject, fav: fav }];
            AsyncStorage.setItem('employee', JSON.stringify(state))
            return state
        }
    },
});
export const { addEmployee, addAllEmployee, updateEmployee } = userSlice.actions;
export default userSlice.reducer;
