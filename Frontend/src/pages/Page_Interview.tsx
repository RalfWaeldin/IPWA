export default function Page_Interview() {
  return (
    <main className="flex content-center items-center p-2 mx-auto sm:w-full flex-col w-full h-screen">
      <div className="h-fit w-10/12 bg-white">
        <div className="h-5.5 pl-2 bg-blue-600 text-white text-[12px]">
          Interview erfassen
        </div>
        <div className="p-2 w-full">
          <form className="bg-gray-300 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 w-full p-2">
              <div className="flex flex-col">
                <label
                  id="interviewlabel"
                  htmlFor="interview"
                  className="label text-[12px] text-gray-100"
                >
                  <span className="label-text">Interview:</span>
                </label>
                <textarea
                  id="interview"
                  name="interview"
                  className="bg-white text-[12px]"
                  placeholder="Ihr Email"
                />
              </div>

              <div className="flex flex-col mt-5">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-sm text-[12px]"
                >
                  Analysieren
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
