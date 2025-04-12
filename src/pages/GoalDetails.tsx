import useFetch from "@hooks/useFetch";
import useSteps from "@hooks/useSteps";
import Layout from "@layouts/MainLayout";
import { Link, useRoute } from "wouter";
import { getStepsGoalById } from "@lib/api";
import { GoalDetailStepResponse } from "@interfaces/response";
import StepsList from "@components/StepList";
import MetaToggle from "@components/MetaToggle";
import GoalDetailProvider from "@contexts/GoalContext";

export const GoalDetailPage = () => {
  const [match, params] = useRoute("/goal/:goalId");
  if (!match) return;

  const { goalId } = params

  const {
    data,
    loading,
    error
  } = useFetch<GoalDetailStepResponse>(() => getStepsGoalById(goalId));
  
  const { stepsState, isChanging, setIsChanging, handleToggleStep, handleSubmitChanges } = useSteps(goalId, data!);

  return (
    <Layout>
      <section className="relative max-w-[1920px] w-full mx-auto pt-24 pb-32 px-5 flex flex-col gap-y-5 justify-start items-center min-h-dvh">
        {
          loading
            ? <p className="text-center text-gray-500">Cargando...</p>
            : error
              ? (
                <>
                  <img className="size-32" src="/images/goal-not-found.webp" alt="Imagen referencial de meta no encontrada" />
                  <p className="text-center text-red-500 text-md sm:text-xl">Ocurrió un error al cargar esta meta.</p>
                  <Link href="/dashboard" className="text-center font-semibold px-10 py-4 rounded-3xl text-lg outline outline-black-app transition hover:bg-black-app hover:text-white">Regresar al Dashboard</Link>
                </>
              )
              : data && (
                <GoalDetailProvider
                  data={data}
                  stepsState={stepsState}
                  handleToggleStep={handleToggleStep}
                  isChanging={isChanging}
                >
                  <Link to="/dashboard" className="absolute top-5 left-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Volver</Link>
                  <article className="max-w-5xl w-full py-8 px-4 bg-white rounded-lg shadow-md">
                    <h1 className="max-w-5xl text-xl sm:text-2xl lg:text-3xl text-center text-black font-extrabold pb-8">{data.title}</h1>
                    <p className="text-gray-700 mb-4"><strong>Descripción:</strong> {data.description}</p>
                    <p className="text-gray-700 mb-4"><strong>Fecha de entrega:</strong> {new Date(data.deadline).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-4"><strong>Estado:</strong> {data.status}</p>

                    {stepsState.length > 0 ? (
                      <StepsList />
                    ) : (
                      <MetaToggle onToggle={() => setIsChanging(!isChanging)} />
                    )}
                    <button
                      onClick={handleSubmitChanges}
                      className={`mt-6 w-full sm:w-auto text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ${
                        !isChanging ? 'bg-gray-500 pointer-events-none' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                      }`}
                    >
                      Guardar Cambios
                    </button>

                  </article>
                </GoalDetailProvider>
              )
        }
      </section>
    </Layout>
  );
};