import "./mainCol.css";
import "./lookupPostal.css";

const searchIconUrl = "./asset/search-white.png";

export default function MainCol({
  onChangeSearchField,
  onClickSearchBtn,
}) {
  return (
    <div className="main-col">
      <h3>Tra cứu bưu gửi</h3>
      <p>
        Mã bưu gửi (tra nhiều bill thêm dấu phẩy giữa các bill VD:
        EB125966888VN, EI125556888VN)
      </p>
      <div className="search-field">
        <input
          type="text"
          placeholder="Nhập mã bưu gửi"
          onChange={onChangeSearchField}
        />
        <div className="btn-searchhh" onClick={onClickSearchBtn}>
          <img src={searchIconUrl} alt="" />
        </div>
      </div>
    </div>
  );
}
