import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// PAGES
import { Main } from "./pages/Main";
import { Detail } from "./pages/Detail";
import { Brand } from "./pages/Brand";
import AdminPage from "./pages/Admin";

// COMPONENT
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CreateBrandPage from "./components/admin/CreateBrand";
import CreateCarPage from "./components/admin/create-cars/CreateCar";

function App(): JSX.Element {
  const location = useLocation();

  const hideHeader = location.pathname.includes("/admin");
  const hideFooter = location.pathname.includes("/brand") || location.pathname.includes("/admin");

  return (
    <div style={{ fontFamily: "GmarketSans, sans-serif" }}>
      <CssBaseline />
      {/* HEADER */}
      {!hideHeader && <Header />}
      {/* ARTICLE */}
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* ======= 어드민 페이지 ======= */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="create-brand" element={<CreateBrandPage />} />
          <Route path="create-car" element={<CreateCarPage />} />
        </Route>
        {/* ============================ */}
      </Routes>
      {/* FOOTER */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
