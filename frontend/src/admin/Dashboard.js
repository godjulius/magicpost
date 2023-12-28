// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [branchId, setBranchId] = useState();
  const [myLineChart, setMyLineChart] = useState(null);

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

  
  const [branchs, setBranchs] = useState([]);
  // const [isLoadingBranchsList, setIsLoadingBranchsList] = useState(true);
  
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
  
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleBranchChange = (event) => {
    const newBranchId = event.target.value;
    setSelectedBranch(newBranchId);
    // Gọi hàm để cập nhật dữ liệu biểu đồ cho chi nhánh mới
    // (Bạn cần triển khai hàm này dựa trên cách bạn lấy và xử lý dữ liệu thống kê)
    // updateChartDataForBranch(newBranchId);
  };

  const [receiveItems, setReceiveItems] = useState([]);
  const [sendItems, setSendItems] = useState([]);

  useEffect(() => {
    if (selectedBranch !== null) {
      const fetchMonthlyData = async () => {
        try {
          const responseReceive = await axios.get(
            `http://localhost:3000/branch/${selectedBranch}/receive`,
            {
              withCredentials: true,
            }
          );

          const responseSend = await axios.get(
            `http://localhost:3000/branch/${selectedBranch}/send`,
            {
              withCredentials: true,
            }
          );

          // console.log(responseSend.data)
          // console.log(responseReceive.data)

          setReceiveItems(responseReceive.data);
          setSendItems(responseSend.data);

          // setMonthlyData(exampleData);
        } catch (error) {
          console.error("Error fetching monthly data:", error);
        }
      };

      fetchMonthlyData();
    }
  }, [selectedBranch]); // useEffect will run after the component is rendered

  const [monthlyData, setMonthlyData] = useState([]);

  const tempData = [];

  const getTempData = () => {
    receiveItems.forEach((item) => {
      const currentDate = new Date(item.receive_date);
      // console.log("currentDate", currentDate);
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const existingMonth = tempData.find(
        (data) => data.month === month && data.year === year
      );

      if (existingMonth) {
        // Nếu tháng đã tồn tại, tăng giá trị itemsReceived
        existingMonth.itemsReceived += 1;
      } else {
        // Nếu tháng chưa tồn tại, thêm vào mảng
        tempData.push({
          month,
          year,
          itemsReceived: 1,
          itemsSent: 0,
        });
      }
    });

    sendItems.forEach((item) => {
      const currentDate = new Date(item.send_date);
      // console.log(currentDate)
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const existingMonth = tempData.find(
        (data) => data.month === month && data.year === year
      );

      if (existingMonth) {
        // Nếu tháng đã tồn tại, tăng giá trị itemsSent
        existingMonth.itemsSent += 1;
      } else {
        tempData.push({
          month,
          year,
          itemsReceived: 0,
          itemsSent: 1,
        });
      }
    });
  };

  const getMonthLabel = (month) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthNames[month - 1] || ""; // Trừ 1 vì mảng bắt đầu từ 0
  };

  let exampleData = Array.from({ length: 12 }, (_, monthIndex) => ({
    label: getMonthLabel(monthIndex + 1), // Tháng bắt đầu từ 1
    itemsSent: 0,
    itemsReceived: 0,
  }));

  useEffect(() => {
    getTempData();

    // console.log(exampleData);

    tempData.forEach((item) => {
      exampleData[item.month - 1].itemsReceived = item.itemsReceived;
      exampleData[item.month - 1].itemsSent = item.itemsSent;
    });

    setMonthlyData(exampleData);
  }, [receiveItems, sendItems]);

  const createChart = () => {
    const ctx = document.getElementById("chart").getContext("2d");

    // Kiểm tra xem biểu đồ đã tồn tại chưa
    if (myLineChart) {
      myLineChart.destroy(); // Nếu tồn tại, hủy biểu đồ cũ
    }

    // Tạo biểu đồ mới
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthlyData.map((item) => item.label),
        datasets: [
          {
            label: "Items Sent",
            data: monthlyData.map((item) => item.itemsSent),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            lineTension: 0.4, // Adjust the line tension for curvature
          },
          {
            label: "Items Received",
            data: monthlyData.map((item) => item.itemsReceived),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            lineTension: 0.4, // Adjust the line tension for curvature
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            labels: monthlyData.map((item) => item.label),
            maxBarThickness: 30,
            grid: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          },
          y: {
            type: "linear", // Thay đổi từ "linear" thành "linear"
            beginAtZero: true,
            position: "left",
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
        },
      },
    });

    // Lưu thể hiện mới của biểu đồ vào biến trạng thái
    setMyLineChart(newChart);
  };

  useEffect(() => {
    // Gọi hàm tạo biểu đồ khi monthlyData thay đổi
    createChart();
  }, [monthlyData]);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col font-custom-sans-serif">
      <main className="w-full flex-grow p-6">
        <div className="w-full lg:w-4/5 pl-0 lg:pl-2 mt-12 lg:mt-0 overflow-auto">
          <h1 className="text-2xl pb-3 items-center font-bold mb-4">
            Thống kê hàng tháng
          </h1>
          <div className="p-6 bg-white">
            <label htmlFor="branchSelect" className="mb-2 text-sm font-medium text-gray-900 pr-2">
              Chọn chi nhánh:
            </label>
            <select
              id="branchSelect"
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"

              onChange={handleBranchChange}
              value={selectedBranch || ""}
            >
              <option value="" disabled>
                Chọn chi nhánh
              </option>
              {branchs.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
            <canvas id="chart" width="300" height="120"></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
