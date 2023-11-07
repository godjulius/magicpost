import './botHeader.css'
import React, { useState } from 'react';

function BotHeader() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [activeSidebarMenu, setactiveSidebarMenu] = useState([]);

  const handleActiveSidebar = () => {
    setActiveSidebar(!activeSidebar)
  }

  const handleMouseEnter = (menuIndex) => {
    setActiveMenu(menuIndex);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const isMenuActive = (menuIndex) => {
    return activeMenu === menuIndex;
  };


  const toggleSidebarMenu = (SidebarmenuIndex) => {
    const updatedSidebarMenu = [...activeSidebarMenu];
    if (updatedSidebarMenu.includes(SidebarmenuIndex)) {
      // Nếu menuIndex đã có trong mảng, loại bỏ nó để đóng submenu.
      updatedSidebarMenu.splice(updatedSidebarMenu.indexOf(SidebarmenuIndex), 1);
    } else {
      // Ngược lại, thêm menuIndex vào mảng để mở submenu.
      updatedSidebarMenu.push(SidebarmenuIndex);
    }
    setactiveSidebarMenu(updatedSidebarMenu);
  };

  const isSidebarMenuOpen = (SidebarmenuIndex) => activeSidebarMenu.includes(SidebarmenuIndex);


  return (
    <div className="bottom-header">
      <div id='sidebar-header' 
        className={`sidebar-header ${activeSidebar === true? 'show' : ''}`}
      >
        <div id='content-sidebar' className='content-sidebar'>
          <ul className='sidebar-menu'>
            <li><a href='#'>Trang chủ</a></li>
            <li
              onClick={() => toggleSidebarMenu(0)}
            >
              <a className='content-sidebar-label' href='#'>
                Dịch vụ
                <i className={`arrow ${isSidebarMenuOpen(0) ? 'up' : 'down'}`}></i>
              </a>
              {isSidebarMenuOpen(0) &&
                <div className='sidebar-sub-menu'>
                  <div className='sidebar-sub-menu-content'>
                    <a href="#">Chuyển phát hỏa tốc</a>
                    <a href="#">Chuyển phát nhanh</a>
                    <a href="#">Chuyển phát tiết kiệm</a>
                    <a href="#">Dịch vụ đặc biệt</a>
                    <a href="#">Dịch vụ trọn gói</a>
                    <a href="#">Dịch vụ GTGT</a>
                  </div>
                </div>
              }
            </li>
            <li
              onClick={() => toggleSidebarMenu(1)}
            >
              <a className='content-sidebar-label' href='#'>
                Tra cứu
                <i className={`arrow ${isSidebarMenuOpen(1) ? 'up' : 'down'}`}></i>
              </a>
              {isSidebarMenuOpen(1) &&
                <div className='sidebar-sub-menu'>
                  <div className='sidebar-sub-menu-content'>
                    <a href="#">Tra cứu bưu gửi</a>
                    <a href="#">Ước tính cước vận chuyển</a>
                    <a href="#">Thông tin đơn hàng</a>
                  </div>
                </div>
              }
            </li>
            <li
              onClick={() => toggleSidebarMenu(2)}
            >
              <a className='content-sidebar-label' href='#'>
                Tin tức
                <i className={`arrow ${isSidebarMenuOpen(2) ? 'up' : 'down'}`}></i>
              </a>
              {isSidebarMenuOpen(2) &&
                <div className='sidebar-sub-menu'>
                  <div className='sidebar-sub-menu-content'>
                    <a href="#">Tin nội bộ</a>
                    <a href="#">Tin dịch vụ mới</a>
                    <a href="#">Tin ngành</a>
                    <a href="#">Tin quốc tế</a>
                    <a href="#">Thông tin hữu ích</a>
                  </div>
                </div>
              }
            </li>
            <li><a href='#'>Giới thiệu</a></li>
            <li><a href='#'>Liên hệ</a></li>
          </ul>
        </div>
      </div>
      <div className="container-lg">
        <div className="wrapper-bottom-header">
         
          <div className="bot-left-header">
            <a href="#">
              <img className="no-select" src="./asset/Logo.png" alt="logo"></img>
            </a>
          </div>
          <div className="bot-right-header">
            <ul className="menu">
              <li><a href="#">Trang chủ</a></li>
              <li
                className='has-submenu'
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">
                  Dịch vụ 
                  <i className={`arrow ${isMenuActive(0) ? 'up' : 'down'}`}></i>
                </a>
                {isMenuActive(0) && (
                  <div className="sub-menu">
                    <div className="sub-menu-content">
                      <div className="sub-menu-item">
                        <div className="sub-menu-item-list">
                          <a href="#">Chuyển phát hỏa tốc</a>
                          <a href="#">Chuyển phát nhanh</a>
                          <a href="#">Chuyển phát tiết kiệm</a>
                          <a href="#">Dịch vụ đặc biệt</a>
                          <a href="#">Dịch vụ trọn gói</a>
                          <a href="#">Dịch vụ GTGT</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li 
                className='has-submenu'
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">
                  Tra cứu
                  <i className={`arrow ${isMenuActive(1) ? 'up' : 'down'}`}></i>
                </a>
                {isMenuActive(1) && (
                  <div className="sub-menu">
                    <div className="sub-menu-content">
                      <div className="sub-menu-item">
                        <div className="sub-menu-item-list">
                          <a href="#">Tra cứu bưu gửi</a>
                          <a href="#">Ước tính cước vận chuyển</a>
                          <a href="#">Thông tin đơn hàng</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li 
                className='has-submenu'
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">
                  Tin tức 
                  <i className={`arrow ${isMenuActive(2) ? 'up' : 'down'}`}></i>
                </a>
                {isMenuActive(2) && (
                  <div className="sub-menu">
                    <div className="sub-menu-content">
                      <div className="sub-menu-item">
                        <div className="sub-menu-item-list">
                          <a href="#">Tin nội bộ</a>
                          <a href="#">Tin dịch vụ mới</a>
                          <a href="#">Tin ngành</a>
                          <a href="#">Tin quốc tế</a>
                          <a href="#">Thông tin hữu ích</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li><a href='#'>Giới thiệu</a></li>
              <li><a href='#'>Liên hệ</a></li>
            </ul>
          </div>
          <div 
          class="menu-button-show d-lg-none"
          onClick={handleActiveSidebar}
         >
            <span>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M14.2209 14.1158H1.77648C1.6586 14.1158 1.54556 14.0668 1.46221 13.9796C1.37886 13.8923 
                  1.33203 13.774 1.33203 13.6507C1.33203 13.5273 1.37886 13.409 1.46221 13.3218C1.54556 13.2345 
                  1.6586 13.1855 1.77648 13.1855H14.2209C14.3388 13.1855 14.4518 13.2345 14.5352 13.3218C14.6185 
                  13.409 14.6654 13.5273 14.6654 13.6507C14.6654 13.774 14.6185 13.8923 14.5352 13.9796C14.4518 
                  14.0668 14.3388 14.1158 14.2209 14.1158Z" fill="#313131">
                </path>
                <path 
                  d="M14.2209 9.46344H1.77648C1.6586 9.46344 1.54556 9.41443 1.46221 9.32721C1.37886 9.23998 
                  1.33203 9.12168 1.33203 8.99832C1.33203 8.87496 1.37886 8.75666 1.46221 8.66943C1.54556 8.58221 
                  1.6586 8.5332 1.77648 8.5332H14.2209C14.3388 8.5332 14.4518 8.58221 14.5352 8.66943C14.6185 8.75666 
                  14.6654 8.87496 14.6654 8.99832C14.6654 9.12168 14.6185 9.23998 14.5352 9.32721C14.4518 9.41443 
                  14.3388 9.46344 14.2209 9.46344Z" fill="#313131">
                </path>
                <path 
                  d="M14.2209 4.81304H1.77648C1.6586 4.81304 1.54556 4.76404 1.46221 4.67682C1.37886 4.58959 
                  1.33203 4.47129 1.33203 4.34793C1.33203 4.22457 1.37886 4.10627 1.46221 4.01904C1.54556 3.93182 
                  1.6586 3.88281 1.77648 3.88281H14.2209C14.3388 3.88281 14.4518 3.93182 14.5352 4.01904C14.6185 
                  4.10627 14.6654 4.22457 14.6654 4.34793C14.6654 4.47129 14.6185 4.58959 14.5352 4.67682C14.4518 
                  4.76404 14.3388 4.81304 14.2209 4.81304Z" fill="#313131">
                </path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotHeader;
