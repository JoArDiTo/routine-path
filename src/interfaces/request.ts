export interface RegisterUserRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RegisterGoalRequest {
  title: string;
  description: string;
  deadline: Date | null;
}

export interface GoalWithStepsRequest {
  title:string;
  description:string;
  deadline:Date;
  steps: string[];
}