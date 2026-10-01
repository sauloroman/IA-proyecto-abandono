import { configureStore } from "@reduxjs/toolkit"
import { studentsSlice } from "./students/student.slice"
import { simulatorSlice } from "./simulator/simulator.slice"
import { batchSlice } from "./batch/batch.slice"

export const store = configureStore({
    reducer: {
        students: studentsSlice.reducer,
        simulator: simulatorSlice.reducer,
        batch: batchSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch