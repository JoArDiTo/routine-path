export interface ProfileResponse {
  firstname: string;
  lastname: string;
  email: string;
}

export interface GoalResponse {
  id: string;
  title: string;
  deadline: Date;
  status: string;
  created_at: Date;
}

export interface StepResponse {
  id: string;
  title: string;
  is_completed: boolean;
}

export interface GoalDetailStepResponse {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: string;
  created_at: Date;
  steps: StepResponse[];
}