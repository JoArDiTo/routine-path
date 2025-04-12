import GoalCard from "@components/GoalCard";
import useFetch from "@hooks/useFetch";
import { GoalResponse } from "@interfaces/response";
import MainLayout from "@layouts/MainLayout";
import { getGoalsByUserLogged } from "@lib/api";
import { Link } from "wouter";

const DashboardPage = () => {
  const { 
    data: goals, 
    loading,
    error 
  } = useFetch<GoalResponse[]>(() => getGoalsByUserLogged());

  return (
    <MainLayout title="Routine Path | Dashboard">
      <section className="max-w-[1920px] w-full mx-auto flex flex-col items-center py-20 px-8 text-black-app min-h-[70dvh]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold pb-8">Mis Metas</h1>
        {
          loading
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <span className="loader">Cargando datos...</span>
            </div>
          )
          : error
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <p className="text-red-500">Ocurrió un error al cargar las metas.</p>
            </div>
          )
          : goals && (
            <>
            {
              goals.length > 0
              ? (
                <>
                  <section className='w-full flex flex-wrap justify-start items-center gap-x-6 gap-y-4 mb-5'>
                    <Link to='/goal/add' className="text-center font-semibold px-6 py-3 rounded-3xl text-md bg-black-app text-white transition hover:bg-green-app hover:text-black-app w-full sm:w-auto">¡Crea una nueva meta!</Link>
                  </section>
                  <section className='w-full flex flex-wrap items-start gap-4 justify-start'>
                    { goals.map((goal) => <GoalCard key={goal.id} { ...goal } />) }
                  </section>
                </>
              )
              : (
                <>
                  <p className='text-center text-2xl text-gray-500'>No tienes metas creadas</p>
                  <Link href='/goal/add' className='mt-3 w-fit inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>¡Crea una nueva meta!</Link>
                </>
                )
            }
            </>
          ) 
        }
      </section>
    </MainLayout>
  )
}

export default DashboardPage;
