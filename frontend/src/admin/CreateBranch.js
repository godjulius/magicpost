import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateBranch() {
  const navigate = useNavigate();
  const apiProvincesURL = "https://provinces.open-api.vn/api/?depth=2";

  const [formData, setFormData] = useState({
    branchName: "",
    province: "",
    district: "",
    detailAddress: "",
    isHub: "",
    hubId: "",
  });

  const [branchs, setBranchs] = useState([]);

  useEffect(() => {
    const fetchBranchs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/branch", {
          withCredentials: true,
        });
        setBranchs(response.data);
      } catch (error) {
        console.error("Error fetching branchs:", error);
      }
    };

    fetchBranchs();
  }, []);

  // Fetch API province thanh pho
  const [codeTinh, setCodeTinh] = useState(0);
  const [cities, setCities] = useState(null);
  const [isLoadingCitiesList, setIsLoadingCitiesList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiProvincesURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setCities(result);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoadingCitiesList(false);
      }
    };

    fetchData();
  }, []); // Dependency array is empty, so this effect runs once after the initial render

  // Cac Event handlers
  const handleTinhChange = (event) => {
    const temp = {
      ...formData,
      province: cities[event.target.value].name,
    };
    setCodeTinh(event.target.value);
    setFormData(temp);
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu lựa chọn là "Điểm tập kết" thì set isHub = 1, ngược lại set isHub = 0
    const isHubValue = value === "tapKet" ? 1 : 0;

    setFormData({
      ...formData,
      [name]: value,
      isHub: isHubValue,
    });
  };

//   const handleHubIdChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/branch/create",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      if (response.data.msg === "Create branch successfully") {
        alert("Create Branch successfully!");
        navigate("../BranchManagement");
      }

    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <section className="w-full h-screen overflow-x-hidden mt-8 mb-8 font-custom-sans-serif">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl flex-1">
                Create new branch
              </h1>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <Link to="/admin/BranchManagement">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  </svg>
                </Link>
              </button>
            </div>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div className="mt-2">
                <label
                  htmlFor="isHub"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kiểu chi nhánh
                </label>
                <select
                  id="isHub"
                  name="isHub"
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                  defaultValue="default"
                  onChange={handleTypeChange}
                >
                  <option value="default" disabled hidden>
                    Kiểu chi nhánh
                  </option>
                  <option value="tapKet">Điểm tập kết</option>
                  <option value="giaoDich">Điểm giao dịch</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="branchName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên chi nhánh
                </label>
                <input
                  type="text"
                  name="branchName"
                  id="branchName"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Tên chi nhánh"
                  onChange={handleChange}
                  required=""
                />
              </div>
              {formData.isHub === 0 && (
                <div className="mb-4">
                  <label
                    htmlFor="hubId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tên điểm tập kết
                  </label>
                  <select
                    id="hubId"
                    name="hubId"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={handleChange}
                    required=""
                    defaultValue="default"
                  >
                    <option value="default" disabled hidden>
                      Select Hub
                    </option>

                    {branchs.map(
                      (branch) =>
                        branch.is_hub === true && (
                          <option
                            key={branch.branch_id}
                            value={branch.branch_id}
                          >
                            {branch.branch_name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              )}

              {isLoadingCitiesList || (
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="province"
                  >
                    Địa chỉ
                  </label>
                  <select
                    id="province"
                    name="province"
                    onChange={handleTinhChange}
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                    defaultValue="default"
                  >
                    <option value="default" disabled hidden>
                      Chọn tỉnh thành
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} value={index}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {isLoadingCitiesList || (
                <div className="mt-2">
                  <select
                    id="district"
                    name="district"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                    defaultValue="default"
                    onChange={handleChange}
                  >
                    <option value="default" disabled hidden>
                      Chọn Quận/Huyện
                    </option>
                    {cities[codeTinh].districts.map((district, index) => (
                      <option key={index} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-2">
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="senderDetailAddress"
                  name="detailAddress"
                  type="text"
                  required=""
                  placeholder="Địa chỉ chi tiết"
                  aria-label="senderDetailAddress"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create new branch
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateBranch;
