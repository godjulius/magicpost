import "./subCol.css";

export default function SubCol({ iconUrl, content }) {
  return (
    <div className="sub-col">
      <a href="">
        <img src={iconUrl} alt="icon" />
        <p>{content}</p>
      </a>
    </div>
  );
}
