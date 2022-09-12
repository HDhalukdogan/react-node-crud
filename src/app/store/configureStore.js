import { configureStore } from "@reduxjs/toolkit";
import { sampleReducer } from "../../features/sample/sampleSlice";


export const store = configureStore({
    reducer: {
        samples: sampleReducer
    }
})