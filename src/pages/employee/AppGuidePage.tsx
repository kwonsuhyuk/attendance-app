import { useEffect } from "react";
import { Steps, Collapse } from "antd";
import iphoneImg from "@/assets/guideImg/iphoneadd.jpeg";
import iphoneImg2 from "@/assets/guideImg/iphoneadd2.jpeg";
import galaxyguide from "@/assets/guideImg/galaxyguide.jpg";
import galaxyguide2 from "@/assets/guideImg/galaxyguide2.jpg";
import qrguide from "@/assets/guideImg/qrguide.png";
import qrguide2 from "@/assets/guideImg/qrguide2.png";
import darkModeStore from "@/store/darkmode.store";
import "./AppGuidePage.css";
import { useTour } from "@reactour/tour";
import { APP_GUIDE_STEPS } from "@/constants/tourStep";

const { Step } = Steps;
const { Panel } = Collapse;

const FAQS = [
  {
    question: "앱 바로가기 등록하기 (아이폰)",
    guideSteps: [
      {
        title: "Safari로 해당 앱 접속",
        description: (
          <div>
            <p>
              Safari 브라우저를 통해서
              <a href="https://britec-attd-app.web.app">https://britec-attd-app.web.app</a>
              에 접속한 후, <br />
              가운데 아래 공유 버튼을 클릭합니다.
            </p>
            <img src={iphoneImg} alt="step1" className="w-full" />
          </div>
        ),
      },
      {
        title: "홈 화면 추가 버튼 클릭",
        description: (
          <div>
            <p>
              공유 버튼 클릭 후 아래로 스크롤 하여 <br />
              <span className="text-gray-700">홈 화면에 추가 버튼</span>을 클릭 하여 바탕화면에
              추가할 수 있습니다.
            </p>
            <img src={iphoneImg2} alt="step1" className="w-full" />
          </div>
        ),
      },
    ],
  },
  {
    question: "앱 바로가기 등록하기 (갤럭시)",
    guideSteps: [
      {
        title: "크롬 브라우저로 해당 앱 접속",
        description: (
          <div>
            <p>
              구글 크롬 브라우저를 통해
              <a href="https://britec-attd-app.web.app">https://britec-attd-app.web.app</a>
              <br />
              에 접속한 후, <br />
              오른쪽 위 점 세개를 클릭합니다.
            </p>
            <img src={galaxyguide} alt="step1" className="w-full" />
          </div>
        ),
      },
      {
        title: "홈 화면 추가 버튼 클릭",
        description: (
          <div>
            <p>
              <span className="text-gray-700">홈 화면에 추가 버튼</span>
              <br />
              (혹은, 웹 어플리케이션 다운)을 클릭 하여 바탕화면에 추가할 수 있습니다.
            </p>
            <img src={galaxyguide2} alt="step2" className="w-full" />
            <div className="text-sm text-red-300">
              혹시 해결이 안되실 시 <br />
              아래 링크로 접속해 주세요
              <a href="https://iboxcomein.com/adding-a-site-shortcut-to-the-galaxy-home-screen/">
                https://iboxcomein.com/adding-a-site-shortcut-to-the-galaxy-home-screen/
              </a>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    question: "QR 출퇴근 하는 방법",
    guideSteps: [
      {
        title: "홈 화면의 QR SCAN을 클릭.",
        description: (
          <div>
            <p>
              <span className="text-gray-700">홈 화면의 QR SCAN을 클릭 </span>
              혹은 MENU의 QR SCAN 을 클릭해 QR 페이지로 이동하세요.
            </p>
            <img src={qrguide} alt="step2" className="w-full" />
          </div>
        ),
      },
      {
        title: "관리자가 제공한 QR을 스캔",
        description: (
          <div>
            <p>
              <span className="text-gray-700">빨간 곳의 카메라 허용 버튼을 클릭</span>
              후 start scanning 버튼을 클릭해 관리자가 제공한 QR을 <br />{" "}
              <span className="text-gray-700">출근할 때 한번 퇴근할 때 한번 스캔</span>
              하시면 됩니다!
            </p>
            <img src={qrguide2} alt="step2" className="w-full" />
          </div>
        ),
      },
    ],
  },
];

const AppGuidePage = () => {
  const darkMode = darkModeStore(state => state.darkMode);
  const { isOpen, setCurrentStep, setSteps } = useTour();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(APP_GUIDE_STEPS);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps]);

  return (
    <div className="absolute top-0 w-full" data-tour="step-30">
      <div className="my-3 font-bold text-base">APP GUIDE</div>
      <Collapse>
        {FAQS.map((faq, index) => (
          <Panel
            className={!darkMode ? "lightMode" : "darkMode"}
            header={
              <span
                style={{
                  color: !darkMode ? "black" : "white",
                }}
              >
                {faq.question}
              </span>
            }
            key={index}
          >
            <Steps direction="vertical" current={-1}>
              {faq.guideSteps.map((step, index) => (
                <Step
                  key={index}
                  title={<span style={{ color: "black", fontWeight: "bold" }}>{step.title}</span>}
                  description={step.description}
                />
              ))}
            </Steps>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default AppGuidePage;
