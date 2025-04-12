import { Link } from "wouter";

interface Props {
  id: string;
  title: string;
  status: string;
  deadline: Date;
  created_at: Date
}

const GoalCard = ({ id, title, status, deadline, created_at }: Props) => {
  const statusStyle = 
    status === "Completado"
      ? "bg-green-100 text-green-800"
      : status === "En Progreso"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
  
  return (
    <article className='max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h2 className='text-2xl font-semibold pb-2 truncate'>{title}</h2>
      <p className={`mb-2 text-gray-600 px-4 py-1 text-sm rounded-lg w-fit ${statusStyle}`}>{ status }</p>
      <p className='text-gray-600'>Fecha Límite: {new Date(deadline).toLocaleDateString()}</p>
      <p className='text-gray-600'>Creada el: {new Date(created_at).toLocaleDateString()}</p>
      <Link to={`/goal/${id}`} className='mt-3 w-fit inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg transition outline-[1px] outline-black-app focus:ring-4 focus:outline-none bg-black-app hover:bg-white hover:text-black-app focus:ring-black-app'>
          Ver detalles
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </Link>
    </article>
  )
}

export default GoalCard;
