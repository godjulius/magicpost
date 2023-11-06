import './topHeader.css'
import React, { useState } from 'react';

function TopHeader() {

  return (
    <div className="top-header">
      <div className="container-lg">
        <div className="wrapper-top-header">
          <div className="left-header">
            <span className="left-header__label">Hotline:&nbsp;</span>
            <span className="hotline1">1900 0000</span>
          </div>
          <div className="right-header">
            <div className="right-header__label">Ngôn ngữ:&nbsp;</div>
            <div className="language">
                Tiếng Việt
            </div>
            <div className="login">
              <a href="">Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;

