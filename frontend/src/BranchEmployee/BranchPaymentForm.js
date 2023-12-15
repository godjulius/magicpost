import { useState, useEffect } from "react";
import axios from "axios";

const submitURL = "http://127.0.0.1:3000/order/create";
const apiProvincesURL = "https://provinces.open-api.vn/api/?depth=2";
const BranchPaymentForm = () => {
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    name: "", // tach thanh firstName + lastName
    phone: "",
    detailAddress: "",
    province: "",
    district: "",
    receiverName: "",
    receiverPhone: "",
    receiverDetailAddress: "",
    receiverProvince: "",
    receiverDistrict: "",
    typeId: "", // 0 la thu con 1 la buu kien
    weight: 0,
    price: 0,
    details: "something...",
  });
  // Fetch API province thanh pho
  const [codeTinh, setCodeTinh] = useState(0);
  const [codeTinhReceiver, setCodeTinhReceiver] = useState(0);
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
  const handleSenderTinhChange = (event) => {
    const temp = {
      ...order,
      province: cities[event.target.value].name,
    };
    setCodeTinh(event.target.value);
    setOrder(temp);
  };
  const handleReceiverTinhChange = (event) => {
    const temp = {
      ...order,
      receiverProvince: cities[event.target.value].name,
    };
    setCodeTinhReceiver(event.target.value);
    setOrder(temp);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      const lastSpaceIndex = value.lastIndexOf(" ");
      const lastName = value.slice(lastSpaceIndex + 1).trim();
      const firstName = value.slice(0, lastSpaceIndex).trim();

      const temp = {
        ...order,
        firstName,
        lastName,
        [name]: value,
      };
      // console.log(firstName + "-" + lastName);
      setOrder(temp);
    } else {
      const temp = {
        ...order,
        [name]: value,
      };

      setOrder(temp);
    }

    // const temp = {
    //   ...order,
    //   [event.target.name]: event.target.value
    // };
    // setOrder(temp);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(order);
    // Call api gửi dữ liệu lên server

    try {
      const response = await axios.post(submitURL, order);
      console.log(response.data);
      console.log("Submit success", response.data);
    } catch (err) {
      console.error("Submit fail", err.response.data);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col font-custom-sans-serif">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Đơn hàng mới</h1>
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          {/* Nguoi gui */}
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2 font-custom-sans-serif">
            <p className="text-xl text-black pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i> Bên gửi
            </p>
            <div className="leading-loose p-10 bg-white rounded shadow-xl">
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="senderName"
                >
                  Tên người gửi:
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="senderName"
                  name="name"
                  type="text"
                  required=""
                  placeholder="Tên người gửi"
                  aria-label="senderName"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="senderPhoneNumber"
                >
                  Số điện thoại người gửi:
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="senderPhoneNumber"
                  name="phone"
                  type="phone"
                  pattern="[0-0]{1}[0-9]{9}"
                  required
                  placeholder="Số điện thoại người gửi"
                  aria-label="senderPhoneNumber"
                  onChange={handleChange}
                />
              </div>
              {isLoadingCitiesList || (
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="senderTinh"
                  >
                    Địa chỉ
                  </label>
                  <select
                    id="senderTinh"
                    name="province"
                    onChange={handleSenderTinhChange}
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
                    id="senderHuyen"
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
                  placeholder="Địa chỉ chi tiết (số nhà, tên đường, phường/xã)"
                  aria-label="senderDetailAddress"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* Nguoi nhan */}
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pl-2 font-custom-sans-serif">
            <p className="text-xl pb-6 text-black flex items-center">
              <i className="fas fa-list mr-3"></i> Bên nhận
            </p>
            <div className="leading-loose p-10 bg-white rounded shadow-xl">
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="receiverName"
                >
                  Tên người nhận:
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="receiverName"
                  name="receiverName"
                  type="text"
                  required=""
                  placeholder="Tên người gửi"
                  aria-label="receiverName"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="receiverPhoneNumber"
                >
                  Số điện thoại người nhận:
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="receiverPhoneNumber"
                  name="receiverPhone"
                  type="phone"
                  pattern="[0-0]{1}[0-9]{9}"
                  required
                  placeholder="Số điện thoại người gửi"
                  aria-label="receiverPhoneNumber"
                  onChange={handleChange}
                />
              </div>
              {isLoadingCitiesList || (
                <div className="mt-2">
                  <label className="block text-sm text-gray-600">Địa chỉ</label>
                  <select
                    id="receiverTinh"
                    name="receiverProvince"
                    onChange={handleReceiverTinhChange}
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
                    id="receiverHuyen"
                    name="receiverDistrict"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                    defaultValue="default"
                    onChange={handleChange}
                  >
                    <option value="default" disabled hidden>
                      Chọn Quận/Huyện
                    </option>
                    {cities[codeTinhReceiver].districts.map(
                      (district, index) => (
                        <option key={index} value={district.name}>
                          {district.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}
              <div className="mt-2">
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="receiverDetailAddress"
                  name="receiverDetailAddress"
                  type="text"
                  required=""
                  placeholder="Địa chỉ chi tiết (số nhà, tên đường, phường/xã)"
                  aria-label="receiverDetailAddress"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-full my-6 pr-0 lg:pr-2 font-custom-sans-serif">
            <div className="w-full text-xl pb-6 items-center text-center">
              <i className="fas fa-list mr-3"></i> Chi tiết đơn hàng
            </div>
            <div className="leading-loose p-10 bg-white rounded shadow-xl">
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="loaiHang"
                >
                  Loại hàng
                </label>
                <select
                  id="loaiHang"
                  name="typeId"
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                  defaultValue="default"
                  onChange={handleChange}
                >
                  <option value="default" disabled hidden>
                    Loại hàng gửi
                  </option>
                  <option value="1">Tài liệu</option>
                  <option value="2">Hàng hóa</option>
                </select>
              </div>

              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="parcelWeight"
                >
                  Khối lượng(g):
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="parcelWeight"
                  name="weight"
                  type="number"
                  placeholder="Khối lượng hàng gửi(mặc định tài liệu khối lượng là 0g)"
                  aria-label="parcelWeight"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="price">
                  Cước phí (VND):
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="price"
                  name="price"
                  type="number"
                  placeholder="...VND"
                  aria-label="price"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* btn submit */}
          <div className="mt-6 mx-auto">
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
              type="submit"
            >
              Tạo đơn
            </button>
          </div>
        </form>
        {/* <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <p className="text-xl pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i> Contact Form
            </p>
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl">
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    id="name"
                    name="name"
                    type="text"
                    required=""
                    placeholder="Your Name"
                    aria-label="Name"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                    id="email"
                    name="email"
                    type="text"
                    required=""
                    placeholder="Your Email"
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    id="message"
                    name="message"
                    rows="6"
                    required=""
                    placeholder="Your inquiry.."
                    aria-label="Email"
                  ></textarea>
                </div>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default BranchPaymentForm;
