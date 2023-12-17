import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BranchTransshipment = () => {
  const orderForm = {
    receiverId: "",
    employeeId: parseInt(localStorage.getItem("employeeId")),
  };

  const { deliveryId } = useParams();
  //   console.log(deliveryId);

  const temp = parseInt(deliveryId);
  //   console.log(temp);

  const submitURL = `http://127.0.0.1:3000/delivery/${deliveryId}/transshipment`;
  //   console.log(submitURL);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/order");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  const [branchs, setBranchs] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/branch");
        setBranchs(response.data);
      } catch (error) {
        console.error("Error fetching branchs", error);
      }
    };

    fetchOrders();
  }, []);

  const getCustomerName = () => {
    var result = "";
    orders.forEach((order) => {
      if (order.delivery_id === temp) {
        result = order.customer.last_name + " " + order.customer.first_name;
      }
    });
    return " " + result;
  };

  const getOrderId = () => {
    var result = "";
    orders.forEach((order) => {
      if (order.delivery_id === temp) {
        result = order.order_id;
      }
    });
    return " " + result;
  };

  const getBranchName = () => {
    var result = "";
    branchs.forEach((branch) => {
      if (branch.branch_id === parseInt(localStorage.getItem("branchId"))) {
        result = branch.branch_name;
      }
    });
    return " " + result;
  };

  const getHubName = () => {
    var result = "";
    var tempHubId = "";

    branchs.forEach((branch) => {
      if (branch.branch_id === parseInt(localStorage.getItem("branchId"))) {
        tempHubId = branch.hub_id;
      }
    });

    branchs.forEach((branch) => {
      if (branch.branch_id === tempHubId) {
        result = branch.branch_name;
      }
    });

    orderForm.receiverId = tempHubId;

    return " " + result;
  };

  const getWeight = () => {
    var result = "";

    orders.forEach((order) => {
      if (order.delivery_id === temp) {
        result = order.parcel.weight;
      }
    });

    return " " + result;
  };

  const getPrice = () => {
    var result = "";

    orders.forEach((order) => {
      if (order.delivery_id === temp) {
        result = order.parcel.price;
      }
    });

    return " " + result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(submitURL, orderForm);
    //   console.log(response.data);
    //   console.log("Submit success", response.data);
    } catch (err) {
    //   console.error("Submit fail", err.response.data);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col font-custom-sans-serif">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Vận chuyển đơn hàng</h1>
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="w-full my-6 pr-0 lg:pr-2 font-custom-sans-serif">
            <div className="leading-loose p-10 bg-white rounded shadow-xl flex">
              {/* Cột thứ nhất */}
              <div className="w-1/2 pr-4">
                <p className="text-gray-900 whitespace-no-wrap">
                  Tên khách hàng: {getCustomerName()}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Mã đơn hàng: {getOrderId()}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Cân nặng: {getWeight()}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Giá tiền: {getPrice()}
                </p>
                {/* Thêm thông tin cần hiển thị ở cột thứ nhất */}
              </div>

              {/* Cột thứ hai */}
              <div className="w-1/2 pl-4">
                <p className="text-gray-900 whitespace-no-wrap">
                  Mã vận chuyển: {" " + deliveryId}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Chi nhánh gửi: {getBranchName()}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Chi nhánh nhận: {getHubName()}
                </p>
                {/* Thêm thông tin cần hiển thị ở cột thứ hai */}
              </div>
            </div>
            {/* Nút xác nhận */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Xác nhận gửi hàng
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BranchTransshipment;
