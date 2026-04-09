import { Outlet } from "react-router";
import {
  AuthenticationProvider,
  InterviewAgentProvider,
  InterviewDbProvider,
  RequestDbProvider,
} from "@/context";
import Header_Main from "@/components/Header_Main";
import Footer_Main from "@/components/Footer_Main";
const MainLayout = () => (
  <AuthenticationProvider>
    <div
      id="main_layout_container"
      className="flex flex-col items-center bg-[#dffafa] h-full"
    >
      <div className="w-full sm:w-[800px]">
        <Header_Main />
        <InterviewAgentProvider>
          <InterviewDbProvider>
            <RequestDbProvider>
              <Outlet />
            </RequestDbProvider>
          </InterviewDbProvider>
        </InterviewAgentProvider>
        <Footer_Main />
      </div>
    </div>
  </AuthenticationProvider>
);

export default MainLayout;
