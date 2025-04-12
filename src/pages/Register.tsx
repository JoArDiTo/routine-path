import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { register } from "@lib/api";

const INPUTS = [
  {
    id: "firstname",
    type: "text",
    placeholder: "Nombre(s)",
    label: "Nombre(s)",
  },
  {
    id: "lastname",
    type: "text",
    placeholder: "Apellido(s)",
    label: "Apellido(s)",
  },
  {
    id: "email",
    type: "email",
    note: "No se aceptan correos ya registrados",
    placeholder: "Correo electrónico",
    label: "Correo",
  },
  {
    id: "password",
    type: "password",
    note: "Mínimo 4 caracteres",
    length_min: 4,
    placeholder: "Contraseña",
    label: "Contraseña",
  },
  {
    id: "confirmPassword",
    type: "password",
    placeholder: "Confirmar contraseña",
    label: "Confirmar contraseña",
  }
]

const RegisterPage = () => {
  document.title = "Routine Path | Registro";
  const navigate = useLocation()[1];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget as HTMLFormElement;
    const firstname = elements.namedItem("firstname") as HTMLInputElement;
    const lastname = elements.namedItem("lastname") as HTMLInputElement;
    const email = elements.namedItem("email") as HTMLInputElement;
    const password = elements.namedItem("password") as HTMLInputElement;
    const confirmPassword = elements.namedItem("confirmPassword") as HTMLInputElement;

    if (password.value !== confirmPassword.value) return toast.error("Contraseñas diferentes");

    const newUser = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    }

    const data = await register(newUser)

    if (typeof data === 'string') return toast.error(data);

    toast.success("Usuario creado, redirigiendo a inicio de sesión...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);

  }

  return (
    <section className="w-full mx-auto flex flex-row justify-between items-center h-screen px-5 lg:px-0">
      <img className="absolute inset-0 w-full h-full lg:max-h-dvh object-cover z-0 lg:w-[60%] lg:relative" src="/images/login-reference.webp" alt="Imagen referencial de inicio de sesión" />
      <article className="mx-auto max-w-sm w-full flex flex-col items-center px-6 gap-8 bg-white py-8 rounded-2xl shadow-md z-10">
        <Link href="/" className="flex justify-center items-center text-black-app gap-3">
          <img src="/vite.svg" className=" size-10 object-contain" alt="Logo de Routine Path" />
          <p className="hidden font-semibold text-xl lg:block">Routine Path</p>
        </Link>
        <h2 className="text-3xl text-center text-black font-extrabold pb-3">Registrarse</h2>
        <form onSubmit={ handleSubmit } className="flex flex-col gap-4 w-full max-w-md pb-6">
          {
            INPUTS.map(({ id, type, note, placeholder, label }) => (
              <label key={id} className="flex flex-col" htmlFor={id}>
                <p className="flex flex-wrap justify-between items-center pb-1">{label}: { note && <span className="text-xs opacity-50">{ note }</span> }</p>
                <input 
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  { ...type === "password" ? { minLength: 4 } : {} }
                  className="border z-0 border-gray-300 rounded-lg p-2"
                  required
                />
              </label>
            ))
          }
          <button type="submit" className="cursor-pointer bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">Crear cuenta</button>
        </form>

        <Link to="/login" className="text-teal-500 hover:underline">¿Tiene cuenta? Inicia Sesión aquí</Link>
      </article>
    </section> 
  )
}

export default RegisterPage;
