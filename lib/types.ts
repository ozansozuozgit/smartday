export type PrismaClientType = {
    provider: string;
  };
  
  export type PrismaDbDataSourceType = {
    provider: string;
    url: string;
  };
  
  export type ActivityType = {
    id: string;
    name: string;
    percentage: number;
    goalId: string;
    goal: GoalType;
    categoryId?: string | null;
    categoryName?: string | null;
    category?: CategoryType | null;
    alignsWithGoal: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
  };
  
  export type CategoryType = {
    id: string;
    name: string;
    activities: ActivityType[];
    userId: string;
    createdAt?: Date | null;
  };
  
  export type GoalType = {
    id: string;
    name: string;
    percentage?: number | null;
    createdAt: Date;
    userId: string;
    activities: ActivityType[];
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    completedGoals: CompletedGoalType[];
    aiMessages: AiMessageType[];
  };
  
  export type CompletedGoalType = {
    id: string;
    goalId: string;
    goal: GoalType;
    completedAt: Date;
    userId: string;
    name?: string | null;
  };
  
  export type AiMessageType = {
    id: string;
    message: string;
    goalId: string;
    goal: GoalType;
    createdAt: Date;
  };
  