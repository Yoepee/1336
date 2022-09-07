import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// async를 통한 비동기로 데이터를 받아오는 과정 (미들웨어 공부하시면 좋을듯)
// 홀짝 선택, 배팅금액을 보내서 게임결과를 받아옴
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
            if(data.data.data === "홀(1) 짝(2)을 걸어주세요")
              alert("홀, 짝을 걸어주세요")
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
  // 주사위 선택, 배팅금액을 보내서 게임결과를 받아옴
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
  // 카운터 버튼을 통한 점수를 보내 결과를 받아옴
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
      //  결과를 보내는 형식이 post이고 데이터 저장이 필요없다고 판단으로 액스트라 리듀서 제거
      },
})


export default game;