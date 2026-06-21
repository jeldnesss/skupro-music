import { SongType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  currentTrack: null | SongType;
  isPlay: boolean;
  playlist: SongType[];
  isShuffle: boolean;
  allTracks: SongType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  likedTracks: number[];
};
const initialState: InitialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  isShuffle: false,
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  likedTracks: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<SongType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<SongType[]>) => {
      state.playlist = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    resetTracks: (state) => {
      state.likedTracks = [];
      state.currentTrack = null;
      state.playlist = [];
      state.isPlay = false;
      state.isShuffle = false;
    },
    setNextTrack: (state) => {
      if (!state.currentTrack || state.playlist.length === 0) return;
      if (state.isShuffle) {
        let randomIndex = Math.floor(Math.random() * state.playlist.length);
        state.currentTrack = state.playlist[randomIndex];
        return;
      }
      const currIndex = state.playlist.findIndex(
        (el) => el._id === state.currentTrack!._id,
      );
      const nextIndex = currIndex + 1;
      if (nextIndex < state.playlist.length) {
        state.currentTrack = state.playlist[nextIndex];
      } else {
        state.currentTrack = state.playlist[0];
      }
    },
    setPrevTrack: (state) => {
      if (!state.currentTrack || state.playlist.length === 0) return;
      if (state.isShuffle) {
        let randomIndex = Math.floor(Math.random() * state.playlist.length);
        state.currentTrack = state.playlist[randomIndex];
        return;
      }
      const currIndex = state.playlist.findIndex(
        (el) => el._id === state.currentTrack!._id,
      );

      const prevIndex = currIndex - 1;

      if (prevIndex >= 0) {
        state.currentTrack = state.playlist[prevIndex];
      }
    },
    setAllTracks: (state, action: PayloadAction<SongType[]>) => {
      state.allTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.likedTracks.includes(id)) {
        state.likedTracks = state.likedTracks.filter((t) => t !== id);
      } else {
        state.likedTracks.push(id);
      }
    },
    setLikedTracks: (state, action: PayloadAction<number[]>) => {
      state.likedTracks = action.payload;
    },
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const { setIsPlay } = trackSlice.actions;
export const { setCurrentPlaylist } = trackSlice.actions;
export const { setNextTrack } = trackSlice.actions;
export const { setPrevTrack } = trackSlice.actions;
export const { toggleShuffle } = trackSlice.actions;
export const { setAllTracks } = trackSlice.actions;
export const { setFetchError } = trackSlice.actions;
export const { setFetchIsLoading } = trackSlice.actions;
export const { toggleLike, setLikedTracks } = trackSlice.actions;
export const { resetTracks } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
