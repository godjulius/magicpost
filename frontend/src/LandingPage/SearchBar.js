import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const searchApiUrl = "";

export default function SearchBar() {
  const [madonhang, setMadonhang] = useState("");
  const navigate = useNavigate();
  function handleChange (event) {
    setMadonhang(event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    console.log(madonhang);
    // Call api gửi dữ liệu lên server

    // try {
    //   const response = await axios.post(searchApiUrl, payment);
    //   console.log("Submit success", response.data);
    // } catch (err) {
    //   console.error("Submit fail", err.response.data);
    // }
    navigate('SearchPage')
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" id="searchbar">
      <div className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm dark:bg-transparent">
        <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-500 sm:text-4xl">
          Tra cứu thông tin đơn hàng tại đây
        </p>
        <form onSubmit={handleSubmit}>
          <label
            className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-3xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="Ví dụ: hn001, hn002, yb003"
              name="q"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              required
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-orange_cus-500 border-black-500 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-2xl transition-all"
              >
              <Link to="SearchPage">            
              <div className="flex items-center transition-all opacity-1">
                <img src="./asset/search-white.png" className="w-4 mx-auto"></img>
              </div>
              </Link>
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}
