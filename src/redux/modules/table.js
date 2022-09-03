import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// async를 통한 비동기로 데이터를 받아오는 과정 (미들웨어 공부하시면 좋을듯)
export const __getTable = createAsyncThunk(
    "ranking/",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get("http://localhost:3001/ranking", {
                headers: {
                    Authorization: ``
                }
            }
            );
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const __getTable2 = createAsyncThunk(
    "ranking/getMember",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get("http://localhost:3001/ranking/win", {
                headers: {
                    Authorization: ``
                }
            }
            );
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const table = createSlice({
    // 서버에서 넘겨주는 형태 data : 정보값, success : 기능 성공여부, error : 출력되는 에러메세지, isLoading 로딩중 과정 프론트에서 제어용도
    name: "table",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
    },
    // url경로가 안맞아서 state변경을 redux에서 해줄 필요 없을듯.
    reducers: {
    },
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: {
        // 점수별, 게임별을 통해 나눠서 작성될듯 (추가예정)
        [__getTable.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getTable.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getTable.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        [__getTable2.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getTable2.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getTable2.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
    },
})

// export let { } = table.actions;

export default table;