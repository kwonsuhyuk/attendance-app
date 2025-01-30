import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Box, FormControlLabel, FormGroup, ListItemIcon, SwipeableDrawer, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toggleMode } from '../store/darkmodeSlice';
import { List, ListItem, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from 'antd';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ReplayIcon from '@mui/icons-material/Replay';

const MenuBar = ({ companyName, companyLogo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userType, currentUser } = useSelector(state => state.user);
  const { darkMode } = useSelector(state => state.darkmodeSlice);
  const [open, setOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const subMenuItems = [
    {
      title: 'APP GUIDE',
      handle: () => {
        navigate(`/${currentUser?.photoURL}/appguide`);
        setOpen(false);
      },
      icon: <LiveHelpIcon />,
    },
    {
      title: 'LOGOUT',
      handle: () => {
        logout();
        setOpen(false);
      },
      icon: <LogoutIcon />,
    },
  ];

  const menuItems = [
    {
      title: 'HOME',
      handle: () => {
        navigate(`/${currentUser?.photoURL}/companymain`);
        setOpen(false);
      },
      icon: <HomeIcon />,
    },
    {
      title: 'CALENDAR',
      handle: () => {
        navigate(`/${currentUser?.photoURL}/calendar`);
        setOpen(false);
      },
      icon: <CalendarTodayIcon />,
    },
    {
      title: 'QR SCAN',
      handle: () => {
        navigate(`/${currentUser?.photoURL}/camera`);
        setOpen(false);
      },
      icon: <CameraAltIcon />,
    },
    {
      title: darkMode ? 'LIGHTMODE' : 'DARKMODE',
      handle: () => {
        toggleTheme();
        setOpen(false);
      },
      icon: darkMode ? <LightModeIcon /> : <DarkModeIcon />,
    },
    {
      title: 'ABOUT',
      handle: () => {
        navigate(`/${currentUser?.photoURL}/about`);
        setOpen(false);
      },
      icon: <InfoIcon />,
    },
  ];
  const refreshPage = () => {
    window.location.reload();
  };

  const logout = async () => {
    await signOut(getAuth());
    navigate('/');
  };

  const toggleTheme = () => {
    dispatch(toggleMode());
    const body = document.body;
    const newMode = !body.classList.contains('dark');
    if (newMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }

    // 사용자의 다크 모드 설정을 로컬 스토리지에 저장
    window.localStorage.setItem('darkMode', newMode);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      transition: 'transform 0.5s ease-out',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
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
          '#fff',
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
    if (window.innerWidth > 600) {
      return (
        // Main , 직원리스트 , 회사 설정, 공휴일 지정 하는 페이지 , 직원 요약 켈린더
        <div className="flex h-28 items-center">
          <img src={companyLogo} alt="회사로고" className="rounded-full w-24 h-24 mr-5" />
          <div className="grid grid-rows-2 w-full">
            <div
              className="flex justify-between w-full items-end pb-2"
              style={{
                borderBottom: !darkMode ? '1px solid #00000080' : '1px solid #FFFFFF80',
              }}>
              <div className="hidden lg:block font-black text-lg">{companyName}</div>
              <div className="flex gap-3 md:justify-between md:items-end md:w-1/3" data-tour="step-2">
                <div
                  className={`${
                    location.pathname === `/${currentUser?.photoURL}/companymain`
                      ? 'text-white-nav-selected dark:text-dark-nav-selected'
                      : 'text-white-nav-text dark:text-dark-nav-text'
                  } cursor-pointer`}
                  onClick={() => navigate(`/${currentUser?.photoURL}/companymain`)}
                  style={{
                    border: 'none',
                  }}>
                  HOME
                </div>
                <div
                  data-tour="step-3"
                  className={`${
                    location.pathname === `/${currentUser?.photoURL}/employeelist`
                      ? 'text-white-nav-selected dark:text-dark-nav-selected'
                      : 'text-white-nav-text dark:text-dark-nav-text'
                  } cursor-pointer`}
                  style={{ border: 'none' }}
                  onClick={() => {
                    navigate(`/${currentUser?.photoURL}/employeelist`);
                  }}>
                  PEOPLE
                </div>
                <div
                  className={`${
                    location.pathname.includes(`/${currentUser?.photoURL}/datecheck`)
                      ? 'text-white-nav-selected dark:text-dark-nav-selected'
                      : 'text-white-nav-text dark:text-dark-nav-text'
                  } cursor-pointer`}
                  style={{ border: 'none' }}
                  onClick={() => navigate(`/${currentUser?.photoURL}/datecheck`)}>
                  CALENDAR
                </div>
                <div
                  data-tour="step-18"
                  className={`${
                    location.pathname.includes(`/${currentUser?.photoURL}/setting`)
                      ? 'text-white-nav-selected dark:text-dark-nav-selected'
                      : 'text-white-nav-text dark:text-dark-nav-text'
                  } cursor-pointer`}
                  style={{ border: 'none' }}
                  onClick={() => navigate(`/${currentUser?.photoURL}/setting`)}>
                  SETTING
                </div>
                <div
                  className={`${
                    location.pathname.includes(`/${currentUser?.photoURL}/about`)
                      ? 'text-white-nav-selected dark:text-dark-nav-selected'
                      : 'text-white-nav-text dark:text-dark-nav-text'
                  } cursor-pointer`}
                  style={{ border: 'none' }}
                  onClick={() => navigate(`/${currentUser?.photoURL}/about`)}>
                  ABOUT
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FormGroup>
                  <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={darkMode} onChange={toggleTheme} />}
                  />
                </FormGroup>
              </div>
              <div onClick={logout} className="text-sm cursor-pointer">
                logout
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex h-28 items-center">
          <img src={companyLogo} alt="회사로고" className="rounded-full w-24 h-24 mr-5" />
          <div className="grid grid-rows-2 w-full">
            <div
              className="flex justify-between w-full items-end pb-2"
              style={{
                borderBottom: !darkMode ? '1px solid #00000080' : '1px solid #FFFFFF80',
              }}>
              <div className="font-black text-lg">{companyName}</div>
              <div onClick={logout} className="text-sm cursor-pointer">
                logout
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    // user가 직원일시
    return (
      <div
        className="flex pb-3 text-xs justify-between text-white-nav-text dark:text-dark-nav-text"
        style={{
          borderBottom: !darkMode ? '1px solid #00000080' : '1px solid #FFFFFF80',
        }}>
        <div>
          {location.pathname.includes('companymain')
            ? 'HOME'
            : location.pathname.includes('calendar')
            ? 'CALENDAR'
            : location.pathname.includes('camera')
            ? 'CAMERA'
            : location.pathname.includes('appguide')
            ? 'GUIDE'
            : location.pathname.includes('outjobcheck')
            ? 'OUTJOB'
            : 'MENU'}
        </div>

        <ReplayIcon onClick={refreshPage} sx={{ fontSize: '15px' }} data-tour="step-43" />

        <div className="cursor-pointer" onClick={toggleDrawer(true)} data-tour="step-31">
          MENU
        </div>

        <SwipeableDrawer anchor="right" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
            }}>
            <div className="flex flex-col justify-center items-center gap-3">
              <img src={companyLogo} alt="회사로고" className="rounded-full w-10 h-10" />
              <Typography variant="h6" component="div">
                {currentUser?.displayName}
              </Typography>
            </div>
            <div className="flex gap-5 mb-3">
              {subMenuItems.map((item, index) => (
                <div key={item.title} onClick={item.handle} className="text-sm font-noto">
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-slate-500"></div>
            <List data-tour="step-50">
              {menuItems.map((item, index) => (
                <ListItem button key={item.title} onClick={item.handle}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </SwipeableDrawer>
      </div>
    );
  }
};

export default MenuBar;
