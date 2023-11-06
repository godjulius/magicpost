import './botHeader.css'
import React, { useState } from 'react';

function BotHeader() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (menuIndex) => {
    setActiveMenu(menuIndex);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const isMenuActive = (menuIndex) => {
    return activeMenu === menuIndex;
  };

  return (
    <div className="bottom-header">
      <div className="container-lg">
        <div className="wrapper-bottom-header">
          <div className="left-header">
            <a href="">
              <img className="no-select" src="./asset/Logo.png" alt="logo"></img>
            </a>
          </div>
          <div className="bot-right-header">
            <ul className="menu">
              <li><a href=''>Trang chủ</a></li>
              <li
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="/dich-vu-trong-nuoc/chuyen-phat-nhanh">
                  Dịch vụ 
                  <i className={`arrow ${isMenuActive(0) ? 'up' : 'down'}`}></i>
                </a>
                {isMenuActive(0) && (
                  <div className="sub-menu">
                    <div className="sub-menu-content d-flex justify-content-center">
                      <div className="sub-menu-item">
                        <div className="sub-menu-item-list d-flex flex-column">
                          <a href="/dich-vu-trong-nuoc/dich-vu-hoa-toc">Chuyển phát hỏa tốc</a>
                          <a href="/dich-vu-trong-nuoc/chuyen-phat-nhanh">Chuyển phát nhanh</a>
                          <a href="/dich-vu-trong-nuoc/chuyen-phat-tiet-kiem">Chuyển phát tiết kiệm</a>
                          <a href="/dich-vu-trong-nuoc/dich-vu-dac-biet">Dịch vụ đặc biệt</a>
                          <a href="/dich-vu-trong-nuoc/dich-vu-tron-goi">Dịch vụ trọn gói</a>
                          <a href="/dich-vu-trong-nuoc/dich-vu-cong-them/dich-vu-cong-them-trong-nuoc">Dịch vụ GTGT</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li 
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="/tra-cuu">
                  Tra cứu
                  <i className={`arrow ${isMenuActive(1) ? 'up' : 'down'}`}></i>
                </a>
                {isMenuActive(1) && (
                  <div className="sub-menu">
                    <div className="sub-menu-content d-flex justify-content-center">
                      <div className="sub-menu-item">
                        <div className="sub-menu-item-list d-flex flex-column">
                          <a href="/tin-tuc/tra-cuu-buu-gui">Tra cứu bưu gửi</a>
                          <a href="/tin-tuc/uoc-tinh-cuoc-van-chuyen">Ước tính cước vận chuyển</a>
                          <a href="/tin-tuc/thong-tin-don-hang">Thông tin đơn hàng</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li 
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="/tin-tuc">
                  Tin tức 
                  <i className={`arrow ${isMenuActive(2) ? 'up' : 'down'}`}></i>
                </a>
                {isMenuActive(2) && (
                  <div className="sub-menu">
                    <div className="sub-menu-content d-flex justify-content-center">
                      <div className="sub-menu-item">
                        <div className="sub-menu-item-list d-flex flex-column">
                          <a href="/tin-tuc/tin-noi-bo">Tin nội bộ</a>
                          <a href="/tin-tuc/tin-dich-vu-moi">Tin dịch vụ mới</a>
                          <a href="/tin-tuc/tin-nganh">Tin ngành</a>
                          <a href="/tin-tuc/tin-quoc-te">Tin quốc tế</a>
                          <a href="/tin-tuc/thong-tin-huu-ich">Thông tin hữu ích</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li><a href=''>Giới Thiệu</a></li>
              <li><a href=''>Liên hệ</a></li>
            </ul>
          </div>
          <div className='header-search'>
            <a href="/tim-kiem">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3328 13.7294L10.6211 10.8799C11.3183 10.0425 11.7003 8.98884 11.7003 7.89196C11.7003 5.32919 9.63663 3.24414 7.10015 3.24414C4.56367 3.24414 2.5 5.32919 2.5 7.89196C2.5 10.4547 4.56367 12.5398 7.10015 12.5398C8.05238 12.5398 8.95981 12.2496 9.73563 11.6987L12.4679 14.5699C12.5821 14.6897 12.7357 14.7558 12.9003 14.7558C13.0561 14.7558 13.2039 14.6958 13.3162 14.5866C13.5546 14.3548 13.5622 13.9705 13.3328 13.7294ZM7.10015 4.45661C8.97501 4.45661 10.5003 5.99767 10.5003 7.89196C10.5003 9.78624 8.97501 11.3273 7.10015 11.3273C5.22529 11.3273 3.70004 9.78624 3.70004 7.89196C3.70004 5.99767 5.22529 4.45661 7.10015 4.45661Z" fill="#313131">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotHeader;
