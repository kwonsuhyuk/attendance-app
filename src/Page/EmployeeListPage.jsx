import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Employee from "../Components/Employee";
import "../firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { ClipLoader } from "react-spinners";
import { MenuItem, Select } from "@mui/material";

const EmployeeListPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [selectedJob, setSelectedJob] = useState("전체");
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
    <div className="w-full h-screen bg-green-300">
      <div className="text-lg">직원 총 {employeeList?.length - 1}명</div>
      <div>
        <input
          type="text"
          placeholder="직원검색"
          onChange={handleSearchChange}
        />
        <Select
          value={selectedJob}
          onChange={handleJobChange}
          sx={{ width: 100, height: 30 }}>
          {/* 직책 선택 필드 */}
          <MenuItem value="전체">전체</MenuItem>
          {companyData.map((el, index) => (
            <MenuItem value={el.jobName} key={index}>
              {el.jobName}
            </MenuItem>
          ))}
        </Select>
      </div>
      {employeeList &&
        employeeList
          .filter(
            (user) =>
              user.name.includes(searchName) &&
              (selectedJob === "전체" || user.jobName === selectedJob)
          )
          .map(
            (user) =>
              user.userType !== "admin" && (
                <Employee user={user} key={user.uid} />
              )
          )}
    </div>
  );
};

export default EmployeeListPage;
