import { StepResponse } from "@interfaces/response";

interface StepItemProps {
  step: StepResponse;
  index: number;
  onToggle: () => void;
}

const StepItem = ({ step, index, onToggle }: StepItemProps) => (
  <div
    className={`flex flex-wrap justify-between items-center p-4 bg-gray-100 rounded-lg ${step.is_completed ? 'bg-green-100' : ''}`}
  >
    <span>{index < 9 ? `0${index + 1}` : index + 1}. {step.title}</span>
    <button
      onClick={onToggle}
      className={`cursor-pointer rounded-lg px-4 py-2 transition duration-200 ${
        step.is_completed ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      {step.is_completed ? 'Hecho' : 'Por hacer'}
    </button>
  </div>
);

export default StepItem;
