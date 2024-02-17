import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { FaCamera } from 'react-icons/fa';

const MenuBar = ({ companyName, companyLogo }) => {
  const navigate = useNavigate();
  const { userType, currentUser } = useSelector((state) => state.user);
  const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
    } else {
      body.classList.add('dark');
    }
  };
  const logout = async () => {
    await signOut(getAuth());
    navigate('/');
  };

  // user가 관리자 일시
  if (userType === 'admin') {
    return (
      // Main , 직원리스트 , 회사 설정, 공휴일 지정 하는 페이지 , 직원 요약 켈린더
      <div>
        <button
          onClick={toggleTheme}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          다크모드 전환
        </button>
        <button onClick={() => navigate(`/${currentUser?.photoURL}/`)}>
          main
        </button>
        <button onClick={logout}>logout</button>
        <button onClick={() => navigate(`/${currentUser?.photoURL}/datecheck`)}>
          datecheckpage
        </button>
        <button onClick={() => navigate(`/${currentUser?.photoURL}/setting`)}>
          설정페이지 이동
        </button>
        <button
          onClick={() => navigate(`/${currentUser?.photoURL}/employeelist`)}
        >
          직원리스트로 이동
        </button>
      </div>
    );
  } else {
    // user가 직원일시
    return (
      // 메인 , 자기켈린더, QR
      <>
        <button
          onClick={toggleTheme}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          다크모드 전환
        </button>
        <button onClick={() => navigate(`${currentUser.photoURL}/`)}>
          main
        </button>
        <button onClick={logout}>logout</button>
        <button onClick={() => navigate(`/${currentUser.photoURL}/camera`)}>
          <FaCamera />
        </button>
      </>
    );
  }
};

export default MenuBar;
