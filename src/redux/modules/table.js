import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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

export const table = createSlice({
    name: "table",
    initialState: {
        data: [],
        success: false,
        error: null,
        isLoading: false
    },
    reducers: {

    },
    extraReducers: {
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