import { createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo:{},
        registerStart: false,
        error:{
            error: 'something went worng',
        }
       
    },

    reducers:{
        registerStart: (state) => {
            state.registerStart = true;
        },
        registerSuccess: (state, action)=>{
            state.registerStart = false;
            state.userInfo = action.payload;
        },
        registerError: (state, action)=>{
            state.registerStart = false;
            state.error = action.payload;
        },
        logout: (state, action) => {
            return  {}
        },
        
        // register:(state, action)=>{
        //     state.username = action.payload.username;
        //     state.email = action.payload.email;
        //     state.profilePic = action.payload.profilePic;
        //     state.password = action.payload.password;
        //     state.confirmPassword = action.payload.confirmPassword;
        // },
    },

});

export const {registerStart,
     registerSuccess,
      registerError,
       logout} = userSlice.actions;
export default userSlice.reducer;