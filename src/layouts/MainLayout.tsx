import { ReactNode } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";


interface LayoutProps {
  title?: string
  children: ReactNode
}

const MainLayout = ({ title, children }: LayoutProps) => {
  document.title = title || 'Routine Path';

  return (
    <>
      <Header />
      <main>
        { children }
      </main>
      <Footer />
    </>
  )
}

export default MainLayout;
