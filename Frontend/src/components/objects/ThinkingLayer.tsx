import { useInterviewAgentContext } from "@/context";
import AnimatedLogo from "./symbols/AnimatedLogo";

export default function ThinkingLayer() {
  const { thinking } = useInterviewAgentContext();

  return (
    <>
      {thinking ? (
        <div
          id="Thinking_Layer"
          className="flex flex-col items-center absolute top-0 left-0 w-full h-screen z-50 bg-[#3399ccdd] "
        >
          <div className="absolute top-50 flex flex-col items-center h-50 w-50 text-[#00000] z-50">
            <div className="flex w-[200px]">
              <AnimatedLogo />
            </div>
            <div className="text-[20px] font-bold ">Dein Mentor denkt</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
