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

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  // let updatedOrder = orders.filter(
  //   (order) =>
  //     order.status_id === 2 &&
  //     order.parcel.branch_id === branchId
  //     // order.branch_id === branchId &&
  // );

  // console.log(updatedOrder);

  let updatedOrder = [];

  orders.forEach((order) => {
    let shouldIncludeOrder = false;
  
    deliveries.forEach((delivery) => {
      if (order.parcel.branch_id === branchId && delivery.order_id === order.order_id) {
        if (delivery.receiver_id === branchId && delivery.receive_date !== null) {
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
        {/* <div className="flex mb-4 justify-center">
          <button
            className={`flex-1 max-w-xs py-2 px-4 text-lg border rounded-md ${
              currentTab === "tab1" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("tab1")}
          >
            Gửi đơn hàng lên điểm tập kết
          </button>
          <button
            className={`flex-1 max-w-xs py-2 px-4 text-lg border rounded-md ${
              currentTab === "tab2" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("tab2")}
          >
            Nhận đơn hàng từ điểm tập kết
          </button>
        </div> */}

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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên khách hàng
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã vận chuyển
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
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hoàn trả đơn hàng
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
                        {order.customer.last_name +
                          " " +
                          order.customer.first_name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.delivery_id}
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
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                          <Link
                            // to={`/BranchEmployee/BranchTransshipment/${order.delivery_id}`}
                          >
                            Hoàn trả
                          </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
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
