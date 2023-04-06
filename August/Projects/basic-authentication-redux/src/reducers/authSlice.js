import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  profile:{},
  authentication:false,
  error:'',
  admin:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
      state.profile = action.payload;
      state.admin = action.payload.admin?true:false;
      state.authentication = true;
      sessionStorage.setItem('authentication',true);
    },
    logout: (state) => {
        state.authentication = false;
        state.userName = '';
        state.email = '';
        state.password = '';
        sessionStorage.removeItem('authentication');
    },
  },
})

// Action creators are generated for each case reducer function
export const {login, logout } = authSlice.actions

export default authSlice.reducer