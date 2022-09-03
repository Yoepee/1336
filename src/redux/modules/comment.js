import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const __getComment = createAsyncThunk(
    "member/getMember",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get("http://localhost:3001/comment", {
              headers: {
                  Authorization: ``
            }});
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

export const comment = createSlice({
    name:"comment",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{
        createComment(state, action){
          state.data.push(action.payload);
          axios.post("http://localhost:3001/comment", action.payload, {
            headers: {
                Authorization: ``
            }} );
        },
        removeComment(state, action){
          let  index = state.data.findIndex(post =>  post.id === action.payload);
			    state.data.splice(index,1);
          axios.delete(`http://localhost:3001/comment/${action.payload}`);
        },
        updateComment(state, action){
          let  index = state.data.findIndex(post =>  post.id === action.payload.id);
			    state.data.splice(index, 1, action.payload);
          axios.patch(`http://localhost:3001/comment/${action.payload.id}`, action.payload);
        },
        likeComment(state, action){
          let index = state.data.findIndex(post => post.id === action.payload.id);
			    state.data[index].count +=1;
          axios.patch(`http://localhost:3001/comment/${action.payload.id}`, action.payload);
        },
    },
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

export let {createComment, removeComment, updateComment, likeComment } = comment.actions;

export default comment;