import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// COMPONENT
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// PAGES
import { Main } from "./pages/Main";
import { Detail } from "./pages/Detail";
import { Brand } from "./pages/Brand";
import AdminPage from "./pages/admin";

function App(): JSX.Element {
  const location = useLocation();

  const hideFooter = location.pathname === "/brand";

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
        <Route path="/admin" element={<AdminPage />} />
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
