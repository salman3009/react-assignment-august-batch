import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  email: 'suresh@gmail.com',
  password:'',
  userName:'',
  status:'not started',
  todos:{}
}

export const fetchDetails = createAsyncThunk('login/fetchDetails',async()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return response.data
});


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    register: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload)
      state = {...state,email:action.payload.email};
      return state;
    },
    login: (state) => {
      state.value -= 1
    },
    logout: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers:(builder)=>{
     builder.addCase(fetchDetails.pending,(state)=>{
        state.status = 'pending';
     }).addCase(fetchDetails.fulfilled,(state,action)=>{
        state.status = 'success';
        state.todos = action.payload;
     }).addCase(fetchDetails.rejected,(state)=>{
        state.status = 'rejected';
     })
  }
})

// Action creators are generated for each case reducer function
export const { register, login, logout } = loginSlice.actions

export default loginSlice.reducer