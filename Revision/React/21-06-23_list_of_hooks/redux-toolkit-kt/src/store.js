import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import loginReducer from './loginSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    login:loginReducer
  },
})