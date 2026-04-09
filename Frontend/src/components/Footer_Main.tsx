import { Link } from "react-router";

export default function Footer_Main() {
  return (
    <>
      <div
        className="sticky flex flex-row bottom-0 w-full sm:w-[800px]"
        style={{ zIndex: 2 }}
      >
        <div className="flex w-full place-content-between px-5 py-1 text-xs text-cyan-700 bg-cyan-200">
          <div>&copy; RRW 2026</div>
          <div>
            <Link to="/impressum">Impressum</Link>
          </div>
        </div>
      </div>
    </>
  );
}
