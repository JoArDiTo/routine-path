import { createContext, ReactNode } from "react";
import { GoalDetailStepResponse, StepResponse } from "@interfaces/response";

interface GoalDetailContextProps {
  data: GoalDetailStepResponse;
  stepsState: StepResponse[];
  handleToggleStep: (index: number) => void;
  isChanging: boolean;
}

interface ProviderProps {
  children: ReactNode;
  data: GoalDetailStepResponse;
  stepsState: StepResponse[];
  handleToggleStep: (index: number) => void;
  isChanging: boolean;
}

export const GoalContext = createContext<GoalDetailContextProps | undefined>(undefined);

const GoalProvider = ({ children, data, stepsState, handleToggleStep, isChanging }: ProviderProps) => {
  return (
    <GoalContext.Provider value={{ data, stepsState, handleToggleStep, isChanging }}>
      {children}
    </GoalContext.Provider>
  );
};

export default GoalProvider;
