import { Outlet } from "react-router";
import {
  AuthenticationProvider,
  InterviewAgentProvider,
  InterviewDbProvider,
  RequestDbProvider,
} from "@/context";
import Header_Main from "@/components/Header_Main";
import Footer_Main from "@/components/Footer_Main";
import Kittel_BG from "@/components/objects/KittelBG";
import ThinkingLayer from "@/components/objects/ThinkingLayer";

const MainLayout = () => (
  <AuthenticationProvider>
    <InterviewAgentProvider>
      <div
        id="main_layout_container"
        className="flex flex-col w-full items-center bg-[#dffafa] h-full"
      >
        <Header_Main />

        <Kittel_BG />
        <InterviewDbProvider>
          <RequestDbProvider>
            <Outlet />
          </RequestDbProvider>
        </InterviewDbProvider>

        <Footer_Main />
      </div>
    </InterviewAgentProvider>
  </AuthenticationProvider>
);

export default MainLayout;
