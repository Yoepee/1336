import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// async를 통한 비동기로 데이터를 받아오는 과정 (미들웨어 공부하시면 좋을듯)
export const __getMember = createAsyncThunk(
    "api/user",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get("http://3.34.5.30:8080/api/user", {
              headers: {
                  Authorization: localStorage.getItem('login-token'),
                  RefreshToken: localStorage.getItem('login-token2'),
            }});
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  

  export const __signUp = createAsyncThunk(
    "api/member/signup",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data =  await axios.post("http://3.34.5.30:8080/api/member/signup", payload);
            // .then((response)=> {
            // console.log(response)  
            // const {accessToken} = response.data;
              // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            // });
            // console.log(data.headers.Authorization)
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  export const __login = createAsyncThunk(
    "api/member/login",
    async (payload, thunkAPI) => {
        try {
          // localStorage.setItem("",)
            console.log(payload);
            const data =  await axios.post("http://3.34.5.30:8080/api/member/login", payload);
            console.log(data);
            console.log(data.headers.authorization)
            console.log(data.headers.refreshtoken)
            localStorage.setItem("token1", data.headers.authorization)
            localStorage.setItem("token2", data.headers.refreshtoken)
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const member = createSlice({
    name:"member",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
        createMember(state, action){
          state.data.push(action.payload);
          axios.post("http://localhost:3001/member", action.payload, {
            headers: {
                Authorization: ``
            }} );
        },
        removeMember(state, action){
          let  index = state.data.findIndex(post =>  post.id === action.payload);
			    state.data.splice(index,1);
          axios.delete(`http://localhost:3001/member/${action.payload}`);
        },
        updateMember(state, action){
          let  index = state.data.findIndex(post =>  post.id === action.payload.id);
			    state.data.splice(index, 1, action.payload);
          axios.patch(`http://localhost:3001/member/${action.payload.id}`, action.payload);
        },
        likeMember(state, action){
          let index = state.data.findIndex(post => post.id === action.payload.id);
			    state.data[index].count +=1;
          axios.patch(`http://localhost:3001/member/${action.payload.id}`, action.payload);
        },
    },
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: {
        [__getMember.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getMember.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getMember.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
      },
})

export let {createMember, removeMember, updateMember, likeMember } = member.actions;

export default member;