import { createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo: {
            username: 'deb',
            email: 'chandu@gmail.com',
            profilePic: '',
            password: '',
            confirmPassword: ''
        },
        registerStart: false,
        error: false,
       
    },

    reducers:{
        registerStart: (state) => {
            state.registerStart = true;
            state.error = false;
        },
        registerSuccess: (state, action)=>{
            state.registerStart = false;
            state.userInfo = action.payload;
        },
        registerError: (state)=>{
            state.registerStart = false;
            state.error = true;
        }
        
        // register:(state, action)=>{
        //     state.username = action.payload.username;
        //     state.email = action.payload.email;
        //     state.profilePic = action.payload.profilePic;
        //     state.password = action.payload.password;
        //     state.confirmPassword = action.payload.confirmPassword;
        // },
        // logout: (state)=> (state = {}),
    },

});

export const {registerStart, registerSuccess, registerError} = userSlice.actions;
export default userSlice.reducer;