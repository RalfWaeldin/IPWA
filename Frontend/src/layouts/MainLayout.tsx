import { Outlet } from "react-router";
import { AuthenticationProvider } from "@/context";
import Header_Main from "@/components/Header_Main";
import Footer_Main from "@/components/Footer_Main";

const MainLayout = () => (
  <AuthenticationProvider>
    <div className="flex flex-col bg-blue-100">
      <Header_Main />
      <Outlet />
      <Footer_Main />
    </div>
  </AuthenticationProvider>
);

export default MainLayout;
