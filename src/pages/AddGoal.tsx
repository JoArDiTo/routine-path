import Layout from "@layouts/MainLayout";
import { createGoal } from "@lib/api";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { RegisterGoalRequest } from "@interfaces/request";

const INPUTS = [
  {
    id: "title",
    type: "text",
    placeholder: "Escribe el nombre de tu meta",
    label: "Nombre de la meta",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Escribe una breve descripción de tu meta",
    label: "Descripción de la meta",
  },
  {
    id: "deadline",
    type: "date",
    placeholder: "dd/mm/aaaa",
    label: "Fecha Límite",
  },
  {
    id: "checkbox",
    type: "checkbox",
    label: "¿Incluir tareas?",
  }
]

const AddGoalPage = () => {
  const [ isAddSteps, setIsAddSteps ] = useState(false);
  const [ addGoalRequest, setAddGoalRequest ] = useState<RegisterGoalRequest>({
    title: "",
    description: "",
    deadline: null,
  })
  const [ steps, setSteps ] = useState<string[]>([]);
  const navigate = useLocation()[1];


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.target as HTMLFormElement;
    const title = elements.namedItem("title") as HTMLInputElement;
    const description = elements.namedItem("description") as HTMLInputElement;
    const deadline = elements.namedItem("deadline") as HTMLInputElement;

    const isCheckbox = elements.namedItem("checkbox") as HTMLInputElement;
    const isIncludeSteps = isCheckbox.checked;

    if (isIncludeSteps && steps.length === 0) {
      toast.error("Agrega al menos una tarea antes de continuar.");
      return;
    }

    const newGoal = {
      title: title.value,
      description: description.value,
      deadline: new Date(deadline.value),
      steps: isIncludeSteps ? steps : [],
    }

    const { message } = await createGoal(newGoal)

    navigate("/dashboard")
    toast.info(message)
    
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAddGoalRequest({
      ...addGoalRequest,
      [name]: name === "deadline" ? new Date(value + "T00:00:00") : value,
    })
  }

  const handleAddStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;

    const newStep = elements.namedItem("new_step") as HTMLInputElement;

    setSteps([...steps, newStep.value]);
    newStep.value = ""; 
  }

  return (
    <Layout title="Routine Path | Add Goal">
      <section className="max-w-[1920px] mx-auto pt-12 pb-32 p-8 min-h-dvh">
        <h1 className='text-3xl sm:text-4xl self-start text-black font-extrabold pb-8'>🏁 Agregar Meta</h1>
        <Link to="/dashboard" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Volver</Link>

        <div className="flex flex-wrap items-start gap-4 justify-start w-full mt-5">
          <div className="flex flex-col w-full max-w-5xl gap-y-5">
            <form onSubmit={ handleSubmit } className="w-full bg-white p-8 rounded-lg shadow-md flex flex-col gap-y-5">
              {
                INPUTS.map(({ id, type, placeholder, label }, index) => (
                  <label key={index}>
                    { label }
                    {
                      type === "checkbox" ? (
                        <input
                          id={id} 
                          type={type} 
                          className="ml-3" 
                          checked={isAddSteps}
                          onChange={() => setIsAddSteps(!isAddSteps)}
                        />
                      ) : (
                        <input 
                          type={type}
                          name={id}
                          placeholder={placeholder}
                          { ...type === "date" ? { min: new Date().toLocaleDateString().split("T")[0] } : {} }
                          className="font-normal w-full p-2 border border-gray-300 rounded-md"
                          onChange={ handleOnChange }
                          required
                        />
                      )
                    }
                  </label>
                ))
              }
              <button className="bg-blue-500 hover:bg-blue-700 rounded-lg py-2 cursor-pointer text-white">Agregar Meta</button>
            </form>
            {
                isAddSteps && (
                  <form onSubmit={ handleAddStep } className="flex flex-col gap-y-5 bg-white p-8 rounded-lg shadow-md">
                    <label className="font-semibold">
                      Nombre de la tarea
                      <input id="new_step" type="text" className="font-normal w-full p-2 border border-gray-300 rounded-md" placeholder="Escribe el nombre de tu tarea" required />
                    </label>
                    <button className="w-fit bg-green-500 hover:bg-green-700 text-white px-8 py-2 cursor-pointer rounded-lg">Agregar tarea</button>
                  </form>
                )
              }
          </div>
          <article className='max-w-lg w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
            <h2 className='text-2xl font-semibold pb-2'>🏁 { addGoalRequest.title.trim() !== '' ? addGoalRequest.title : 'Nombre de la meta' }</h2>
            <p><strong>Descripción:</strong> { addGoalRequest.description.trim() !== '' ? addGoalRequest.description : 'Descripcion de la meta' }</p>
            <p> <strong>Fecha Límite:</strong> { addGoalRequest?.deadline ? new Date(addGoalRequest.deadline).toLocaleDateString() : 'AAAA/MM/DD' }</p>
            {
              isAddSteps && (
                <div className="flex flex-col gap-y-2 pt-4">
                  <h3 className='text-lg font-semibold'>Tareas</h3>
                    {
                      steps.length > 0 ? (
                        <ul className='list-disc pl-5'>
                          {
                             steps.map((step, index) => (
                              <li key={index} className='text-sm'>{ step }</li>
                            ))
                          }
                        </ul>
                      ) : (
                        <span className='text-sm'>No hay tareas agregadas</span>
                      )
                    }
                </div>
              )
            }
          </article>
        </div>

      </section>
    </Layout>
  )
}

export default AddGoalPage;