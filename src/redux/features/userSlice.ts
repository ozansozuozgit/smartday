import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  completedGoals: string[] | null | undefined | any;
  createdAt: Date | string;
  email: string;
  id: string;
  name: string;
  image: string;
  updatedAt: Date | string;
  goals: any;
  selectedGoal: any;
  startDate: Date | string;
  endDate: Date | string;
  activityFlag: boolean;
  allActivities: any;
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
  startDate: '',
  endDate: '',
  activityFlag: false,
  allActivities: [],
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
      state.goals = state.goals?.filter(
        (goal: any) => goal.id !== action.payload
      );
      // if it's in completedgoals, remove it
      state.completedGoals = state.completedGoals?.filter(
        (goal: any) => goal.id !== action.payload
      );
      //remove any activities related to the goal
      state.allActivities = state.allActivities?.filter(
        (activity: any) => activity.goalId !== action.payload
      );
    },
    addGoal: (state, action: PayloadAction<any>) => {
      state.goals = [action.payload, ...state.goals];
    },
    setSelectedGoal: (state, action: PayloadAction<any>) => {
      state.selectedGoal = action.payload;
    },
    updateSelectedGoalPercentage: (state, action: PayloadAction<any>) => {
      state.selectedGoal.percentage = action.payload;
    },
    updateSelectedGoalCompleted: (state, action: PayloadAction<any>) => {
      state.selectedGoal.completed = action.payload.completed;
      state.selectedGoal.percentage = action.payload.percentage;
      state.selectedGoal.completedAt = action.payload.completedAt;
      state.goals = state.goals.map((goal: any) => {
        if (goal.id === action.payload.id) {
          goal.completed = action.payload.completed;
          goal.percentage = action.payload.percentage;
          goal.completedAt = action.payload.completedAt;
        }
        return goal;
      });
    },
    addActivityToSelectedGoal: (state, action: PayloadAction<any>) => {
      // Add it to the selected goals activity
      state.selectedGoal.activities = [
        action.payload,
        ...state.selectedGoal.activities,
      ];
    },
    updateActivityToSelectedGoal: (state, action: PayloadAction<any>) => {
      // Add it to the selected goals activity
      state.selectedGoal.activities = state.selectedGoal.activities?.map(
        (activity: any) => {
          if (activity.id === action.payload.id) {
            activity.percentage = action.payload.percentage;
            activity.name = action.payload.name;
            activity.alignsWithGoal = action.payload.alignsWithGoal;
            activity.categoryId = action.payload.categoryId;
            activity.categoryName = action.payload.categoryName;
          }
          return activity;
        }
      );
    },
    removeActivityFromSelectedGoal: (state, action: PayloadAction<any>) => {
      // Remove it from the selected goals activity
      state.selectedGoal.activities = state.selectedGoal.activities?.filter(
        (activity: any) => activity.id !== action.payload
      );
    },
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<any>) => {
      state.endDate = action.payload;
    },
    setActivityFlag: (state, action: PayloadAction<any>) => {
      state.activityFlag = action.payload;
    },
    setAllActivities: (state, action: PayloadAction<any>) => {
      state.allActivities = action.payload;
    },
    removeActivityFromAllActivities: (state, action: PayloadAction<any>) => {
      // Remove it from the selected goals activity
      state.allActivities = state.allActivities?.filter(
        (activity: any) => activity.id !== action.payload
      );
    },
    addActivityToAllActivities: (state, action: PayloadAction<any>) => {
      // Add it to the selected goals activity
      state.allActivities = [action.payload, ...state.allActivities];
    },
    editGoalName: (state, action: PayloadAction<any>) => {
      state.goals = state.goals.map((goal: any) => {
        if (goal.id === action.payload.id) {
          goal.name = action.payload.name;
        }
        return goal;
      });
      state.selectedGoal.name = action.payload.name;
    },
    setCompletedGoals: (state, action: PayloadAction<any>) => {
      state.completedGoals = action.payload;
    },
    addGoalToCompletedGoals: (state, action: PayloadAction<any>) => {
      state.completedGoals = [action.payload, ...state.completedGoals];
    },
    updateActivityInAllActivities: (state, action: PayloadAction<any>) => {
      state.allActivities = state.allActivities.map((activity: any) => {
        if (activity.id === action.payload.id) {
          activity.percentage = action.payload.percentage;
          activity.name = action.payload.name;
          activity.alignsWithGoal = action.payload.alignsWithGoal;
          activity.categoryId = action.payload.categoryId;
          activity.categoryName = action.payload.categoryName;
        }
        return activity;
      });
    },
  },
});

export const {
  setUserAuth,
  reset,
  setUserGoals,
  addGoal,
  removeGoal,
  setSelectedGoal,
  updateSelectedGoalPercentage,
  addActivityToSelectedGoal,
  removeActivityFromSelectedGoal,
  setStartDate,
  setEndDate,
  setActivityFlag,
  setAllActivities,
  removeActivityFromAllActivities,
  addActivityToAllActivities,
  editGoalName,
  setCompletedGoals,
  updateSelectedGoalCompleted,
  addGoalToCompletedGoals,
  updateActivityInAllActivities,
  updateActivityToSelectedGoal,
} = userSlice.actions;
export default userSlice.reducer;
