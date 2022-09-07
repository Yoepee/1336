import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// 마이페이지 본인 정보 받아오기
export const __getMember = createAsyncThunk(
    "api/user",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(`http://3.34.5.30:8080/api/user`, {
              headers: {
                  Authorization: localStorage.getItem('token1'),
                  RefreshToken: localStorage.getItem('token2'),
            }});
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  // 본인정보 수정하기 (닉네임 변경)
  export const __changeMember = createAsyncThunk(
    "api/user",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.patch(`http://3.34.5.30:8080/api/user`, payload,{
              headers: {
                  Authorization: localStorage.getItem('token1'),
                  RefreshToken: localStorage.getItem('token2'),
            }});
            console.log(data)
            localStorage.setItem("token1", data.headers.authorization)
            localStorage.setItem("token2", data.headers.refreshtoken)
            localStorage.setItem("name",data.data.data.nickName)
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  // 회원탈퇴 기능
  export const __removeMember = createAsyncThunk(
    "api/user",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.delete(`http://3.34.5.30:8080/api/user`,{
              headers: {
                  Authorization: localStorage.getItem('token1'),
                  RefreshToken: localStorage.getItem('token2'),
            }});
            console.log(data)
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  
// 회원가입
  export const __signUp = createAsyncThunk(
    "api/member/signup",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.post("http://3.34.5.30:8080/api/member/signup", payload);
            if(data.data.success===true)
                alert(data.data.data);
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

        [__changeMember.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__changeMember.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__changeMember.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
      },
})

export let {createMember, removeMember, updateMember, likeMember } = member.actions;

export default member;