import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  completedGoals: string[] | null | undefined;
  createdAt: Date | string;
  email: string;
  id: string;
  name: string;
  image: string;
  updatedAt: Date | string;
};

const initialState = {
  completedGoals: [],
  createdAt: '',
  email: '',
  id: '',
  name: '',
  image: '',
  updatedAt: '',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,

    setUserAuth: (state, action: any) => {
      const { completedGoals, createdAt, email, id, name, image, updatedAt } =
        action.payload;

      state.completedGoals = completedGoals;
      state.createdAt = createdAt;
      state.email = email;
      state.id = id;
      state.name = name;
      state.image = image;
      state.updatedAt = updatedAt;
    },
  },
});

export const { setUserAuth, reset } = userSlice.actions;
export default userSlice.reducer;
