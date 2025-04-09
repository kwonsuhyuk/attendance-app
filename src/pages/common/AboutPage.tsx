import jehyunPhoto from "@/assets/aboutImg/jehyun.jpeg";
import suhyukPhoto from "@/assets/aboutImg/suhyuk.jpeg";
import mintaekPhoto from "@/assets/aboutImg/mintaek.png";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import EmployeeEtcPageTitle from "@/components/employee/EmployeeEtcPageTitle";

const AboutPage = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl space-y-16 px-4">
        {/* MADE BY */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-center md:gap-12">
          {/* 권수혁 */}
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-center shadow-md dark:bg-muted">
            <img
              src={suhyukPhoto}
              alt="suhyuk"
              className="h-36 w-36 rounded-full object-cover md:h-56 md:w-56"
            />
            <div className="text-xl font-bold">권수혁</div>
            <div>010-7628-5327</div>
            <div>토스뱅크 1000-4676-3748</div>
          </div>

          {/* 오민택 */}
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-center shadow-md dark:bg-muted">
            <img
              src={mintaekPhoto}
              alt="mintaek"
              className="h-36 w-36 rounded-full object-cover md:h-56 md:w-56"
            />
            <div className="text-xl font-bold">오민택</div>
            <div>010-5397-1606</div>
            <div>신한 110483942842</div>
          </div>

          {/* 유제현 */}
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-center shadow-md dark:bg-muted">
            <img
              src={jehyunPhoto}
              alt="jehyun"
              className="h-36 w-36 rounded-full object-cover md:h-56 md:w-56"
            />
            <div className="text-xl font-bold">유제현</div>
            <div>010-5352-3305</div>
            <div>국민 698902-01-212670</div>
          </div>
        </div>

        <PoweredByFooter />

        {/* DESIGNED BY
        <div className="space-y-10">
          <h2 className="group relative mx-auto w-fit cursor-pointer overflow-hidden text-center text-3xl font-bold tracking-widest md:text-5xl">
            DESIGNED BY
            <span className="absolute bottom-0 left-0 mt-5 h-[2px] w-0 bg-black pt-1 transition-all duration-500 group-hover:w-full dark:bg-white"></span>
          </h2>

          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src={aramImg}
              alt="aram"
              className="h-36 w-36 rounded-full object-cover md:h-56 md:w-56"
            />
            <div className="text-xl font-bold">유아람</div>
            <div>하나은행 34591028719307</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutPage;
