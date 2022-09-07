import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// 로또 구매
export const __lotto = createAsyncThunk(
    "/api/game/lotto",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.post("http://3.34.5.30:8080/api/game/lotto", payload, {
              headers: {
                Authorization: localStorage.getItem("token1"),
                RefreshToken: localStorage.getItem("token2")
            }});
            if(data.data.success===true){
              if(data.data.data === "로또를 구매하기 위한 포인트가 부족합니다")
                alert("로또를 구매하기 위한 포인트가 부족합니다");
              else if(data.data.data === "57분~03분 사이는 정산시간으로 로또구매가 불가능합니다.")
                alert("57분~03분 사이는 정산시간으로 로또구매가 불가능합니다.")
              else
                alert("구매에 성공하였습니다. 1000포인트 지출");
            }
            else
              alert("구매에 실패하였습니다.");
            // return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  // 자신의 로또 결과 받아오기
  export const __myresult = createAsyncThunk(
    "/api/game/lottomyresult",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get("http://3.34.5.30:8080/api/game/lottomyresult", {
              headers: {
                Authorization: localStorage.getItem("token1"),
                RefreshToken: localStorage.getItem("token2")
            }});
            
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );

  export const __lottoresult = createAsyncThunk(
    "/api/game/lottoresult",
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.get("http://3.34.5.30:8080/api/game/lottoresult", {
              headers: {
                Authorization: localStorage.getItem("token1"),
                RefreshToken: localStorage.getItem("token2")
            }});
            alert(`회차:${data.data.data[0].no}
            당첨번호 : ${data.data.data[0].luckyNum[0]}, ${data.data.data[0].luckyNum[1]}, ${data.data.data[0].luckyNum[2]}, ${data.data.data[0].luckyNum[3]}, ${data.data.data[0].luckyNum[4]}, ${data.data.data[0].luckyNum[5]}
            보너스 번호 : ${data.data.data[0].bonusNum}`);
            // alert(data.data.data[0])
            // return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            // return thunkAPI.rejectWithValue(error);
          }
    }
  );


 
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const lotto = createSlice({
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
        [__myresult.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__myresult.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__myresult.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        }
      },
})


export default lotto;