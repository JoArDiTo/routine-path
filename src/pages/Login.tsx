import { toast } from "sonner";
import { Link } from "wouter";
import { login } from "@lib/api"
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('La página debe utilizarse dentro de un AuthProvider');

  const { auth } = authContext;

  document.title = "Routine Path | Inicio de Sesión";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;

    const email = elements.namedItem("email") as HTMLInputElement;
    const password = elements.namedItem("password") as HTMLInputElement;
    
    if (!email || !password) return;

    const data = await login(email.value, password.value)

    if (typeof data === "string") return toast.error(data);

    auth(data.token)

  }

  return (
    <section className="w-full mx-auto flex flex-row justify-between items-center h-screen px-5 lg:px-0">
      <img className="absolute inset-0 w-full h-full lg:max-h-dvh object-cover z-0 lg:w-[60%] lg:relative" src="/images/login-reference.webp" alt="Imagen referencial de inicio de sesión" />
      <article className="mx-auto max-w-sm w-full flex flex-col items-center px-6 gap-8 bg-white py-8 rounded-2xl shadow-md z-10">
        <Link href="/" className="flex justify-center items-center text-black-app gap-3">
          <img src="/vite.svg" className=" size-10 object-contain" alt="Logo de Routine Path" />
          <p className="hidden font-semibold text-xl lg:block">Routine Path</p>
        </Link>
        <h2 className="text-3xl text-center text-black font-extrabold">Iniciar Sesión</h2>
        <form onSubmit={ handleSubmit } className="flex flex-col gap-4 w-full max-w-md pb-6">
          <input 
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="border z-0 border-gray-300 rounded-lg p-2"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <button type="submit" className="cursor-pointer bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">Iniciar Sesión</button>
        </form>

        <Link to="/register" className="text-teal-500 hover:underline">¿No tienes cuenta? Regístrate aquí</Link>
      </article>
    </section>
  )
}

export default LoginPage;
