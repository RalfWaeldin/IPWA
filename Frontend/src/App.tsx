import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationContextProvider from "./context/AuthenticationContextProvider";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import MainLayout from "./layouts/MainLayout";
import Page_Home from "./pages/Page_Home";
import Page_Interview from "./pages/Page_Interview";
import Page_Impressum from "./pages/Page_Impressum";
import Page_Login from "./pages/Page_Login";

function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Page_Home />} />
              <Route path="/impressum" element={<Page_Impressum />} />
              <Route path="/login" element={<Page_Login />} />
              <Route element={<AuthenticationLayout />}>
                <Route path="/interview" element={<Page_Interview />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
