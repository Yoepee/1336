import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// async를 통한 비동기로 데이터를 받아오는 과정 (미들웨어 공부하시면 좋을듯)
export const __image = createAsyncThunk(
    "api/user/image",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(`http://3.34.5.30:8080/api/user.image`,payload, {
              headers: {
                  Authorization: localStorage.getItem('token1'),
                  RefreshToken: localStorage.getItem('token2'),
            }});
            return response.data;
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
      },
})



export default member;