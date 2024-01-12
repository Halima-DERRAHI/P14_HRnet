import { createSlice } from '@reduxjs/toolkit';
import Data from '../../Components/Data/employeeData.json'

const useData = false;

const initialState = {
  employeeData: useData ? Data : [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addEmployeeData: (state, action) => {
      const newData = action.payload;
      state.employeeData = [...state.employeeData, newData];
    },
  },
});

export const { addEmployeeData } = formSlice.actions;
export default formSlice.reducer;