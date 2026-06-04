import { SongType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  currentTrack: null | SongType;
  isPlay: boolean;
};
const initialState: InitialStateType = {
  currentTrack: null,
  isPlay: false,
};
const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<SongType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const { setIsPlay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
