import { GoalContext } from "@contexts/GoalContext";
import { useContext } from "react";

interface MetaToggleProps {
  onToggle: () => void;
}

const MetaToggle = ({ onToggle }: MetaToggleProps) => {
  const goalDetailcontext = useContext(GoalContext);
  if (!goalDetailcontext) throw new Error("useGoalDetail must be used within a GoalDetailProvider");
  
  const { data } = goalDetailcontext;
  return (
    <label className="flex items-center gap-3">
      ¿Meta Terminada?
      <input
        type="checkbox"
        onChange={onToggle}
        className={`size-6 cursor-pointer rounded-lg px-4 py-2 transition duration-200 ${
          data.status === 'Completado' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
        defaultChecked={data.status === 'Completado'}
      />
    </label>
  );
};

export default MetaToggle;
