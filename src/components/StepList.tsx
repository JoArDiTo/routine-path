import { GoalContext } from "@contexts/GoalContext";
import StepItem from "@components/StepItem";
import { useContext } from "react";

const StepsList = () => {
  const goalDetailcontext = useContext(GoalContext);
  if (!goalDetailcontext) throw new Error("useGoalDetail must be used within a GoalDetailProvider");

  const { stepsState, handleToggleStep } = goalDetailcontext
  return (
    <div className="flex flex-col gap-y-2 mb-4">
      {stepsState.map((step, index) => (
        <StepItem key={step.id} step={step} index={index} onToggle={() => handleToggleStep(index)} />
      ))}
    </div>
  );
};

export default StepsList;
