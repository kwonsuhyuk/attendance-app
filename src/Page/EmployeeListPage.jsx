import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Employee from "../Components/Employee";
import "../firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { ClipLoader } from "react-spinners";
import { MenuItem, Select } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import GuidePopover from "../Components/GuidePopover";

const EmployeeListPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [selectedJob, setSelectedJob] = useState("전체");
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const [selectedSalaryType, setSelectedSalaryType] = useState("전체");

  const handleFilterReset = () => {
    setSelectedJob("전체");
    setSelectedSalaryType("전체");
    setSearchName("");
  };

  // 이벤트 핸들러 추가
  const handleSalaryTypeChange = (event) => {
    setSelectedSalaryType(event.target.value);
  };

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const snapshot = await get(
        child(
          ref(getDatabase()),
          "companyCode/" + currentUser?.photoURL + "/companyInfo/jobName"
        )
      );

      setCompanyData(snapshot.val() ? Object.values(snapshot.val()) : []);
      setIsLoading(false);
    }

    getData();

    return () => {
      setCompanyData([]);
    };
  }, [currentUser?.photoURL]);

  useEffect(() => {
    async function getEmployeeInfo() {
      setIsLoading(true);
      const snapshot = await get(
        child(
          ref(getDatabase()),
          "companyCode/" + currentUser?.photoURL + "/users"
        )
      );
      setEmployeeList(snapshot.val() ? Object.values(snapshot.val()) : []);
      setIsLoading(false);
    }
    getEmployeeInfo();
    return () => {
      setEmployeeList([]);
    };
  }, [currentUser?.photoURL]);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <ClipLoader
          color="black"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3>로딩 중 입니다.</h3>
      </div> // 로딩 스피너
    );
  }

  return (
    <div
      className="my-10"
      style={{
        height: "calc(100vh - 18rem)",
        position: "relative",
      }}>
      <div className="mx-5 lg:mx-0 flex justify-between items-center mb-12">
        <div className="hidden md:flex md:items-center gap-5">
          <div>
            <span className="font-bold mr-2">직원 수 </span>
            <span className=""> {employeeList.length - 1}</span>
          </div>
          <GuidePopover text="여기는 회사 직원리스트 페이지 입니다. 각종 직원들이 설정한 정보를 수정할 수 있고, 상세정보&정산 버튼을 클릭해 직원들의 날짜별 상세 근무 기록과 월 정산을 하실 수 있습니다." />
        </div>
        <div className="flex gap-7">
          <div onClick={handleFilterReset} className="flex items-center">
            <ReplayIcon />
          </div>
          <Select
            value={selectedJob}
            onChange={handleJobChange}
            sx={{
              width: { xs: 100, sm: 120 },
              height: { xs: 25, sm: 30 },
              fontSize: { xs: "0.8rem", sm: "1rem" },
              color: !darkMode ? "black" : "white",
              border: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
            }}>
            {/* 직책 선택 필드 */}
            <MenuItem value="전체">직종 구분</MenuItem>
            {companyData.map((el, index) => (
              <MenuItem value={el.jobName} key={index}>
                {el.jobName}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedSalaryType}
            onChange={handleSalaryTypeChange}
            sx={{
              width: { xs: 120, sm: 140 },
              height: { xs: 25, sm: 30 },
              fontSize: { xs: "0.8rem", sm: "1rem" },
              color: !darkMode ? "black" : "white",
              border: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
            }}>
            <MenuItem value="전체">급여지급방식</MenuItem>
            <MenuItem value="monthlyPay">월급 지급</MenuItem>
            <MenuItem value="dailyPay">일당 지급</MenuItem>
            <MenuItem value="hourPay">시급 지급</MenuItem>
            {/* 필요한 만큼 MenuItem을 추가하세요 */}
          </Select>
          <input
            value={searchName}
            style={{
              width: "100%",
              maxWidth: { xs: "150px", sm: "48rem" },
              fontSize: { xs: "0.8rem", sm: "1rem" },
              border: "none",
              borderBottom: !darkMode
                ? "1px solid #00000080"
                : "1px solid #FFFFFF80",
              color: !darkMode ? "black" : "white",
            }}
            className="bg-transparent focus:outline-none text-lg"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/* 직원테이블 */}
      <div
        className="px-2"
        style={{
          borderBottom: !darkMode
            ? "1px solid #00000080"
            : "1px solid #FFFFFF80",
          borderTop: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
          overflow: "scroll",
          height: "calc(100% - 5rem)",
        }}>
        <div
          className="flex justify-between md:grid md:grid-cols-7 items-center justify-items-center py-5 font-bold"
          style={{
            borderBottom: !darkMode
              ? "1px solid #00000033"
              : "1px solid #FFFFFF33",
          }}>
          <span className="w-auto text-sm lg:text-base">이름</span>
          <span className="w-auto hidden md:block text-sm lg:text-base">
            이메일
          </span>
          <span className="w-auto text-sm lg:text-base">직종</span>
          <span className="w-auto text-sm lg:text-base">급여지급방식</span>
          <span className="w-auto hidden md:block text-sm lg:text-base">
            급여
          </span>
          <span className="w-auto text-sm lg:text-base">직원 정보 수정</span>
          <span className="w-auto text-sm lg:text-base">
            상세보기 & 정산 {">"}
          </span>
        </div>

        <div className="overflow-y-scroll">
          {employeeList &&
            employeeList
              .filter(
                (user) =>
                  user.name.includes(searchName) &&
                  (selectedJob === "전체" || user.jobName === selectedJob) &&
                  (selectedSalaryType === "전체" ||
                    user.salaryType === selectedSalaryType) // 급여 지급 방식에 따른 필터 추가
              )
              .map(
                (user) =>
                  user.userType !== "admin" && (
                    <Employee user={user} key={user.uid} />
                  )
              )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;
