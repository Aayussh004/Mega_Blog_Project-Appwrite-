import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    status:false,
    userData: null
}

// ye wala slice user ka login status jaanne ke liye bnaye hai
const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{//isme methods bnate hai
    login : (state,action)=>{
         state.status = true;//agr koi login hua hai to uska status true krdo aur user ka data bhi dedo 
         state.userData = action.payload.userData;
    },
     
    logout : (state,action)=>{
        state.status = false;
        state.userData = null;
    }
  }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;

