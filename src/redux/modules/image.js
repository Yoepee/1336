import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// 이미지를 등록하는 api
export const __image = createAsyncThunk(
  "/api/user/image/",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.patch("http://3.34.5.30:8080/api/user/image", payload, {
        headers: {
          Authorization: localStorage.getItem("token1"),
          RefreshToken: localStorage.getItem("token2"),
          "Content-Type": "multipart/form-data"
        }
      });
      if (data.data.success === true)
        alert("이미지 업로드 성공");
      else
        alert(data.data.error.message);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 계정이 가지고 있는 이미지정보를 가져오는 api
export const __getimage = createAsyncThunk(
  "/api/user/image/",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://3.34.5.30:8080/api/user/image",  {
        headers: {
          Authorization: localStorage.getItem("token1"),
          RefreshToken: localStorage.getItem("token2"),
          "Content-Type": "multipart/form-data"
        }
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const image = createSlice({
  name: "login",
  initialState: {
    data: [],
    success: false,
    error: null,
    isLoading: false
  },
  reducers: {
  },
  // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
  extraReducers: {
    [__image.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__image.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__image.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [__getimage.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getimage.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getimage.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
})

export default image;