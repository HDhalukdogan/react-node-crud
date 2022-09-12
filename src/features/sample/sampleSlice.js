import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";


export const fetchSamplesAsync = createAsyncThunk(
    'samples/fetchSamplesAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.SampleCrud.list();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const fetchSampleAsync = createAsyncThunk(
    'samples/fetchSampleAsync',
    async (id, thunkAPI) => {
        return await agent.SampleCrud.details(id);
    }
)
export const createSampleAsync = createAsyncThunk(
    'samples/createSampleAsync',
    async (sample, thunkAPI) => {
        return await agent.SampleCrud.create(sample);
    }
)
export const editSampleAsync = createAsyncThunk(
    'samples/editSampleAsync',
    async (sample, thunkAPI) => {
        return await agent.SampleCrud.update(sample);
    }
)
export const deleteSampleAsync = createAsyncThunk(
    'samples/deleteSampleAsync',
    async (id, thunkAPI) => {
        await agent.SampleCrud.delete(id);
        return id;
    }
)
const initialState = {
    entities: [],
    loading: false
}
export const sampleSlice = createSlice({
    name: 'samples',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSamplesAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSamplesAsync.fulfilled, (state, action) => {
            state.entities = action.payload;
            state.loading = false
        })
        builder.addCase(fetchSamplesAsync.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(fetchSampleAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSampleAsync.fulfilled, (state, action) => {
            if (!state.entities.some(e => e._id === action.payload._id)) {
                state.entities.push(action.payload);
            }
            state.loading = false
        })
        builder.addCase(fetchSampleAsync.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(createSampleAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createSampleAsync.fulfilled, (state, action) => {
            if (!state.entities.some(e => e._id === action.payload._id)) {
                state.entities.push(action.payload);
            }
            state.loading = false
        })
        builder.addCase(createSampleAsync.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(editSampleAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editSampleAsync.fulfilled, (state, action) => {
            if (state.entities.some(e => e._id === action.payload._id)) {
                state.entities.find(e => e._id === action.payload._id).sampleName = action.payload.sampleName;
            }
            state.loading = false
        })
        builder.addCase(editSampleAsync.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(deleteSampleAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteSampleAsync.fulfilled, (state, action) => {
            if (state.entities.some(e => e._id === action.payload)) {
                state.entities = state.entities.filter(s => s._id !== action.payload)
            }
            state.loading = false
        })
        builder.addCase(deleteSampleAsync.rejected, (state) => {
            state.loading = false
        })
    }
})

export const sampleReducer = sampleSlice.reducer;
