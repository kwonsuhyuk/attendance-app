import { useEffect } from "react";
import { useTour } from "@reactour/tour";
import iphoneImg from "@/assets/guideImg/iphoneadd.jpeg";
import iphoneImg2 from "@/assets/guideImg/iphoneadd2.jpeg";
import galaxyguide from "@/assets/guideImg/galaxyguide.jpg";
import galaxyguide2 from "@/assets/guideImg/galaxyguide2.jpg";
import qrguide from "@/assets/guideImg/qrguide.png";
import qrguide2 from "@/assets/guideImg/qrguide2.png";
import darkModeStore from "@/store/darkmode.store";
import { APP_GUIDE_STEPS } from "@/constants/tourStep";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import EmployeeEtcPageTitle from "@/components/employee/EmployeeEtcPageTitle";

const FAQS = [
  {
    question: "앱 바로가기 등록하기 (아이폰)",
    guideSteps: [
      {
        title: "Safari로 해당 앱 접속",
        description: (
          <div className="space-y-2">
            <p>
              Safari 브라우저로 접속 후, 아래 공유 버튼을 클릭하세요.
              <br />
              <a href="https://britec-attd-app.web.app" className="text-blue-600 underline">
                https://britec-attd-app.web.app
              </a>
            </p>
            <img src={iphoneImg} alt="아이폰 가이드 1" className="w-full rounded-md" />
          </div>
        ),
      },
      {
        title: "홈 화면 추가 버튼 클릭",
        description: (
          <div className="space-y-2">
            <p>
              공유 버튼 클릭 후 아래로 스크롤 하여
              <span className="font-semibold text-blue-700"> 홈 화면에 추가</span> 클릭
            </p>
            <img src={iphoneImg2} alt="아이폰 가이드 2" className="w-full rounded-md" />
          </div>
        ),
      },
    ],
  },
  {
    question: "앱 바로가기 등록하기 (갤럭시)",
    guideSteps: [
      {
        title: "크롬 브라우저로 접속",
        description: (
          <div className="space-y-2">
            <p>
              크롬으로 접속 후, 오른쪽 상단 점 세개 클릭
              <br />
              <a href="https://britec-attd-app.web.app" className="text-blue-600 underline">
                https://britec-attd-app.web.app
              </a>
            </p>
            <img src={galaxyguide} alt="갤럭시 가이드 1" className="w-full rounded-md" />
          </div>
        ),
      },
      {
        title: "홈 화면 추가 버튼 클릭",
        description: (
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-blue-700">홈 화면에 추가</span> 또는
              <span className="font-semibold"> 웹 어플리케이션 다운로드</span> 클릭
            </p>
            <img src={galaxyguide2} alt="갤럭시 가이드 2" className="w-full rounded-md" />
            <p className="text-sm text-destructive">
              해결되지 않으면,
              <a
                href="https://iboxcomein.com/adding-a-site-shortcut-to-the-galaxy-home-screen/"
                className="underline"
              >
                여기를 클릭하세요
              </a>
            </p>
          </div>
        ),
      },
    ],
  },
  // {
  //   question: "QR 출퇴근 하는 방법",
  //   guideSteps: [
  //     {
  //       title: "홈 화면의 QR SCAN 클릭",
  //       description: (
  //         <div className="space-y-2">
  //           <p>
  //             홈 또는 메뉴에서 <span className="font-semibold text-blue-700">QR SCAN</span>
  //             으로 이동
  //           </p>
  //           <img src={qrguide} alt="QR 가이드 1" className="w-full rounded-md" />
  //         </div>
  //       ),
  //     },
  //     {
  //       title: "QR 스캔",
  //       description: (
  //         <div className="space-y-2">
  //           <p>
  //             <span className="font-semibold text-blue-700">카메라 허용</span> 후
  //             <span className="font-semibold"> start scanning</span> 클릭 → 출퇴근 시 각각 1회 스캔
  //           </p>
  //           <img src={qrguide2} alt="QR 가이드 2" className="w-full rounded-md" />
  //         </div>
  //       ),
  //     },
  //   ],
  // },
];

const AppGuidePage = () => {
  // const darkMode = darkModeStore(state => state.darkMode);
  // const { isOpen, setCurrentStep, setSteps } = useTour();

  // useEffect(() => {
  //   if (isOpen) {
  //     const timer = setTimeout(() => {
  //       setCurrentStep(0);
  //       setSteps(APP_GUIDE_STEPS);
  //     }, 300);
  //     return () => {
  //       clearTimeout(timer);
  //       setSteps([]);
  //     };
  //   }
  // }, [isOpen, setCurrentStep, setSteps]);

  return (
    <div className="w-full" data-tour="step-30">
      <EmployeeEtcPageTitle title="다운로드 가이드" />
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((faq, index) => (
          <>
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {faq.guideSteps.map((step, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      {step.description}
                      {idx < faq.guideSteps.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {index < FAQS.length - 1 && (
              <Separator className="bg-white-border-sub dark:bg-dark-border-sub" />
            )}
          </>
        ))}
      </Accordion>
    </div>
  );
};

export default AppGuidePage;
