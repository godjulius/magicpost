import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const BranchTransshipment = () => {
  const { orderId } = useParams();

  const orderForm = {
    orderId: orderId,
    receiverId: "",
  };


  // const submitURL = `http://localhost:3000/delivery/${deliveryId}/transshipment`;

  const submitURL = "http://localhost:3000/delivery/create";

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

  const navigate = useNavigate;
  //   console.log(submitURL);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order",
        {
          withCredentials: true,
        });
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
        const response = await axios.get("http://localhost:3000/branch",
        {
          withCredentials: true,
        });
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
      if (order.order_id === orderId) {
        result = order.customer.last_name + " " + order.customer.first_name;
      }
    });
    return " " + result;
  };

  const getOrderId = () => {
    return " " + orderId;
  };

  const getBranchName = () => {
    var result = "";
    branchs.forEach((branch) => {
      if (branch.branch_id === branchId) {
        result = branch.branch_name;
      }
    });
    return " " + result;
  };

  const getHubName = () => {
    var result = "";
    var tempHubId = "";

    branchs.forEach((branch) => {
      if (branch.branch_id === branchId) {
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
      if (order.order_id === orderId) {
        result = order.parcel.weight;
      }
    });

    return " " + result;
  };

  const getPrice = () => {
    var result = "";

    orders.forEach((order) => {
      if (order.order_id === orderId) {
        result = order.parcel.price;
      }
    });

    return " " + result;
  };

  const getParcelId = () => {
    var result = "";
    orders.forEach((order) => {
      if (order.order_id === orderId) {
        result = order.parcel.parcel_id;
      }
    });

    return " " + result;
  }

  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(submitURL, orderForm,
        {
          withCredentials: true,
        });
      setShowNotification(true);
      console.log(response.data);
      console.log("Submit success", response.data);
      // navigate("../BranchOrderManagement")
    } catch (err) {
      console.error("Submit fail", err.response.data);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col font-custom-sans-serif">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Vận chuyển đơn hàng</h1>
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="w-full my-6 pr-0 lg:pr-2 font-custom-sans-serif">
            <div className="leading-loose p-10 bg-white rounded shadow-xl flex flex-wrap sm:flex-row">
              {/* Cột thứ nhất */}
              <div className="w-full sm:w-1/2 pr-4">
                <p className="text-gray-900 whitespace-no-wrap">
                  Tên khách hàng: {getCustomerName()}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Mã đơn hàng: {getOrderId()}
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Cân nặng: {getWeight()} g
                </p>
                <p className="text-gray-900 whitespace-no-wrap">
                  Giá tiền: {getPrice()} VND
                </p>
                {/* Thêm thông tin cần hiển thị ở cột thứ nhất */}
              </div>

              {/* Cột thứ hai */}
              <div className="w-full sm:w-1/2 pr-4">
                <p className="text-gray-900 whitespace-no-wrap">
                  Mã bưu kiện: {getParcelId()}
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

            {showNotification && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 p-6 rounded shadow-xl border border-gray-500">
                <p>Gửi hàng đến điểm tập kết thành công!</p>
                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mx-auto block"
                  onClick={() => setShowNotification(false)}
                >
                  <Link to="../BranchOrderManagement">Đóng</Link>
                </button>
              </div>
            )}

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
