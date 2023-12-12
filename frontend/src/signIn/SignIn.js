import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const apiSignInUrl = "http://127.0.0.1:3000/login";

export default function SignIn() {

  localStorage.setItem("userRole", null);
  localStorage.setItem("branchId", null);

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null); // Thêm state để theo dõi lỗi đăng nhập
  const navigate = useNavigate();

  const handleChange = (event) => {
    const temp = {
      ...account,
      [event.target.name]: event.target.value,
    };
    setAccount(temp);
    setLoginError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Kiểm tra tài khoản tồn tại trên API
      const response = await axios.post(apiSignInUrl, account);

      console.log(response.data.employee.role_id); // Xem tài khoản là role nào

      // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
      localStorage.setItem("userRole", response.data.employee.role_id);
      localStorage.setItem("branchId", response.data.employee.branch_id);

      console.log(localStorage.getItem("userRole"));
      
      // Nếu tài khoản tồn tại, kiểm tra role
      switch (response.data.employee.role_id) {
        case 1:
          // Chuyển hướng đến trang admin
          navigate("/admin");
          break;
        case 3:
          // Xử lý cho role_id = 3
          navigate("/HubManager");
          // ...
          break;
        case 4:
          // Xử lý cho role_id = 4
          navigate("/HubEmployee");
          // ...
          break;
        case 5:
          // Xử lý cho role_id = 5
          navigate("/BranchManager");
          // ...
          break;
        case 6:
          // Xử lý cho role_id = 6
          navigate("/BranchEmployee");
          // ...
          break;
        default:
          console.error("Unauthorized access: Invalid role");
      }

      // Reset trạng thái và thông báo lỗi khi đăng nhập thành công
      setLoginError(null);
    } catch (err) {
      // console.error("Submit fail", err.response.data);

      setLoginError("Tài khoản hoặc mật khẩu chưa chính xác.");

      // Hiển thị thông báo tài khoản không tồn tại hoặc xử lý tương ứng
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img
              className="mx-auto w-40 h-auto"
              src="./asset/Logo.png"
              alt="Your Company"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng nhập vào tài khoản của bạn
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                                    <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </Link>
                                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-2 text-center">
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
                                font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p> */}
        </div>
      </div>
    </>
  );
}
