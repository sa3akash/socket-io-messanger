import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  user:JSON.parse(localStorage.getItem("user")) || null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFetching: (state,action) => {
      state.isFetching = action.payload
      state.isAuth= false
    },
    setAuth: (state,action) => {
      state.user = action.payload
      state.isFetching = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFetching, setAuth } = AuthSlice.actions

export default AuthSlice.reducer