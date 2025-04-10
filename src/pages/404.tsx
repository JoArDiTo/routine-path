import { Link } from "wouter";

const NotFoundPage = () => {
  return (
    <div className="max-w-[1920px] w-full mx-auto flex flex-col items-center justify-center h-dvh">
      <h1 className="text-7xl font-bold text-black-app">404</h1>
      <p className="my-4 text-2xl text-gray-700">Página no encontrada</p>
      <Link href="/" className="text-center font-semibold px-10 py-4 rounded-3xl text-lg outline outline-black-app transition hover:bg-black-app hover:text-white">Regresar al Inicio</Link>

    </div>
  );
}

export default NotFoundPage;
