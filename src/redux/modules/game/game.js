import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// async를 통한 비동기로 데이터를 받아오는 과정 (미들웨어 공부하시면 좋을듯)
export const __oddeven = createAsyncThunk(
    "/api/game/oddeven",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.post("http://3.34.5.30:8080/api/game/oddeven", payload, {
              headers: {
                Authorization: localStorage.getItem("token1"),
                RefreshToken: localStorage.getItem("token2")
            }});
            if(data.data.data === "소지포인트보다 많이 배팅하셨거나 배팅 포인트가 0입니다")
              alert("소지포인트보다 많이 배팅하셨거나 배팅 포인트가 0입니다")
            if(data.data.data.result==="성공"){
            alert(`결과 : 맞추셨습니다.
            획득포인트 : ${data.data.data.getPoint}
            현재포인트 : ${data.data.data.nowPoint}`)
            }
            else if(data.data.data.result==="실패"){
                alert(`결과 : 틀리셨습니다.`)
            }
            console.log(data);
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  export const __dice = createAsyncThunk(
    "/api/game/dice",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.post("http://3.34.5.30:8080/api/game/dice", payload, {
              headers: {
                Authorization: localStorage.getItem("token1"),
                RefreshToken: localStorage.getItem("token2")
            }});
            if(data.data.data === "소지포인트보다 많이 배팅하셨거나 배팅 포인트가 0입니다")
              alert("소지포인트보다 많이 배팅하셨거나 배팅 포인트가 0입니다")
            if(data.data.data.result===payload.number){
                alert(`결과 : ${data.data.data.result} 맞추셨습니다.
                획득포인트 : ${data.data.data.getPoint}
                현재포인트 : ${data.data.data.nowPoint}`)
                }
                else if(data.data.data.result!==payload.number){
                    alert(`결과 : ${data.data.data.result} 틀리셨습니다.`)
                }
            console.log(data);
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  export const __counter = createAsyncThunk(
    "/api/game/dice",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.post("http://3.34.5.30:8080/api/game/counter",{count: payload}, {
              headers: {
                Authorization: localStorage.getItem("token1"),
                RefreshToken: localStorage.getItem("token2")
            }});
            alert(`${data.data.data.getpoint}포인트 획득하셨습니다.`)
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            alert("금액에 맞는 배팅을 해주세요.")
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

 
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const game = createSlice({
    name:"ranking",
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
        [__oddeven.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__oddeven.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__oddeven.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        
        [__dice.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
          },
          [__dice.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
          },
          [__dice.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
          },

          [__counter.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
          },
          [__counter.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
          },
          [__counter.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
          },
      },
})


export default game;