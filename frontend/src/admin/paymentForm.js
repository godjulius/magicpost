import { useState, useEffect } from "react";
import axios from "axios";

const submitURL = "";

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    sender: {
      name: "",
      tel: "",
      detailAddress: "",
      tinh: "",
      quanhuyen: "",
    },
    receiver: {
      name: "",
      tel: "",
      detailAddress: "",
      tinh: "",
      quanhuyen: "",
    },
    parcel: {
      type: "",
      weight: 0,
      postage: 0,
    },
  });
  // Fetch API tinh thanh pho
  const [codeTinh, setCodeTinh] = useState(0);
  const [codeTinhReceiver, setCodeTinhReceiver] = useState(0);
  const [cities, setCities] = useState(null);
  const [isLoadingCitiesList, setIsLoadingCitiesList] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=2"
        );
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
  const handleReceiverTinhChange = (event) => {
    const temp = {
      ...payment,
      receiver: {
        ...payment.receiver,
        tinh: cities[event.target.value].name,
      },
    };
    setCodeTinhReceiver(event.target.value);
    // console.log(temp);
    setPayment(temp);
  };
  const handleReceiverQuanHuyenChange = (event) => {
    const temp = {
      ...payment,
      receiver: {
        ...payment.receiver,
        quanhuyen: event.target.value,
      },
    };
    // console.log(temp);
    setPayment(temp);
  };
  const handleSenderNameChange = (event) => {
    const temp = {
      ...payment,
      sender: {
        ...payment.sender,
        name: event.target.value,
      },
    };
    // console.log(temp);
    setPayment(temp);
  };
  const handleReceiverNameChange = (event) => {
    const temp = {
      ...payment,
      receiver: {
        ...payment.receiver,
        name: event.target.value,
      },
    };
    // console.log(temp);
    setPayment(temp);
  };
  const handleSenderTinhChange = (event) => {
    const temp = {
      ...payment,
      sender: {
        ...payment.sender,
        tinh: cities[event.target.value].name,
      },
    };
    setCodeTinh(event.target.value);
    // console.log(temp);
    setPayment(temp);
  };
  const handleSenderQuanHuyenChange = (event) => {
    const temp = {
      ...payment,
      sender: {
        ...payment.sender,
        quanhuyen: event.target.value,
      },
    };
    // console.log(temp);
    setPayment(temp);
  };
  const handleSenderTelChange = (event) => {
    const temp = {
      ...payment,
      sender: {
        ...payment.sender,
        tel: event.target.value,
      },
    };
    // console.log(event.target.value);
    setPayment(temp);
  };
  const handleReceiverTelChange = (event) => {
    const temp = {
      ...payment,
      receiver: {
        ...payment.receiver,
        tel: event.target.value,
      },
    };
    // console.log(event.target.value);
    setPayment(temp);
  };
  const handleSenderDetailAddressChange = (event) => {
    const temp = {
      ...payment,
      sender: {
        ...payment.sender,
        detailAddress: event.target.value,
      },
    };
    setPayment(temp);
  };
  const handleReceiverDetailAddressChange = (event) => {
    const temp = {
      ...payment,
      receiver: {
        ...payment.receiver,
        detailAddress: event.target.value,
      },
    };
    setPayment(temp);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(payment);
    // Call api gửi dữ liệu lên server

    try {
      const response = await axios.post(submitURL, payment);
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
                  name="senderName"
                  type="text"
                  required=""
                  placeholder="Tên người gửi"
                  aria-label="senderName"
                  value={payment.sender.name}
                  onChange={handleSenderNameChange}
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
                  name="senderPhoneNumber"
                  type="tel"
                  pattern="[0-0]{1}[0-9]{9}"
                  required
                  placeholder="Số điện thoại người gửi"
                  aria-label="senderPhoneNumber"
                  onChange={handleSenderTelChange}
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
                    name="senderTinh"
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
                    name="senderHuyen"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                    defaultValue="default"
                    onChange={handleSenderQuanHuyenChange}
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
                  name="senderDetailAddress"
                  type="text"
                  required=""
                  placeholder="Địa chỉ chi tiết (số nhà, tên đường, phường/xã)"
                  aria-label="senderDetailAddress"
                  onChange={handleSenderDetailAddressChange}
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
                  onChange={handleReceiverNameChange}
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
                  name="receiverPhoneNumber"
                  type="tel"
                  pattern="[0-0]{1}[0-9]{9}"
                  required
                  placeholder="Số điện thoại người gửi"
                  aria-label="receiverPhoneNumber"
                  onChange={handleReceiverTelChange}
                />
              </div>
              {isLoadingCitiesList || (
                <div className="mt-2">
                  <label className="block text-sm text-gray-600">Địa chỉ</label>
                  <select
                    id="receiverTinh"
                    name="receiverTinh"
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
                    name="receiverHuyen"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                    defaultValue="default"
                    onChange={handleReceiverQuanHuyenChange}
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
                  onChange={handleReceiverDetailAddressChange}
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
                  name="loaiHang"
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Loại hàng gửi
                  </option>
                  <option value="tai lieu">Tài liệu</option>
                  <option value="Hàng hóa">Hàng hóa</option>
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
                  name="parcelWeight"
                  type="number"
                  placeholder="Khối lượng hàng gửi(mặc định tài liệu khối lượng là 0g)"
                  aria-label="parcelWeight"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="postage"
                >
                  Cước phí (VND):
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="postage"
                  name="postage"
                  type="number"
                  placeholder="...VND"
                  aria-label="postage"
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

export default PaymentForm;
