import MainLayout from "@layouts/MainLayout";
import { Link } from "wouter";

const ARTICLES_DATA = [
  {
    title: "Paso 1",
    description: "Registra tu meta en nuestra plataforma, ya sea personal o profesional, y decide si deseas desglosarla en pasos específicos para un seguimiento más detallado.",
    imagePath: "/paso1.webp",
  },
  {
    title: "Paso 2",
    description: "Recibe recordatorios diarios personalizados que te ayudarán a mantener el enfoque y la motivación para avanzar hacia el cumplimiento de tu objetivo.",
    imagePath: "/paso2.webp",
  },
  {
    title: "Paso 3",
    description: "Una vez que hayas alcanzado tu meta, márcala como completada y celebra tu éxito con herramientas diseñadas para reconocer tus logros.",
    imagePath: "/paso3.webp",
  }
]

const IndexPage = () => {
  return (
    <MainLayout title="Routine Path | Inicio">
      <section className="max-w-[1920px] w-full mx-auto pt-40 pb-32 flex items-center justify-between gap-x-5">
        <img className="object-cover max-w-64 h-96 w-full hidden xl:block rounded-r-2xl shadow-xl" src="images/index-image-01.webp" alt="Imagen 01 referencial de Routine Path" />
        <article className="w-full flex flex-col justify-center items-center">
          <h1 className="max-w-2xl text-6xl sm:text-7xl text-center text-black font-extrabold pb-8">Gestiona tus metas con nosotros</h1>
          <p className="max-w-3xl px-5 text-lg lg:text-xl text-center text-semibold text-gray-800 pb-12">
            Nuestra plataforma te permite registrar y gestionar tus metas personales o profesionales, ya sea que incluyan pasos específicos o no. Diseñada para adaptarse a tus necesidades, te ayudamos a mantener el enfoque y alcanzar tus objetivos de manera eficiente.
          </p>
          <div className="flex flex-col justify-center items-center w-full sm:flex-row gap-5 px-5">
            <Link href="/dashboard" className="text-center font-semibold px-10 py-4 rounded-3xl text-xl bg-black-app text-white transition hover:bg-green-app hover:text-black-app w-full sm:w-auto">Ver mis metas</Link>
            <a href="#sabermas" className="text-center font-semibold px-10 py-4 rounded-3xl text-xl outline outline-black-app transition hover:bg-black-app hover:text-white w-full sm:w-auto">Saber más</a>
          </div>
        </article>
        <img className="object-cover max-w-64 h-96 w-full hidden xl:block rounded-l-2xl shadow-xl" src="images/index-image-02.webp" alt="Imagen 02 referencial de Routine Path" />
      </section>

      <section id="sabermas" className="relative max-w-[1920px] w-full mx-auto pt-16 pb-[200px] flex flex-col items-center">
        <article className="w-[80%] flex flex-col items-center px-8 gap-8 bg-white pt-12 sm:pt-20 pb-16 rounded-2xl">
          <h2 className="text-3xl sm:text-5xl text-center text-black font-extrabold">¿Cómo funciona?</h2>
          <div className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
            {
              ARTICLES_DATA.map(({ title, description, imagePath }, index) => (
                <article key={ index } className="flex flex-col items-center justify-between border border-gray-200 shadow-lg w-full rounded-lg px-6 py-8 flex-1">
                  <h3 className="text-2xl sm:text-3xl text-black font-bold pb-3 self-start">{ title }</h3>
                  <p className="flex-1 text-sm sm:text-lg text-justify text-gray-800 pb-12">{ description }</p>
                  <img src={`/images${ imagePath }`} alt={ title } className="size-28 sm:size-40 object-contain rounded-lg" />
                </article>
              ))
            }
          </div>
        </article>
      </section>

      <section id="preguntas" className='relative max-w-[1920px] w-full mx-auto pt-24 pb-32 flex flex-col justify-start items-center min-h-dvh'>
        <article className="w-[80%] flex flex-col items-center px-6 gap-8 bg-white pt-20 pb-16 rounded-2xl">
          <h2 className="text-5xl text-center text-black font-extrabold">¿Por qué usar nuestra plataforma?</h2>
          <ul className="list-disc list-inside text-lg text-gray-800 mt-8 space-y-4">
            <li>Organiza tus metas de manera clara y estructurada.</li>
            <li>Recibe recordatorios personalizados para mantenerte enfocado.</li>
            <li>Desglosa tus objetivos en pasos manejables para un progreso constante.</li>
            <li>Accede a herramientas diseñadas para celebrar tus logros.</li>
            <li>Mejora tu productividad y alcanza tus metas de manera eficiente.</li>
          </ul>
        </article>
      </section>
    </MainLayout>
  );
}

export default IndexPage;
