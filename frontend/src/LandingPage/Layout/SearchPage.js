import React from "react";
import Footer from "./Footer";
import HeaderSearchPage from "./HeaderSearchPage.js";
import SearchBar from "../SearchBar.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const trackingUrl = "http://localhost:3000/order/tracking";
const orderPath = "/:orderId/path";
const SearchPage = ({ children }) => {
  const navigate = useNavigate();
  let { id } = useParams();
  window.scrollTo(0, 0);
  const [orderId, setOrderId] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [pathOrder, setPath] = useState([]);
  const [branchName, setBranchName] = useState();
  const [isLoadingPath, setIsLoadingPath] = useState(true);
  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${trackingUrl}/${id}`, {
          withCredentials: true,
        });
        setOrderDetail(response.data[0]);
        setIsFound(response.data[0].isFound);
        console.log(response.data[0]);
        let path;
        if (response.data[0].isFound) {
          try {
            path = await axios.get(`http://localhost:3000/${id}/path`, {
              withCredentials: true,
            });
            setPath(path.data);
            console.log(path.data);
            setIsLoadingPath(false);
          } catch (error) {
            console.error("Error fetching orders", error);
            setIsLoadingPath(true);
          } finally {
            setIsLoadingPath(false);
          }
          // path = await axios.get(`http://localhost:3000/${id}/path`, {
          //   withCredentials: true,
          // });
          // setPath(path.data);
          console.log(path.data);
          let branch = await axios.get(
            `http://localhost:3000/branch/${response.data[0].order.branch_id}`,
            {
              withCredentials: true,
            }
          );
          setBranchName(branch.data.branch_name);
          console.log(branch.data.branch_name);
        }
      } catch (error) {
        console.error("Error fetching orders", error);
        setIsFound(false);
      } finally {
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async function (event) {
    event.preventDefault();
    navigate(`/SearchPage/${orderId}`);
  };

  function onChangeOrderId(event) {
    setOrderId(event.target.value);
  }

  return (
    <>
      <HeaderSearchPage />
      <div className="pt-10"></div>
      <SearchBar
        handleSubmit={handleSubmit}
        onChangeOrderId={onChangeOrderId}
      />
      {isFound ? (
        <div>
          <div className="max-w-screen-xl px-8 xl:px-16 mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col mt-5">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Ord#{orderDetail.order.order_id}
              </h1>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt="person"
                      />
                      <img
                        className="w-full md:hidden"
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt="person"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          Người gửi
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Họ và tên: </span>{" "}
                            {orderDetail.order.customer.fullName}
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Địa chỉ: </span>
                            {orderDetail.order.customer.address}
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">
                              Số điện thoại:{" "}
                            </span>{" "}
                            {orderDetail.order.customer.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt="person"
                      />
                      <img
                        className="w-full md:hidden"
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt="person"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          Người nhận
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Họ và tên: </span>{" "}
                            {orderDetail.order.receiver_name}
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Địa chỉ: </span>{" "}
                            {orderDetail.order.receiver_address}
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">
                              Số điện thoại:{" "}
                            </span>{" "}
                            {orderDetail.order.receiver_phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt="person"
                      />
                      <img
                        className="w-full md:hidden"
                        src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt="person"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          Chi tiết đơn hàng
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">
                              Loại hàng gửi:{" "}
                            </span>{" "}
                            {orderDetail.order.parcel.type_id == 1
                              ? "Bưu phẩm"
                              : "Tài liệu"}
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">
                              Khối lượng(nếu có):{" "}
                            </span>
                            {orderDetail.order.parcel.weight}(kg)
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">
                              Chi tiết thêm:{" "}
                            </span>{" "}
                            {orderDetail.order.parcel.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                      Đơn giá
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Phí giao hàng
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          {orderDetail.order.parcel.price}VND
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Giảm giá{" "}
                          <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">
                            None
                          </span>
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          -0VND (0%)
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Tiền thu hộ
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          {orderDetail.cod} VND
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base font-semibold leading-4 text-gray-800">
                        Tổng
                      </p>
                      <p className="text-base font-semibold leading-4 text-gray-600">
                        {orderDetail.order.parcel.price}VND
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                      Hình thức vận chuyển
                    </h3>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center space-x-4">
                        <div className="w-8 h-8">
                          <img
                            className="w-full h-full"
                            alt="logo"
                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-center">
                          <p className="text-lg leading-6 font-semibold text-gray-800">
                            Giao hàng nhanh
                            <br />
                            <span className="font-normal">
                              Vận chuyển trong vòng 3 ngày
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold leading-6 text-gray-800">
                        {orderDetail.order.parcel.price}VND
                      </p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                        Xem thêm về hình thức vận chuyển
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl px-8 xl:px-16 mx-auto bg-white">
            <h1 className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800 mb-5 mt-5">
              Thông tin vận chuyển
            </h1>
            <ol className="relative border-s border-gray-500">
              <li className="mb-5 ms-4">
                <div className="absolute w-3 h-3 bg-orange_cus-500 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                  {orderDetail.order.order_date.substr(0,10)}
                </time>
                <h3 className="text-lg font-semibold text-gray-900">
                  Xác nhận đơn hàng tại điểm giao dịch
                  <span className="text-red-500"> {branchName}</span>
                </h3>
                <p>Nhân viên tạo đơn: {orderDetail.order.employee.fullName}</p>
              </li>
              {!isLoadingPath && pathOrder.path.map((deli) => {
                return (
                  deli.delivery.receive_date != null && (
                    <li className="mb-5 ms-4" key={deli.delivery.delivery_id}>
                      <div className="absolute w-3 h-3 bg-orange_cus-500 rounded-full mt-1.5 -start-1.5 border border-white  "></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-400 ">
                        {deli.delivery.receive_date}
                      </time>
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        Đơn hàng đã tới{" "}
                        {deli.receiver.is_hub ? "kho " : "điểm giao dịch "}
                        <span className="text-red-500">
                          {" "}
                          {deli.receiver.branch_name}
                        </span>
                      </h3>
                    </li>
                  )
                );
              })}
              {pathOrder.done && isFound && (
                <li className="mb-5 ms-4">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -start-1.5 border border-white  "></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 ">
                    {pathOrder.receiveDate}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    Giao hàng thành công
                  </h3>
                </li>
              )}
            </ol>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl px-8 xl:px-16 mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col mt-5">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Không tìm thấy đơn hàng với mã #{id}
            </h1>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SearchPage;
