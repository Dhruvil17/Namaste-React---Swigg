import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: {},
    },
    reducers: {
        addItem: (state, action) => {
            const { name } = action.payload.card.info;

            if (state.items[name]) {
                state.items[action.payload.card]++;
            } else {
                state.items[action.payload.card] = 1;
            }

            console.log(current(state));
        },

        removeItem: (state, action) => {
            const { name } = action.payload.card.info;

            if (state.items[name] > 0) {
                state.items[name]--;
            }

            if (state.items[name] === 0) {
                delete state.items[name];
            }

            console.log(current(state));
        },
        clearItem: (state) => {
            state.items.length = 0;
        },
    },
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
