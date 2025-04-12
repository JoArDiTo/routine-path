import { useEffect, useState } from "react";
import { GoalDetailStepResponse, StepResponse } from "@interfaces/response";
import { updateGoalData, updateStepsGoal } from "@lib/api";
import { useLocation } from "wouter";
import { toast } from "sonner";

const useSteps = (goalId: string, data: GoalDetailStepResponse) => {
  const [stepsState, setStepsState] = useState<StepResponse[]>([]);
  const [isChanging, setIsChanging] = useState(false);
  const navigate = useLocation()[1];

  useEffect(() => {
    if (data?.steps) {
      setStepsState(data.steps);
    }
  }, [data]);

  useEffect(() => {
    if (data?.steps) {
      const hasChanges = data.steps.some(
        (step, i) => step.is_completed !== stepsState[i]?.is_completed
      );
      setIsChanging(hasChanges);
    }
  }, [stepsState, data]);

  const handleToggleStep = (index: number) => {
    const newSteps = [...stepsState];
    newSteps[index] = {
      ...newSteps[index],
      is_completed: !newSteps[index].is_completed,
    };
    setStepsState(newSteps);
  };

  const handleSubmitChanges = async () => {
    if (stepsState.length === 0) {
      const newStatus = data?.status === 'Pendiente' ? 'Completado' : 'Pendiente';
      console.log(newStatus);
      await updateGoalData(goalId, newStatus);
    }
    else {
      const changes = stepsState
        .filter((step, index) => step.is_completed !== data?.steps[index]?.is_completed)
        .map(({ id, is_completed }) => ({
          id,
          is_completed
        }));

      await updateStepsGoal(goalId, changes)
    }

    navigate('/dashboard')
    toast.success("Cambios guardados correctamente")
  };

  return { stepsState, isChanging, setIsChanging, handleToggleStep, setStepsState, handleSubmitChanges };
};

export default useSteps;
