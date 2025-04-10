import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { Link } from "wouter";

const ROUTES = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Mi cuenta",
    href: "/perfil"
  }
]

const Header = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('LoginPage must be used within an AuthProvider');

  const { user } = authContext;

  return (
    <header className="max-w-[1920px] w-full mx-auto flex flex-row items-center justify-between py-6 px-8 text-white border-b-[1px] border-gray-400">
      <Link href="/" className="flex justify-center items-center text-black-app gap-3">
        <img src="/vite.svg" className="size-8 object-contain" alt="Logo de Routine Path" />
        <p className="hidden lg:block font-semibold text-lg">Routine Path</p>
      </Link>
      <nav className="flex justify-center items-center gap-5">
        {
          user && ROUTES.map(({ label, href }, index) => <Link key={index+2} to={href} className="text-lg font-semibold text-black-app transition hover:text-teal-app">{label}</Link>
        )
        }
      </nav>
      {
        user 
        ? <span className="font-semibold border border-black-app text-black-app p-2 rounded-2xl transition hover:bg-black-app hover:text-white lg:px-5">
            <p className="block lg:hidden">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
            </p>
            <p className="hidden lg:block">{ user.name }</p>
          </span>
        : <Link href="/login" className="font-semibold border border-black-app text-black-app px-5 py-2 rounded-2xl transition hover:bg-black-app hover:text-white">Empezar</Link>
      }
    </header>
  );
}

export default Header;
