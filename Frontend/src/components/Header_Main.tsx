import NavigationBar from "./objects/NavigationBar";
import ThinkingLayer from "./objects/ThinkingLayer";

export default function Header_Main() {
  return (
    <div className="sticky flex flex-col w-full sm:w-[800px] top-0 left-0 z-38">
      <ThinkingLayer />
      <NavigationBar />
    </div>
  );
}
