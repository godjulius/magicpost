import "./lookupPostal.css";
import { useState } from "react";
import MainCol from "./mainCol";
import SubCol from "./subCol";

const iconUrls = [
  "./asset/estimate.png",
  "./asset/search-post.png",
  "./asset/search-prohibited.png",
];

const subColContents = [
  "Ước tính cước phí",
  "Tìm kiếm bưu cục",
  "Tra hàng cấm gửi"
]

export default function LookupPostal() {
  const [searchValue, setSearchValue] = useState("");
  function onChangeSearchField(e) {
    setSearchValue(e.target.value);
    // console.log(e.target.value);
  }

  function onClickSearchBtn(e) {
    // Call API send searchValue to the sever side.
    //...
    // console.log(searchValue);
  }

  return (
    <div className="lookup-postal" id="lookup-postal">
      <div className="container-middle">
        <div className="row">
          <MainCol
            searchValue={searchValue}
            onChangeSearchField={onChangeSearchField}
            onClickSearchBtn={onClickSearchBtn}
          />
          <div className="sub">
            <SubCol iconUrl={iconUrls[0]} content={subColContents[0]} />
            <SubCol iconUrl={iconUrls[1]} content={subColContents[1]}/>
            <SubCol iconUrl={iconUrls[2]} content={subColContents[2]}/>
          </div>
        </div>
      </div>
    </div>
  );
}
