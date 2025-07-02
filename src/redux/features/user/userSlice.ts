import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    orgname: string,
    orgnumber: number,
    orgaddress: string,
    orgId: number,
    role: string
}

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