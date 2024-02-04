import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Employee from "../Components/Employee";
import "../firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { ClipLoader } from "react-spinners";

// 관리자만 이페이지에 들어올수 있도록 하게
// 관리자 임시로 uid => id 로 해놓음

const EmployeeListPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // 직원리스트 가져오기
  useEffect(() => {
    async function getEmployeeInfo() {
      setIsLoading(true);
      const snapshot = await get(
        child(
          ref(getDatabase()),
          "companyCode/" + currentUser.photoURL + "/users"
        )
      );
      setEmployeeList(snapshot.val() ? Object.values(snapshot.val()) : []);
      setIsLoading(false);
    }
    getEmployeeInfo();
    return () => {
      setEmployeeList([]);
    };
  }, [currentUser.photoURL]);

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
    <div>
      <div>직원들 </div>
      {employeeList &&
        employeeList.map(
          (user) =>
            user.id !== currentUser.uid && (
              <Employee user={user} key={user.uid} />
            )
        )}
    </div>
  );
};

export default EmployeeListPage;
