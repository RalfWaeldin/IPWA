import { Link } from "react-router";

export default function Footer_Main() {
  return (
    <>
      <div className="sticky sm:left-00 bottom-0 sm:w-full">
        <div className="flex place-content-between px-5 py-1 text-xs text-blue-500 bg-blue-200">
          <div>&copy; RRW 2026</div>
          <div>
            <Link to="/impressum">Impressum</Link>
          </div>
        </div>
      </div>
    </>
  );
}
