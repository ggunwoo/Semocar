import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// PAGES
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";

// COMPONENT
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CreateBrandPage from "./components/admin/CreateBrand";
import CreateCarPage from "./components/admin/create-cars/CreateCar";
import CarListPage from "./components/admin/GetCarList";

function App(): JSX.Element {
  const location = useLocation();

  const hideHeader = location.pathname.includes("/admin");
  const hideFooter = location.pathname.includes("/brand") || location.pathname.includes("/admin");

  return (
    <div style={{ fontFamily: "GmarketSans, sans-serif" }}>
      <CssBaseline />
      {/* HEADER */}
      {!hideHeader && <Header />}
      {/* MAIN */}
      <main>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          {/* ======= 어드민 페이지 ======= */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="create-brand" element={<CreateBrandPage />} />
            <Route path="create-car" element={<CreateCarPage />} />
            <Route path="get-car" element={<CarListPage />} />
          </Route>
          {/* ============================ */}
        </Routes>
      </main>
      {/* FOOTER */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
