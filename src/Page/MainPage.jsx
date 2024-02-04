import { getAuth, signOut } from 'firebase/auth';
import '../firebase';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import AccessCameraPage from './AccessCameraPage';
import { useSelector } from 'react-redux';
import DateCheckPage from './DateCheckPage';
import ShowSalary from '../Components/ShowSalary/ShowSalary';
import ManagerSettingPage from './managerSettingPage';
import EmployeeListPage from './EmployeeListPage';
import MenuBar from '../Components/MenuBar';
import MyCalendar from '../Components/Calendar/MyCalendar';

function MainPage() {
  return (
    <div className="m-10">
      main
      <div className="bg-red-300">
        <ShowSalary />
      </div>
      <div>
        <MenuBar />
      </div>
      <Routes>
        <Route path="/camera" element={<AccessCameraPage />} />
        <Route path="/datecheck" element={<DateCheckPage />} />
        <Route path="/setting" element={<ManagerSettingPage />} />
        <Route path="/employeelist" element={<EmployeeListPage />} />
      </Routes>
      <MyCalendar />
    </div>
  );
}

export default MainPage;
