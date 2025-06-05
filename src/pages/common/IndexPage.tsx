import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function IndexPage() {
  const navigate = useNavigate();

  return (
    <>
      <Seo title="On & Off" description="출퇴근 기록을 확인하고 관리하세요." />

      <div className="text-white">
        <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-black/30 px-6 py-5 backdrop-blur-md md:px-10">
          <div className="text-xl font-bold text-white md:text-2xl">On&Off</div>
          <nav>
            <button
              className="hover:bg-point-color-sub ml-4 rounded-md border border-solid bg-point-color px-4 py-2 text-sm text-black transition hover:text-black"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
            <button
              className="ml-3 rounded-md border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </nav>
        </header>

        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black px-6 py-24 pt-32 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="z-20 mt-24 md:mt-0"
          >
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              출퇴근을 더 <span className="text-point-color">스마트하게</span>, On&Off
            </h1>
            <p className="mb-8 text-base text-gray-300 md:text-xl">
              간편하고 효율적인 근태 관리로 일상을 바꾸세요.
            </p>
            <button
              className="hover:bg-point-color-sub rounded bg-point-color px-6 py-3 text-sm font-semibold text-black transition md:px-8 md:py-4 md:text-base"
              onClick={() => navigate("/signup")}
            >
              지금 시작하기
            </button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-10 z-20 text-2xl text-white opacity-60"
          >
            <ChevronDown />
          </motion.div>
        </section>
        <FeatureSection
          bgColor="bg-white"
          image="/images/today-attendance.png"
          title="직원 근태 현황을 한눈에"
          reverse
          description={
            <>
              <p>
                <span className="font-semibold text-point-color">관리자</span>는 모든 직원의{" "}
                <strong>출퇴근 기록</strong>은 물론, <br />
                <strong>근무지별 출근 현황</strong>과 <strong>외근 여부</strong>까지 실시간으로
                파악할 수 있어요.
              </p>
              <p>
                복잡한 리스트 없이 <strong>하루 근태 상태를 한눈에 확인</strong>하고, 효율적인 인사
                관리를 시작해보세요.
              </p>
            </>
          }
          imageStyle="w-full max-w-[1000px]"
        />

        <FeatureSection
          bgColor="bg-[#f8f9fb]"
          image="/images/mobile-attendance.png"
          title="직원의 출근, 더 쉽고 정확하게"
          description={
            <>
              <p>
                직원은 복잡한 절차 없이, <strong>모바일에서 GPS 기반</strong>으로 간편하게 <br />
                출근을 기록할 수 있어요.
              </p>
              <p>
                모든 출근 기록은 <span className="font-semibold">관리자 대시보드</span>에{" "}
                <strong>실시간으로 반영</strong>되어,
                <br /> 언제 어디서든 정확한 근태 관리가 가능합니다.
              </p>
            </>
          }
          imageStyle="w-full max-w-[350px]"
        />
        <FeatureSection
          bgColor="bg-white"
          image="/images/period-attendance.png"
          title="기간별 출퇴근 기록도 한눈에"
          reverse
          description={
            <>
              <p>
                원하는 <span className="font-semibold text-point-color">기간</span>을 설정하면, 해당
                기간 동안의 직원 출퇴근 내역을
                <strong> 달력 형태로 정리된 화면에서 한눈에 확인</strong>할 수 있어요.
              </p>
              <p>
                <strong>직원별 근무 패턴</strong>을 빠르게 파악할 수 있어
                <br />
                <span className="font-semibold">정확하고 체계적인 인사 관리</span>에 큰 도움이
                됩니다.
              </p>
            </>
          }
          imageStyle="max-w-[600px] w-full"
        />

        <FeatureSection
          bgColor="bg-[#f8f9fb]"
          image="/images/vacation-statistic.png"
          title="휴가 통계, 더 정밀하게 한눈에"
          description={
            <>
              <p>
                <span className="font-semibold text-point-color">날짜별 휴가 사용 현황</span>을{" "}
                <strong>차트로 시각화</strong>해 쉽게 파악할 수 있어요.
              </p>
              <p>
                <strong>휴가 유형별 통계</strong>와 <strong>직원 전체 리스트</strong>도 표 형태로
                제공되어, <br />
                개인별로 세부 분석이 가능합니다.
              </p>
              <p>
                휴가 사용 데이터를 다양한 관점에서 확인하고,{" "}
                <span className="font-semibold">투명한 휴가 관리</span>를 실현하세요.
              </p>
            </>
          }
          imageStyle="max-w-[600px] w-full"
        />

        <FeatureSection
          bgColor="bg-gradient-to-br from-white to-zinc-100"
          image="/images/vacation-detail.png"
          title="휴가 요청과 승인도 간편하게"
          reverse
          description={
            <>
              <p>
                <span className="font-semibold text-point-color">직원</span>은 직접 휴가를 요청하고,
                <br />
                <span className="font-semibold text-point-color">관리자</span>는 승인 또는 반려할 수
                있어요.
              </p>
              <p>
                실시간 반영되는 내역으로 <strong>투명한 관리</strong>가 가능합니다.
              </p>
            </>
          }
          imageStyle="max-w-[600px] w-full"
        />

        <FeatureSection
          bgColor="bg-white"
          image="/images/settlement.png"
          title="근태부터 휴가까지, 엑셀로 한 번에 정산"
          description={
            <>
              <p className="mb-2">
                관리자는 직원의 출퇴근 기록, 연차·휴가 사용 현황 등 다양한 근태 데이터를 한눈에
                확인하고, 자동으로 계산된 결과를 엑셀 파일로 손쉽게 내려받을 수 있어요.
              </p>
              <p>
                정산 기준일에 맞춰 근무 시간과 수당까지 자동 집계되어, 복잡한 수기 작업 없이
                간편하게 정산 업무를 처리할 수 있습니다.
              </p>
            </>
          }
          imageStyle="max-w-[600px] w-full"
        />
        <section className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">지금 바로 on&off를 시작해보세요</h2>
            <p className="mb-6 text-base text-gray-300 md:text-lg">
              간편한 출퇴근과 휴가 관리, 그리고 효율적인 팀 운영까지 지금 경험하세요.
            </p>
            <button
              className="rounded bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 md:px-8 md:py-4 md:text-base"
              onClick={() => navigate("/signup")}
            >
              지금 시작하기
            </button>
          </motion.div>
        </section>
        {/* Footer */}
        <footer className="bg-black py-5 text-center text-sm text-gray-400">
          &copy; 2025 on&off. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default IndexPage;

export function FeatureSection({
  bgColor = "bg-gray-50",
  textColor = "text-black",
  image,
  title,
  description,
  reverse = false,
  imageStyle = "w-full max-w-[400px] md:w-1/2",
}: {
  bgColor?: string;
  textColor?: string;
  image: string;
  title: string;
  description: ReactNode;
  reverse?: boolean;
  imageStyle?: string;
}) {
  return (
    <section className={`min-h-[80vh] ${bgColor} ${textColor} flex items-center`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-6 py-20 md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex w-full justify-center md:w-1/2">
          <img
            src={image}
            alt={title}
            className={`max-w-full rounded-xl object-contain shadow-md ${imageStyle}`}
          />
        </div>

        <div className="w-full text-center md:w-1/2 md:text-left">
          <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
            {title}
          </h2>
          <div className="space-y-4 text-[17px] leading-relaxed tracking-tight text-gray-600 md:pr-3 md:text-lg">
            {description}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
