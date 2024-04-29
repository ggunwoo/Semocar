import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// PAGES
import { Main } from "./pages/Main";
import { Detail } from "./pages/Detail";
import { Brand } from "./pages/Brand";
import AdminPage from "./pages/admin";

// COMPONENT
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CreateBrandPage from "./components/admin/CreateBrand";
import CreateCarPage from "./components/admin/create-cars/CreateCar";
import CreateICEPage from "./components/admin/create-cars/Ice";
import CreateHEVPage from "./components/admin/create-cars/hev";
import CreateEVPage from "./components/admin/create-cars/ev";

function App(): JSX.Element {
  const location = useLocation();

  const hideFooter = location.pathname.includes("/brand") || location.pathname.includes("/admin");

  return (
    <div style={{ fontFamily: "GmarketSans, sans-serif" }}>
      <CssBaseline />
      {/* HEADER */}
      <Header />
      {/* ARTICLE */}
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* ======= 어드민 페이지 ======= */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="create-brand" element={<CreateBrandPage />} />
          <Route path="create-car" element={<CreateCarPage />}>
            <Route path="gs-dz-lpg" element={<CreateICEPage />} /> 
            <Route path="hybrid" element={<CreateHEVPage />} />
            <Route path="electiric" element={<CreateEVPage />} />
          </Route>
        </Route>
        {/* ============================ */}
      </Routes>
      {/* FOOTER */}
      {!hideFooter && <Footer />}
    </div>
  );
}

// color
// dark : #62478f
// deep : #9063FF
// main : #BA90FD
// 쩡니 : #AB9ADD
// 다음자동차 : #e9eaf1
// light : #E9DCFD
// light : #cdc0e2
// superlight : #FAF7FF

export default App;
