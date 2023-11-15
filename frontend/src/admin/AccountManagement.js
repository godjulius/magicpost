import React, { useState } from "react";

const AccountManagement = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "John Doe",
      role: "Admin",
      createdAt: "2023-01-01",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      username: "Jane Doe",
      role: "User",
      createdAt: "2023-02-01",
      email: "jane@example.com",
      status: "Inactive",
    },
    {
      id: 3,
      username: "Bob Smith",
      role: "User",
      createdAt: "2023-03-01",
      email: "bob@example.com",
      status: "Active",
    },
    {
      id: 4,
      username: "Alice Johnson",
      role: "Admin",
      createdAt: "2023-04-01",
      email: "alice@example.com",
      status: "Inactive",
    },
    {
      id: 5,
      username: "Eve Williams",
      role: "User",
      createdAt: "2023-05-01",
      email: "eve@example.com",
      status: "Active",
    },
    {
      id: 6,
      username: "New User 1",
      role: "User",
      createdAt: "2023-06-01",
      email: "newuser1@example.com",
      status: "Active",
    },
    {
      id: 7,
      username: "New User 2",
      role: "Admin",
      createdAt: "2023-07-01",
      email: "newuser2@example.com",
      status: "Inactive",
    },
    {
      id: 8,
      username: "New User 3",
      role: "User",
      createdAt: "2023-08-01",
      email: "newuser3@example.com",
      status: "Active",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

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
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="antialiased font-sans bg-gray-200 min-h-screen">
      <div className="antialiased font-sans bg-gray-200">
        <div className="container mx-auto px-4 sm:px-8 py-8">
          <div>
            <h1 className="text-3xl font-semibold mb-4">User Table</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 mb-4 rounded-full">
              Create New Account
            </button>
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
              <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
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
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={
                        user.status === "Active" ? "bg-green-100" : "bg-red-100"
                      }
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.username}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.role}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.createdAt}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${
                            user.status === "Active"
                              ? "text-green-900"
                              : "text-red-900"
                          } leading-tight`}
                        >
                          <span
                            aria-hidden=""
                            className={`absolute inset-0 ${
                              user.status === "Active"
                                ? "bg-green-200"
                                : "bg-red-200"
                            } opacity-50 rounded-full`}
                          />
                          <span className="relative">{user.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {totalItems > 0 ? startIndex + 1 : 0} to{" "}
                  {Math.min(endIndex, totalItems)} of {totalItems} Accounts
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
