import { AuthContext } from "@contexts/AuthContext";
import useFetch from "@hooks/useFetch";
import MainLayout from "@layouts/MainLayout";
import { getProfile } from "@lib/api";
import { useContext } from "react";

interface UserProfile {
  firstname: string;
  lastname: string;
  email: string;
}

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('Header must be used within an AuthProvider');
  
  const { exit } = authContext

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch<UserProfile>(() => getProfile())

  const handleOpenModal = () => {
    const dialog = document.getElementById('myDialog')

    const isDialogElement = dialog instanceof HTMLDialogElement
    if (!isDialogElement) return;
    
    dialog.showModal();
  }

  return (
    <MainLayout title="Routine Path | Perfil">
      <section className="max-w-[1920px] w-full mx-auto flex flex-col items-center justify-start py-20 px-8 text-black-app min-h-[70dvh]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold pb-8">Mi Perfil</h1>
        {
          userLoading
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <span className="loader">Cargando datos...</span>
            </div>
          )
          : userError
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <p className="text-red-500">Ocurrió un error al cargar el perfil.</p>
            </div>
          )
          : userData && (
            <article className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg px-6 py-10">
              <img src="/images/profile.webp" alt="Imagen referencial de un perfil" className="rounded-full w-32 h-32 mb-4" />
              <h2 className="text-xl font-bold">{userData.firstname} {userData.lastname}</h2>
              <p className="text-gray-600 pb-8">{userData.email}</p>
              <button onClick={ handleOpenModal } className="self-end cursor-pointer text-center font-semibold px-6 py-3 rounded-2xl outline outline-black-app transition hover:bg-black-app hover:text-white w-full sm:w-auto">Cerrar Sesión</button>
            </article>
          )
        }
      </section>

      <dialog id="myDialog" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="font-semibold">¿Estás seguro que quieres cerrar sesión?</h2>
      <div className="flex justify-center gap-x-3 pt-3 flex-wrap items-center text-white">
        <form method="dialog">
          <button className="px-4 py-2 rounded-lg bg-red-500 cursor-pointer">Cancelar</button>
        </form>
        <button onClick={ exit } className="px-4 py-2 rounded-lg bg-blue-500 cursor-pointer">Cerrar Sesión</button>
      </div>
    </dialog>
    </MainLayout>
  )
}

export default ProfilePage;
