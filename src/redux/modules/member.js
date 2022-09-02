import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const __getMember = createAsyncThunk(
    "member/getMember",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get("https://localhost:3001/member");
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

export const member = createSlice({
    name:"posts",
    initialState: {
        posts: [],
        isLoading: false,
        error: null,
      },
    reducers:{
        createMember(state, action){
          state.posts.push(action.payload);
          axios.post("https://localhost:3001/member", action.payload );
        },
        removeMember(state, action){
          let  index = state.posts.findIndex(post =>  post.id === action.payload);
			    state.posts.splice(index,1);
          axios.delete(`https://localhost:3001/member/${action.payload}`);
        },
        updateMember(state, action){
          let  index = state.posts.findIndex(post =>  post.id === action.payload.id);
			    state.posts.splice(index, 1, action.payload);
          axios.patch(`https://localhost:3001/member/${action.payload.id}`, action.payload);
        },
        likeMember(state, action){
          let index = state.posts.findIndex(post => post.id === action.payload.id);
			    state.posts[index].count +=1;
          axios.patch(`https://localhost:3001/member/${action.payload.id}`, action.payload);
        },
    },
    extraReducers: {
        [__getMember.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getMember.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.posts = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getMember.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
      },
})

export let {createMember, removeMember, updateMember, likeMember } = member.actions;

export default member;