import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BranchCurrentOrder = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [branchId, setBranchId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getData", {
          withCredentials: true,
        });
        setBranchId(response.data.branchId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // useEffect sẽ chạy sau khi component được render

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order", {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/delivery", {
          withCredentials: true,
        });
        setDeliveries(response.data);
      } catch (error) {
        console.error("Error fetching deliveries", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliveries();
  }, []);
  

  const [selectedOrder, setSelectedOrder] = useState(null);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  let updatedOrder = [];

  orders.forEach((order) => {
    let shouldIncludeOrder = false;

    deliveries.forEach((delivery) => {
      if (
        order.parcel.branch_id === branchId &&
        delivery.order_id === order.order_id
      ) {
        if (
          delivery.receiver_id === branchId &&
          delivery.receive_date !== null
        ) {
          shouldIncludeOrder = true;
        } else if (delivery.sender_id === branchId) {
          shouldIncludeOrder = false;
        }
      }
    });

    if (shouldIncludeOrder) {
      updatedOrder.push(order);
    }
  });

  const totalItems = updatedOrder.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing itemsPerPage
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = updatedOrder.slice(startIndex, endIndex);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col font-custom-sans-serif">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">
          Danh sách đơn hàng hiện tại
        </h1>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* {Đơn hàng chuyển từ điểm giao dịch lên điểm tập kết} */}
        <div></div>
        <div className="bg-white overflow-auto">
          <table className="min-w-full lg:divide-y lg:divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên người nhận
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Địa chỉ người nhận
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã bưu kiện
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã nhân viên
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chuyển đơn cho người nhận
                </th>
                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hoàn trả đơn hàng
                </th> */}
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chi tiết đơn hàng
                </th>
              </tr>
            </thead>

            {isLoading || (
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.order_id}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.receiver_name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.receiver_address}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.parcel_id}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.employee_id}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        <Link
                        // to={`/BranchEmployee/BranchTransshipment/${order.delivery_id}`}
                        >
                          Vận chuyển
                        </Link>
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => showOrderDetails(order)}
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      >
                        Chi tiết
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            )}
          </table>
            {selectedOrder && (
              <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-[600px]">
                  <div className="mb-4 flex items-center">
                    <h2 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl flex-1">
                      Thông tin đơn hàng
                    </h2>
                    <button
                      type="button"
                      onClick={closeOrderDetails}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                    </button>
                  </div>
                  <p>
                    <strong>Mã đơn hàng:</strong>{" "}
                    {selectedOrder.order_id}
                  </p>
                  <p>
                    <strong>Tên người nhận:</strong>{" "}
                    {selectedOrder.receiver_name}
                  </p>
                  <p>
                    <strong>Số điện thoại người nhận:</strong>{" "}
                    {selectedOrder.receiver_phone}
                  </p>
                  <p>
                    <strong>Địa chỉ người nhận:</strong>{" "}
                    {selectedOrder.receiver_address}
                  </p>
                  <p>
                    <strong>Cân nặng:</strong>{" "}
                    {selectedOrder.parcel.weight}
                  </p>
                  <p>
                    <strong>Giá tiền:</strong>{" "}
                    {selectedOrder.parcel.price}
                  </p>
                  {/* Nút xác nhận đơn hàng đã đến tay người dùng */}
                  <div className="flex flex-col sm:flex-row justify-center mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-2 sm:mr-2 sm:mb-0"
                      // onClick={() =>
                      //   handleConfirmDelivery(selectedOrder.order_id)
                      // }
                    >
                      Xác nhận đã giao
                    </button>

                    {/* Nút hoàn trả đơn hàng */}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                      // onClick={() =>
                      //   handleRejectOrder(selectedOrder.order_id)
                      // }
                    >
                      Hoàn trả đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {totalItems > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(endIndex, totalItems)} of {totalItems} Orders
          </span>
          <div className="inline-flex mt-2 xs:mt-0 pb-6">
            <button
              onClick={handlePrevPage}
              className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r ${
                currentPage === totalPages ? "cursor-not-allowed" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BranchCurrentOrder;
