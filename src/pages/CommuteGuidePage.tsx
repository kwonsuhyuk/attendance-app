import AppTitle from "@/components/common/AppTitle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import PoweredByFooter from "@/components/common/PoweredByFooter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const WORKPLACE_GUIDE = [
  {
    title: "1. 출근 버튼 클릭",
    description: "홈 화면에 있는 출근하기 버튼을 클릭하여 근무를 시작할 수 있습니다.",
    image: "/images/guide/checkin.png",
  },
  {
    title: "2. 위치 정보 허용",
    description:
      "저희 서비스는 위치 기반으로 출퇴근을 기록합니다. 반드시 위치 정보 사용을 허용해주세요!",
    image: "/images/guide/location.jpeg",
  },
  {
    title: "3. 근무지 선택",
    description:
      "현재 위치를 기반으로 검색된 주변의 회사 근무지 목록에서 출근지를 선택한 후, 출근하기 버튼을 눌러주세요. 회사 근무지가 아닌 장소에서 출근하시려면 외근 출근 탭을 참고해주세요.",
    image: "/images/guide/commute.png",
  },
  {
    title: "4. 출근지 확인 및 출근 완료",
    description:
      "출근할 근무지와 시간을 확인하고 출근하기 버튼을 클릭하여 출근을 완료해주세요. 출근 후에는 취소가 불가능하니 주의해 주세요.",
    image: "/images/guide/commute-modal.png",
  },
  {
    title: "5. 출근 완료 확인",
    description: "출근이 성공적으로 완료되면 아래와 같은 박스를 통해 상태를 확인할 수 있습니다.",
    image: "/images/guide/checkedin.png",
  },
];

const OUTWORK_GUIDE = [
  {
    title: "1. 출근 버튼 클릭",
    description: "홈 화면의 출근하기 버튼을 클릭하여 외근 출근을 시작할 수 있습니다.",
    image: "/images/guide/checkin.png",
  },
  {
    title: "2. 외근 출근 선택",
    description:
      "주변에 등록된 근무지가 없더라도 외근으로 출근을 등록할 수 있습니다. 주변에 근무지가 있어도 외근 출근이 가능합니다.",
    image: "/images/guide/outworking-button.png",
  },
  {
    title: "3. 외근 메모 작성 및 요청",
    description:
      "외근은 근무지가 자동으로 기록되지 않기 때문에 메모를 통해 관리자에게 상세한 설명을 전달해야 합니다.",
    image: "/images/guide/outworking-modal.png",
  },
  {
    title: "4. 외근 요청 승인 대기",
    description: "외근 요청을 보낸 뒤, 관리자의 승인이 완료될 때까지 승인 대기 상태가 표시됩니다.",
    image: "/images/guide/outworking-request.png",
  },
  {
    title: "5. 외근 출근 완료",
    description:
      "외근 요청이 승인되면 출근 메모가 기록되며, 따로 퇴근 버튼을 누를 필요는 없습니다. 승인 또는 거절 결과는 상단 알림 버튼을 통해 확인하실 수 있습니다.",
    image: "/images/guide/outworking-complete.png",
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
}) => {
  return (
    <section className="flex flex-col items-center gap-6 rounded-xl border border-solid border-gray-200 bg-white p-6 shadow-lg dark:bg-zinc-800 md:flex-row">
      <img src={image} alt={title} className="w-full rounded-md border md:w-1/2" />
      <div className="space-y-2 md:w-1/2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </section>
  );
};

export default function CommuteGuidePage() {
  useEffect(() => {
    localStorage.setItem("commute_guide_seen", "true");
  }, []);

  return (
    <main className="mx-auto max-w-4xl space-y-10 bg-slate-100 px-4 py-12">
      <h1 className="flex flex-col items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>뒤로가기</span>
        </button>
        <span className="text-black dark:text-white">
          <AppTitle className="mr-2 inline-block" />로 출퇴근 하기
        </span>
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        처음 사용하는 분들도 쉽게 이해할 수 있도록 출근 방식별 안내를 이미지와 함께 제공합니다.
        <br />본 서비스는 회사 근무지에서의 출근과, 근무지 없이 진행되는 외근 출근을 모두
        지원합니다.
      </p>

      <Tabs defaultValue="workplace" className="w-full space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <TabsList className="grid w-full grid-cols-3 border-b border-gray-300 dark:border-zinc-600">
            <TabsTrigger
              value="workplace"
              className="w-full border-b-2 border-transparent px-4 text-center text-sm font-semibold text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-gray-300 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-300"
            >
              근무지 출근
            </TabsTrigger>
            <TabsTrigger
              value="outwork"
              className="w-full border-b-2 border-transparent px-4 text-center text-sm font-semibold text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-gray-300 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-300"
            >
              외근 출근
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="w-full border-b-2 border-transparent px-4 text-center text-sm font-semibold text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-gray-300 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-300"
            >
              자주 묻는 질문
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <TabsContent value="workplace" className="space-y-6">
              {WORKPLACE_GUIDE.map(item => (
                <GuideSection key={item.title} {...item} />
              ))}
            </TabsContent>
            <TabsContent value="outwork" className="space-y-6">
              {OUTWORK_GUIDE.map(item => (
                <GuideSection key={item.title} {...item} />
              ))}
            </TabsContent>
            <TabsContent value="faq" className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    Q. 실수로 위치 허용을 거부했어요. 어떻게 해야 하나요?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 dark:text-gray-300">
                    A. 브라우저 또는 휴대폰 설정에서 다시 위치 권한을 허용해 주세요. <br />
                    위치 정보가 꺼져 있으면 출근 버튼이 비활성화되며 출근 처리가 되지 않습니다.
                  </AccordionContent>
                </AccordionItem>
                <Separator />

                <AccordionItem value="q2">
                  <AccordionTrigger className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    Q. 위치 정보가 안 나와서 출근 또는 퇴근을 못했어요.
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 dark:text-gray-300">
                    A. 네트워크 환경이나 위치 오차로 인해 출근 처리가 되지 않을 수 있습니다. <br />
                    이 경우 관리자에게 문의하여 수동으로 출근/퇴근 처리를 요청해 주세요.
                  </AccordionContent>
                </AccordionItem>
                <Separator />
                <AccordionItem value="q3">
                  <AccordionTrigger className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    Q. 그 외 오류가 발생했을 경우 어떻게 해야 하나요?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 dark:text-gray-300">
                    A. 화면 캡처와 함께 관리자에게 문의해 주세요. <br />
                    오류 사항을 가능한 자세히 설명해주시면 빠른 조치가 가능합니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </div>
        </div>
      </Tabs>

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
