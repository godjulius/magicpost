import React from "react";
// import LogoVPN from "../../public/assets/Logo.svg";
// import Facebook from "../../public/assets/Icon/facebook.svg";
// import Twitter from "../../public/assets/Icon/twitter.svg";
// import Instagram from "../../public/assets/Icon/instagram.svg";
const Footer = () => {
  return (
    <div className="bg-white-300 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          {/* <LogoVPN className="h-8 w-auto mb-6" /> */}
          <img src="./asset/Logo.png" className="h-16 w-auto mb-6"></img>
          <p className="mb-4">
            <strong className="font-medium">MagicPost</strong> Dịch vụ chuyển
            phát nhanh uy tín, chuyên nghiệp hàng đầu tại Việt Nam
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              {/* <Facebook className="h-6 w-6" /> */}
              <img src="./asset/facebook.svg" className="h-6 w-6"></img>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              {/* <Twitter className="h-6 w-6" /> */}
              <img src="./asset/twitter.svg" className="h-6 w-6"></img>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              {/* <Instagram className="h-6 w-6" /> */}
              <img src="./asset/instagram.svg" className="h-6 w-6"></img>
            </div>
          </div>
          <p className="text-gray-400">
            ©{new Date().getFullYear()} - MagicPost
          </p>
        </div>
        <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">About</p>
          <ul className="text-black-500 mr-4">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Lịch sử hình thành{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tuyển dụng{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tầm nhìn sứ mệnh{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Bảo mật{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Thông tin{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Blog{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Tra cứu</p>
          <ul className="text-black-500 mr-4">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tra cứu bưu gửi{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Ước tính cước{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tra cứu bưu cục{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Thông tin gửi hàng quốc tế{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Dịch vụ</p>
          <ul className="text-black-500 mr-4">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Dịch vụ quốc tế{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Dịch vụ Logistics{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Thương mại điện tử{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
