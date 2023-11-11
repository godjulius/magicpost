import { useState, useRef, useEffect } from "react";
import "./slideShow.css";

const imgUrls = [
  "./asset/COVER-01.jpg",
  "./asset/COVER-02.jpg",
  "./asset/COVER-03.jpg",
  "./asset/COVER-04.jpg",
];
const delay = 2500;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imgUrls.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0) ` }}
      >
        {imgUrls.map((imgUrl, index) => (
          <div
            className="slide"
            key={index}
            style={{
              backgroundImage: "url(" + `${imgUrl}` + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        ))}
      </div>
      <div className="slideshowDots">
        {imgUrls.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
