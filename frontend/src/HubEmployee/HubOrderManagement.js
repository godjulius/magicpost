import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HubOrderManagement = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deliveryItems, setDeliveryItems] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigate = useNavigate();

  const [isLoadingDeliveryItemsList, setIsLoadingDeliveryItemsList] =
    useState(true);

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

  useEffect(() => {
    const fetchDeliveryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/delivery", {
          withCredentials: true,
        });
        // console.log(response.data);
        setDeliveryItems(response.data);
      } catch (error) {
        console.error("Error fetching deliveryItems:", error);
      } finally {
        setIsLoadingDeliveryItemsList(false);
      }
    };

    fetchDeliveryItems();
  }, [forceUpdate]);

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

  const [currentPage, setCurrentPage] = useState(1);

  const updatedDeliveryItems = deliveryItems.filter(
    (delivery) =>
      delivery.receiver_id === branchId && delivery.receive_date === null
  );

  const handleConfirmDelivery = async (deliveryId) => {
    try {
      // Gửi yêu cầu API để cập nhật trạng thái của đơn hàng
      const response = await axios.post(
        `http://localhost:3000/delivery/${deliveryId}/receive`,
        {},
        {
          withCredentials: true,
        }
      );

      // navigate("../HubOrderManagement")
      setForceUpdate((prev) => !prev);

      console.log("Registration successful:", response.data);

      console.log(`Delivery ${deliveryId} has been confirmed.`);
    } catch (error) {
      console.error(`Error confirming delivery ${deliveryId}:`, error);
    }
  };

  const totalItems = updatedDeliveryItems.length;
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
  const currentDeliveryItems = updatedDeliveryItems.slice(startIndex, endIndex);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col font-custom-sans-serif">
      <main className="w-full flex-grow p-6">
        <div>
          <h1 className="text-3xl font-semibold mb-4">
            Đơn hàng đang tới
          </h1>
        </div>
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
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="bg-white overflow-auto">
            <table className="min-w-full bg-white leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Chi nhánh gửi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Chi nhánh nhận
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày gửi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Xác nhận đơn hàng đã đến
                  </th>
                  {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delete
                  </th> */}
                </tr>
              </thead>
              {isLoadingDeliveryItemsList || (
                <tbody>
                  {currentDeliveryItems.map((delivery) => (
                    <tr key={delivery.delivery_id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {delivery.order_id}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {branchs.map((branch) =>
                            branch.branch_id === delivery.sender_id
                              ? branch.branch_name
                              : ""
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {branchs.map((branch) =>
                            branch.branch_id === delivery.receiver_id
                              ? branch.branch_name
                              : ""
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {delivery.send_date}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Đang giao(nhớ sửa code)
                          {/* {delivery.status_id} */}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() =>
                            handleConfirmDelivery(delivery.delivery_id)
                          }
                          className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-2"
                        >
                          Xác nhận
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
              {Math.min(endIndex, totalItems)} of {totalItems} DeliveryItems
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
        </div>
      </main>
    </div>
  );
};

export default HubOrderManagement;
