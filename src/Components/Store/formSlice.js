import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeData: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addEmployeeData: (state, action) => {
      state.employeeData.push(action.payload);
    },
  },
});

export const { addEmployeeData } = formSlice.actions;
export default formSlice.reducer;