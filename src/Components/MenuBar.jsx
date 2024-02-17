import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { FaCamera } from 'react-icons/fa';
import { useState } from 'react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const MenuBar = ({ companyName, companyLogo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType, currentUser } = useSelector((state) => state.user);
  const [darkMode, setDarkMode] = useState(false);

  const logout = async () => {
    await signOut(getAuth());
    navigate('/');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const body = document.body;
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
    } else {
      body.classList.add('dark');
    }
  };
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  // user가 관리자 일시
  if (userType === 'admin') {
    return (
      // Main , 직원리스트 , 회사 설정, 공휴일 지정 하는 페이지 , 직원 요약 켈린더
      <div className="flex">
        <img
          src={companyLogo}
          alt="회사로고"
          className="rounded-full w-24 h-24 mr-5"
          style={{
            borderBottom: !darkMode
              ? '2px solid #00000080'
              : '2px solid #FFFFFF80',
          }}
        />
        <div className="grid grid-rows-2 w-full">
          <div
            className="flex justify-between w-full items-end pb-2"
            style={{
              borderBottom: !darkMode
                ? '1px solid #00000080'
                : '1px solid #FFFFFF80',
            }}
          >
            <div className="font-black">{companyName}</div>
            <div className="flex justify-between items-end w-1/3">
              <div
                className={`${
                  location.pathname === `/${currentUser?.photoURL}/`
                    ? 'text-white-nav-selected dark:text-dark-nav-selected'
                    : 'text-white-nav-text dark:text-dark-nav-text'
                }`}
                onClick={() => navigate(`/${currentUser?.photoURL}/`)}
                style={{
                  border: 'none',
                }}
              >
                HOME
              </div>
              <div
                className={`${
                  location.pathname === `/${currentUser?.photoURL}/employeelist`
                    ? 'text-white-nav-selected dark:text-dark-nav-selected'
                    : 'text-white-nav-text dark:text-dark-nav-text'
                }`}
                style={{ border: 'none' }}
                onClick={() =>
                  navigate(`/${currentUser?.photoURL}/employeelist`)
                }
              >
                PEOPLE
              </div>
              <div
                className={`${
                  location.pathname === `/${currentUser?.photoURL}/datecheck`
                    ? 'text-white-nav-selected dark:text-dark-nav-selected'
                    : 'text-white-nav-text dark:text-dark-nav-text'
                }`}
                style={{ border: 'none' }}
                onClick={() => navigate(`/${currentUser?.photoURL}/datecheck`)}
              >
                CALENDAR
              </div>
              <div
                className={`${
                  location.pathname === `/${currentUser?.photoURL}/setting`
                    ? 'text-white-nav-selected dark:text-dark-nav-selected'
                    : 'text-white-nav-text dark:text-dark-nav-text'
                }`}
                style={{ border: 'none' }}
                onClick={() => navigate(`/${currentUser?.photoURL}/setting`)}
              >
                SETTING
              </div>
            </div>
          </div>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    defaultChecked={darkMode}
                    onChange={toggleTheme}
                  />
                }
              />
            </FormGroup>
          </div>
        </div>
        {/* <div className="w-full h-px bg-white-border"></div> */}
      </div>
    );
  } else {
    // user가 직원일시
    return (
      // 메인 , 자기켈린더, QR
      <>
        <FormGroup>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                defaultChecked={darkMode}
                onChange={toggleTheme}
              />
            }
          />
        </FormGroup>
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
