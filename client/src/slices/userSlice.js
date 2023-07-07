import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : {
    name : "",
    email : "",
    role : ""
  },
  isLoggedIn : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setValue: (state,action)=>{
    state.user.name = action.payload.name;
    state.user.email = action.payload.email;
    state.user.role = action.payload.role;
    state.isLoggedIn = true;
   },
   handleLogOut2 :(state)=>{
    state.user = {};
    state.isLoggedIn = false;
   }
  },
})


export const { setValue , handleLogOut2} = userSlice.actions

export default userSlice.reducer