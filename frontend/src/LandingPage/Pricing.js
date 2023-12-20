import React, { useMemo } from "react";
// import Image from "next/image";
// import Testimoni from "./Testimoni";
// import ButtonPrimary from "./misc/ButtonPrimary";
import ButtonOutline from "./misc/ButtonOutline.";
// import Maps from "../HugeGlobal.svg";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-white_cus-300 to-white_cus-500 w-full py-14"
      id="dichvu"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black_cus-600 leading-relaxed"
            >
              Các dịch vụ của chúng tôi
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
            >
              Chúng tôi cung cấp đa dạng các loại dịch vụ phù hợp với mọi nhu
              cầu của bạn
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray_cus-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  {/* <Image
                    src="/assets/Free.png"
                    width={145}
                    height={165}
                    alt="Free Plan"
                  /> */}
                  <img
                    src="./asset/Free.png"
                    width={145}
                    height={165}
                    alt="Free Plan"
                  ></img>
                </div>
                <p className="text-lg text-black_cus-600 font-medium capitalize my-2 sm:my-7">
                  MP Tài liệu
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black_cus-500 flex-grow">
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p className="text-2xl text-black_cus-600 text-center mb-4 ">
                    5VND <span className="text-black_cus-500">/ đơn</span>
                  </p>
                  <ButtonOutline>Select</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray_cus-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  {/* <Image
                    src="/assets/Standard.png"
                    width={145}
                    height={165}
                    alt="Standard Plan"
                  /> */}
                  <img
                    src="./asset/Standard.png"
                    width={145}
                    height={165}
                    alt="Standard Plan"
                  ></img>
                </div>
                <p className="text-lg text-black_cus-600 font-medium capitalize my-2 sm:my-7">
                  MP Bưu phẩm{" "}
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black_cus-500 flex-grow">
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla{" "}
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p className="text-2xl text-black_cus-600 text-center mb-4 ">
                    10VND <span className="text-black_cus-500">/ đơn</span>
                  </p>
                  <ButtonOutline>Select</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray_cus-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  {/* <Image
                    src="/assets/Premium.png"
                    width={145}
                    height={165}
                    alt="Premium Plan"
                  /> */}
                  <img
                    src="./asset/Premium.png"
                    width={145}
                    height={165}
                    alt="Premium Plan"
                  ></img>
                </div>
                <p className="text-lg text-black_cus-600 font-medium capitalize my-2 sm:my-7">
                  MP Hỏa Tốc{" "}
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black_cus-500 flex-grow">
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla
                  </li>
                  <li className="relative check custom-list my-2">
                    Gioi thieu bla bla bla bla{" "}
                  </li>
                  <li className="relative check custom-list my-2">
                  Gioi thieu bla bla bla bla{" "}
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p className="text-2xl text-black_cus-600 text-center mb-4 ">
                    100VND <span className="text-black_cus-500">/ đơn</span>
                  </p>

                  <ButtonOutline>Select</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <div className="flex flex-col w-full my-16">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black_cus-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto"
            >
              Chuyển phát nhanh toàn cầu{" "}
            </motion.h3>
            <motion.p
              className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12"
              variants={scrollAnimation}
            >
              Chuyển đơn hàng của bạn đến mọi nơi bạn muốn một cách an toàn và nhanh nhất
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div
              className="py-12 w-full px-8 mt-16"
              variants={scrollAnimation}
            >
              {/* <Maps className="w-full h-auto" /> */}
              <img src="./asset/HugeGlobal.svg" alt="Huge Global" />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div
              className="w-full flex justify-evenly items-center mt-4 flex-wrap lg:flex-nowrap"
              variants={scrollAnimation}
            >
              {/* <Netflix className="h-18 w-auto" /> */}
              <img
                src="/asset/amazon.png"
                className="h-14 w-auto mt-4 lg:mt-2"
                alt=""
              />
              <img
                src="/asset/netflix.png"
                className="h-14 w-auto mt-2 lg:mt-0"
                alt=""
              />
              <img
                src="/asset/reddit.png"
                className="h-12 w-auto mt-2 lg:mt-0"
                alt=""
              />
              <img
                src="/asset/discord.png"
                className="h-14 w-auto mt-2 lg:mt-0"
                alt=""
              />
              <img
                src="/asset/spotify.png"
                className="h-12 w-auto mt-2 lg:mt-0"
                alt=""
              />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
        {/* <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black_cus-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto"
            >
              Trusted by Thousands of Happy Customer{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the stories of our customers who have joined us with
              great pleasure when using this crazy feature.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              <Testimoni />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{ duration: 3 }}>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h5 className="text-black_cus-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Subscribe Now for <br /> Get Special Features!
                  </h5>
                  <p>Let's subscribe with us and find the fun.</p>
                </div>
                <ButtonPrimary>Get Started</ButtonPrimary>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
              ></div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div> */}
      </div>
    </div>
  );
};

export default Pricing;
