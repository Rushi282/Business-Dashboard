import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mtd: null,
  ytd: null,
  stp: null,
  marketShare: null,
  globalDate: new Date().toISOString().slice(0, 10),
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMTD: (state, action) => { state.mtd = action.payload; },
    setYTD: (state, action) => { state.ytd = action.payload; },
    setSTP: (state, action) => { state.stp = action.payload; },
    setMarketShare: (state, action) => { state.marketShare = action.payload; },
    setGlobalDate: (state, action) => { state.globalDate = action.payload; },
  },
});

export const { setMTD, setYTD, setSTP, setMarketShare, setGlobalDate } = dataSlice.actions;
export default dataSlice.reducer;

export const selectMTD = (state) => state.data.mtd;
export const selectYTD = (state) => state.data.ytd;
export const selectSTP = (state) => state.data.stp;
export const selectMarketShare = (state) => state.data.marketShare;
export const selectGlobalDate = (state) => state.data.globalDate;