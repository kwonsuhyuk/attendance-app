import AppTitle from "@/components/common/AppTitle";
import { ArrowLeft } from "lucide-react";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import { useEffect } from "react";

const OUTWORK_ACCEPT_GUIDE = [
  {
    title: "1. 외근 요청 알림 확인",
    description:
      "화면 상단 또는 홈 화면 금일 출퇴근 박스, 금일 출퇴근 페이지에 외근 요청이 있을 경우 알림 배너가 표시됩니다. 클릭하여 요청 상세를 확인할 수 있습니다.",
    image: "/images/guide/outworking-request-admin.png",
  },

  {
    title: "2. 외근 요청 상세 확인",
    description:
      "요청자의 이름, 메모, 요청 시간 등을 확인한 후 승인 또는 거절을 선택할 수 있습니다.",
    image: "/images/guide/admin-outwork-modal.png",
  },
  {
    title: "3. 승인 결과 반영 확인",
    description:
      "승인된 외근 요청은 ‘금일 외근’ 목록에 자동으로 반영됩니다. 요청자는 상태를 출근 박스에서 확인할 수 있습니다. 외근 요청 수락, 거절을 꼭 해주셔야 직원의 출퇴근 상태가 반영되니 주의해주세요.",
    image: "/images/guide/admin-outwork-confirmed.png",
  },
];

const GuideSection = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => (
  <section className="flex flex-col items-center gap-6 rounded-xl border border-solid border-gray-200 bg-white p-6 shadow-lg dark:bg-zinc-800 md:flex-row">
    <img src={image} alt={title} className="w-full rounded-md border md:w-1/2" />
    <div className="space-y-2 md:w-1/2">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </section>
);

export default function OutworkGuideAdminPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 bg-slate-100 px-4 py-12">
      <h1 className="flex flex-col items-center justify-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>뒤로가기</span>
        </button>
        <span className="text-black dark:text-white">
          <AppTitle className="mr-2 inline-block" />로 외근 요청 처리하기
        </span>
      </h1>

      <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
        관리자는 직원의 외근 요청을 홈 화면에서 빠르게 확인하고 승인 또는 거절할 수 있습니다. <br />
        외근 요청 처리 절차를 이미지와 함께 확인해 보세요.
      </p>

      <div className="space-y-6">
        {OUTWORK_ACCEPT_GUIDE.map(item => (
          <GuideSection key={item.title} {...item} />
        ))}
      </div>

      <PoweredByFooter />

      <div className="flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          홈 화면으로 돌아가기
        </button>
      </div>
    </main>
  );
}
