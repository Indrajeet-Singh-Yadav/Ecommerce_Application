import { createSlice } from "@reduxjs/toolkit";

const favItems = createSlice(
    {
        name: 'favs',
        initialState: {
            favs: [],
        }
        ,
        reducers: {
            addItem: (state, action) => {
                state.favs.push(action.payload);
            },
            removeItem: (state, action) => {
                const id = action.payload;
                state.favs = state.favs.filter(item => item.id !== id);
            }
        }
    }
)

export const { addItem, removeItem } = favItems.actions;
export default favItems.reducer;