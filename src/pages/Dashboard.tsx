import MainLayout from "@layouts/MainLayout";

const DashboardPage = () => {
  return (
    <MainLayout title="Routine Path | Dashboard">
      <section className="max-w-[1920px] w-full mx-auto flex flex-col items-center justify-center py-20 px-8 text-black-app min-h-[70dvh]">
        <h1 className="text-black">Esta es el Dashboard del Usuario Logueado</h1>
      </section>
    </MainLayout>
  )
}

export default DashboardPage;
