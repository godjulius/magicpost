import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateAccount() {
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Update days when the month or year changes
    const updateDays = () => {
      const selectedMonth = parseInt(formData.month, 10);
      const selectedYear = parseInt(formData.year, 10);

      let daysInMonth = 31;

      if (selectedMonth === 2) {
        // Check for leap year
        daysInMonth = (selectedYear % 4 === 0 && selectedYear % 100 !== 0) || selectedYear % 400 === 0 ? 29 : 28;
      } else if ([4, 6, 9, 11].includes(selectedMonth)) {
        daysInMonth = 30;
      }

      setDaysInMonth(daysInMonth);
    };

    updateDays();
  }, [formData.month, formData.year]);

  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setAddress(response.data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
          "http://localhost:3000/employee/create",
          formData
        );
        console.log("Registration successful:", response.data);
        alert("Registration successful");
        window.location.href = "/admin/AccountManagement";
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <section className="bg-gray-100 w-full h-screen overflow-x-hidden mt-8 mb-8 font-custom-sans-serif">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create new account
            </h1>
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
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  // value={formData.email}
                  onChange={handleChange}
                  required=""
                />
              </div>
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
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Phone Number"
                  // value={formData.phone}
                  onChange={handleChange}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
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
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
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
                  {address.map((address) => (
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
                <div className="md:flex space-x-2">
                  
                  <div className="flex-1">
                    <select
                      id="year"
                      name="year"
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      // value={formData.year}
                      onChange={handleChange}
                      required=""
                      defaultValue="Year"
                    >
                      <option value="" disabled>
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
                  <div className="flex-1">
                    <select
                      id="month"
                      name="month"
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      // value={formData.month}
                      onChange={handleChange}
                      required=""
                      defaultValue="Month"
                    >
                      <option value="" disabled>
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
                      defaultValue="Day"
                    >
                      <option value="" disabled>
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

export default CreateAccount;

