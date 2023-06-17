import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  completedGoals: string[] | null | undefined;
  createdAt: Date | string;
  email: string;
  id: string;
  name: string;
  image: string;
  updatedAt: Date | string;
  goals: any;
  selectedGoal:any;
};

const initialState = {
  completedGoals: [],
  createdAt: '',
  email: '',
  id: '',
  name: '',
  image: '',
  updatedAt: '',
  goals: [],
  selectedGoal: null,
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
    setUserGoals: (state, action: any) => {
      state.goals = action.payload;
    },
    removeGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(
        (goal: any) => goal.id !== action.payload
      );
    },
    addGoal: (state, action: PayloadAction<any>) => {
      state.goals = [action.payload, ...state.goals];
    },
    setSelectedGoal: (state, action: PayloadAction<any>) => {
      state.selectedGoal = action.payload;
    }
  },
});

export const { setUserAuth, reset, setUserGoals, addGoal, removeGoal,setSelectedGoal } =
  userSlice.actions;
export default userSlice.reducer;
