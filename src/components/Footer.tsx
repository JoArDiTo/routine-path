const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-[1920px] w-full mx-auto bg-primary text-secondary pt-4 text-center pb-40">
     <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#top" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">Routine Path</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
              <li>
                <a href="#sabermas" className="hover:underline me-4 md:me-6">Saber más</a>
              </li>
              <li>
                <a href="#preguntas" className="hover:underline me-4 md:me-6">Preguntas frecuentes</a>
              </li>
          </ul>
        </div>
        <hr className="my-6 border-secondary sm:mx-auto lg:my-8" />
        <span className="block text-sm sm:text-center">&copy; { currentYear } Routine Path. Todos los derechos reservados.</span>
    </div>
    </footer>
  );
}

export default Footer;
