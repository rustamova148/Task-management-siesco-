import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import type { User } from "../../../pages/AdminPanel/AdminPanel"

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.currentUser = action.payload;
        },
        clearUser(state) {
            state.currentUser = null;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;