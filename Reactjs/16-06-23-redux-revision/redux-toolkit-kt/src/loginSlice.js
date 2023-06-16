import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: 'suresh@gmail.com',
  password:'',
  userName:''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    register: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    login: (state) => {
      state.value -= 1
    },
    logout: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { register, login, logout } = loginSlice.actions

export default loginSlice.reducer