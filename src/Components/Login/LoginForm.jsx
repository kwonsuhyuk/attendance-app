import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../RecoilState';
import { GoPerson } from 'react-icons/go';
import { FaKey } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [failMsg, setFailMsg] = useState(false);
  const [user_id, setUser_id] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const userData = {
      account: id,
      password: password,
    };
    await fetch('http://43.201.197.131:8080/user/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setUser_id(data.user_id);
            alert(data.message);
          } else {
            setFailMsg(true);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  function tosignup() {
    navigate('/signup');
  }

  return (
    <div className='LoginForm'>
      <p className='pagetitle'>로그인</p>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <GoPerson size='25' style={{ position: 'absolute', left: '-30px' }} />
        <input
          className='inputLogin'
          type='text'
          name='username'
          placeholder='ID'
          onChange={(event) => setId(event.target.value)}
        />
      </div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <FaKey size='25' style={{ position: 'absolute', left: '-30px' }} />
        <input
          className='inputLogin'
          type='password'
          name='pwd'
          placeholder='비밀번호'
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {failMsg ? (
        <p className='warning'>아이디 또는 비밀번호를 확인하세요.</p>
      ) : (
        <p></p>
      )}
      <br />
      <button className='loginBt' onClick={handleLogin}>
        로그인
      </button>
      <button className='signUpBt' onClick={tosignup}>
        회원가입
      </button>
    </div>
  );
};

export default LoginForm;
