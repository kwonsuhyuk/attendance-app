import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { FaCamera } from 'react-icons/fa';

const MenuBar = () => {
  const navigate = useNavigate();
  const { userType, currentUser } = useSelector((state) => state.user);

  const logout = async () => {
    await signOut(getAuth());
    navigate('/');
  };

  // user가 관리자 일시
  if (userType === 'admin') {
    return (
      // Main , 직원리스트 , 회사 설정, 공휴일 지정 하는 페이지 , 직원 요약 켈린더
      <>
        <button onClick={() => navigate(`${currentUser.photoURL}/`)}>
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
      </>
    );
  } else {
    // user가 직원일시
    return (
      // 메인 , 자기켈린더, QR
      <>
        <div className="flex flex-col">
          <button onClick={() => navigate(`${currentUser.photoURL}/`)}>
            main
          </button>
          <button onClick={logout}>logout</button>

          <button>캘린더 바로가기</button>
        </div>
        <div>
          <a
            className="dark-nav-selected cursor-pointer"
            onClick={() => navigate(`/${currentUser.photoURL}/camera`)}
          >
            QR SCAN
          </a>
        </div>
      </>
    );
  }
};

export default MenuBar;
