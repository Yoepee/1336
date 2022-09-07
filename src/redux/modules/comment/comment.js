import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// 댓글 받아오는 내용
// async를 통한 비동기로 데이터를 받아오는 과정 (미들웨어 공부하시면 좋을듯)
export const __getComment = createAsyncThunk(
    "/api/comment",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get(`http://3.34.5.30:8080/api/comment?gameId=${payload}`, {
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

// 리덕스를 통한 댓글의 자연스러운 state변화 출력하도록 생성
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const comment = createSlice({
    name:"comment",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
        // 댓글 작성
        createComment(state, action){
          state.data.data.push(action.payload);
        },
        // 댓글 삭제
        removeComment(state, action){
          let  index = state.data.data.findIndex(post =>  post.id === action.payload);
			    state.data.data.splice(index,1);
        },
        // 댓글 수정
        updateComment(state, action){
          let  index = state.data.data.findIndex(post =>  post.id === action.payload.id);
			    state.data.data.splice(index, 1, action.payload);
        },
    },
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: {
        [__getComment.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getComment.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getComment.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
      },
})

export let {createComment, removeComment, updateComment } = comment.actions;

export default comment;