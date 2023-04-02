import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
  email: '',
  password: '',
  authentication:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state,action) => {  
      debugger;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    login: (state) => {
        state.authentication = true;
    },
    logout: (state) => {
        state.authentication = false;
        state.userName = '';
        state.email = '';
        state.password = '';
    },
  },
})

// Action creators are generated for each case reducer function
export const { register, login, logout } = authSlice.actions

export default authSlice.reducer