export default function SearchBar() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" id="searchbar">
      <div className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm dark:bg-transparent">
        <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-500 sm:text-4xl">
          Tra cứu thông tin đơn hàng tại đây
        </p>
        <form action="/search">
          <label
            className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-3xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="Mã đơn hàng. Ví dụ: hn001"
              name="q"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              required=""
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-orange_cus-500 border-black-500 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-2xl transition-all"
            >
              <div className="flex items-center transition-all opacity-1">
                <img src="./asset/search-white.png" className="w-4"></img>
              </div>
            </button>
          </label>
        </form>
        {/* <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#3b82f6" />
              <stop offset={1} stopColor="#1d4ed8" />
            </radialGradient>
          </defs>
        </svg> */}
      </div>
    </div>
  );
}
