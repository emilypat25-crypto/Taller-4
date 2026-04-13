import { Leftbar } from "./Leftbar.jsx";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

export const Content = ({ children }) => {
  return (
    <div className="d-flex layout-container">

      {/* Sidebar fijo */}
      <Leftbar />

      {/* Columna principal */}
      <div className="d-flex flex-column flex-grow-1 main-container">

        {/* Header sticky */}
        <Header />

        {/* Contenido de la página */}
        <main className="flex-grow-1 p-4 content-scroll">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};