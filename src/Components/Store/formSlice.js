import { createSlice } from '@reduxjs/toolkit';
//import Data from '../../Components/Data/emplyeeData.json'


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