import React from "react";
import jehyunPhoto from "../assets/aboutImg/jehyun.jpeg";
import suhyukPhoto from "../assets/aboutImg/suhyuk.jpeg";
const AboutPage = () => {
  return (
    <div
      className="mb-10 flex flex-col justify-start items-center gap-10"
      style={{
        height: "calc(100vh - 18rem)",
        position: "relative",
      }}>
      <div className="text-3xl md:text-5xl font-bold">MADE BY</div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 md:justify-around md:w-full">
        <div className="flex flex-col gap-5 items-center">
          <div>
            <img
              src={jehyunPhoto}
              alt="jehyun"
              className="w-36 h-36 md:w-72 md:h-72"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="text-xl font-bold">유제현</div>
          <div>010-5352-3305</div>
          <div>jehyunyoo@naver.com</div>
          <a href="https://github.com/YOOJEHYEON" className="text-blue-500">
            https://github.com/YOOJEHYEON
          </a>
          <div>국민 698902-01-212670</div>
        </div>
        <div className="flex flex-col gap-5 items-center mb-10 md:mb-0">
          <div>
            <img
              src={suhyukPhoto}
              alt="suhyuk"
              className="w-36 h-36 md:w-72 md:h-72"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="text-xl font-bold">권수혁</div>
          <div>010-7628-5327</div>
          <div>supersuhyuk@gmail.com</div>
          <a href="https://github.com/kwonsuhyuk" className="text-blue-500">
            https://github.com/kwonsuhyuk
          </a>
          <div>토스 1000-4676-3748</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
