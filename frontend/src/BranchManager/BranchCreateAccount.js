import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function BranchCreateAccount() {
  const [daysInMonth, setDaysInMonth] = useState(31);
  const navigate = useNavigate();
  const [createAccountError, setCreateAccountError] = useState(null); // Thêm state để theo dõi lỗi đăng nhập
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Thêm state để theo dõi sự trùng khớp của mật khẩu

  // Thêm state cho checkbox
  const [showPassword, setShowPassword] = useState(false);

  // Hàm xử lý sự kiện thay đổi của checkbox
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [branchId, setBranchId] = useState();
  useEffect(() => {
    // Lấy thông tin từ localStorage
    const temp = localStorage.getItem("branchId");
    setBranchId(temp)

  }, []); // useEffect sẽ chạy sau khi component được render

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    roleId: "",
    branchId: "",
    phone: "",
    address: "",
  });

  // Thêm tham chiếu cho ô nhập phone
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // State để theo dõi việc có lỗi hay không
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    // Kiểm tra khi có lỗi
    if (createAccountError === "Email is already existed!") {
      // Đặt focus vào ô nhập email
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }

      // Đặt state để thêm lớp (class)
      setEmailError(true);
    } else if (createAccountError === "Phone is already existed!") {
      // Đặt focus vào ô nhập phone
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }

      // Đặt state để thêm lớp (class)
      setPhoneError(true);
    } else {
      // Nếu không có lỗi, xóa lớp (class) và đặt lại state
      setEmailError(false);
      setPhoneError(false);
    }
  }, [createAccountError]);

  useEffect(() => {
    // Update days when the month or year changes
    const updateDays = () => {
      const selectedMonth = parseInt(formData.month, 10);
      const selectedYear = parseInt(formData.year, 10);

      let daysInMonth = 31;

      if (selectedMonth === 2) {
        // Check for leap year
        daysInMonth =
          (selectedYear % 4 === 0 && selectedYear % 100 !== 0) ||
          selectedYear % 400 === 0
            ? 29
            : 28;
      } else if ([4, 6, 9, 11].includes(selectedMonth)) {
        daysInMonth = 30;
      }

      setDaysInMonth(daysInMonth);
    };

    updateDays();
  }, [formData.month, formData.year]);

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/role",
        {
          withCredentials: true,
        });
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const [branchs, setBranchs] = useState([]);

  useEffect(() => {
    const fetchBranchs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/branch",
        {
          withCredentials: true,
        });
        setBranchs(response.data);
      } catch (error) {
        console.error("Error fetching branchs:", error);
      }
    };

    fetchBranchs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setCreateAccountError(null);

    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      if (formData.password !== "" && formData.confirmPassword !== "") {
        const { value } = e.target;

        // Kiểm tra sự trùng khớp và cập nhật state
        setPasswordsMatch(
          value === formData.password || value === formData.confirmPassword
        );
      }
    }
  };

  // const handlePasswordChange = (e) => {
  //   const { value } = e.target;

  //   setFormData({
  //     ...formData,
  //     password: value,
  //   });

  //   // Đặt trạng thái passwordChanged thành true khi mật khẩu thay đổi
  //   setPasswordChanged(true);
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   const { value } = e.target;

  //   // Kiểm tra sự trùng khớp và cập nhật state
  //   setPasswordsMatch(value === formData.password);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (passwordsMatch) {
        const response = await axios.post(
          "http://localhost:3000/employee/create",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("Registration successful:", response.data);
        // console.log(response.data.msg + " " + passwordsMatch);
        setCreateAccountError(response.data.msg);
        // console.log(createAccountError);

        if (response.data.msg === "Create account successfully!") {
          alert("Registration successful");
          navigate("../BranchEmployeeManagement");
        }
      } else {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
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
                Create new account
              </h1>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <Link to="/BranchManager/BranchEmployeeManagement">
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
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="First Name"
                    // value={formData.firstName}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="md:ml-2">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Last Name"
                    // value={formData.lastName}
                    onChange={handleChange}
                    required=""
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailInputRef}
                  className={`bg-gray-100 border ${
                    emailError ? "border-red-500" : ""
                  } border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="name@company.com"
                  // value={formData.email}
                  onChange={handleChange}
                  required=""
                />
              </div>

              {emailError && (
                <p className="text-center text-red-600">{createAccountError}</p>
              )}

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  ref={phoneInputRef}
                  className={`bg-gray-100 border ${
                    phoneError ? "border-red-500" : ""
                  } border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Phone Number"
                  // value={formData.phone}
                  onChange={handleChange}
                  required=""
                />
              </div>

              {phoneError && (
                <p className="text-center text-red-600">{createAccountError}</p>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  // value={formData.password}
                  onChange={handleChange}
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  ref={passwordInputRef}
                  placeholder="••••••••"
                  className={`bg-gray-100 border ${
                    passwordsMatch ? "" : "border-red-500"
                  } border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  onChange={handleChange}
                  required=""
                />
              </div>

              {!passwordsMatch && (
                <p className="text-center text-red-600">
                  Password and Confirm Password do not match!
                </p>
              )}

              <div className="mb-4">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPassword}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-900">
                  Show password
                </label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="roleId"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  // value={formData.role}
                  onChange={handleChange}
                  required=""
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Select role
                  </option>
                  {roles.map(
                    (role) =>
                      role.role_id === 6 && (
                        <option key={role.role_id} value={role.role_id}>
                          {role.role_name}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="branch"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Branch
                </label>
                <select
                  id="branch"
                  name="branchId"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  // value={formData.branch}
                  onChange={handleChange}
                  required=""
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Select branch
                  </option>
                  {branchs.map(
                    (branch) =>
                      branch.branch_id === parseInt(branchId) && (
                        <option key={branch.branch_id} value={branch.branch_id}>
                          {branch.branch_name}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <select
                  id="address"
                  name="address"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  // value={formData.address}
                  onChange={handleChange}
                  required=""
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Select Address
                  </option>
                  {addresses.map((address) => (
                    <option key={address.code} value={address.name}>
                      {address.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="birthdate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Birth Date
                </label>
                <div className="md:flex">
                  <div className="flex-1 md:mr-4 md:mb-0 mb-3">
                    <select
                      id="year"
                      name="year"
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      // value={formData.year}
                      onChange={handleChange}
                      required=""
                      defaultValue="default"
                    >
                      <option value="default" disabled hidden>
                        Year
                      </option>
                      {Array.from({ length: 73 }, (_, i) => 1950 + i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex-1 md:mr-4 md:mb-0 mb-3">
                    <select
                      id="month"
                      name="month"
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      // value={formData.month}
                      onChange={handleChange}
                      required=""
                      defaultValue="default"
                    >
                      <option value="default" disabled hidden>
                        Month
                      </option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex-1">
                    <select
                      id="day"
                      name="day"
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      // value={formData.day}
                      onChange={handleChange}
                      required=""
                      defaultValue="default"
                    >
                      <option value="default" disabled hidden>
                        Day
                      </option>
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BranchCreateAccount;
