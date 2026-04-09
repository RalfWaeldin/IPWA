import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout, AuthenticationLayout } from "./layouts";
import {
  Page_Home,
  Page_Suchen,
  Page_Impressum,
  Page_Interview,
  Page_Login,
  Page_UserManagement,
  Page_Fragen,
} from "./pages";
import Footer_Main from "./components/Footer_Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Page_Home />} />
            <Route path="/suchen" element={<Page_Suchen />} />
            <Route path="/fragen" element={<Page_Fragen />} />
            <Route path="/impressum" element={<Page_Impressum />} />
            <Route path="/login" element={<Page_Login />} />
            <Route element={<AuthenticationLayout />}>
              <Route path="/interview" element={<Page_Interview />} />
              <Route path="/usermanagement" element={<Page_UserManagement />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
