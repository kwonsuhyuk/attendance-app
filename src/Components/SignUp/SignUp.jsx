import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [isIdValid, setIdValid] = useState(false);
  const navigate = useNavigate();

  const handleValidation = async () => {
    const userData = {
      account: id,
    };
    await fetch('http://43.201.197.131:8080/user/validation', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            setIdValid(true);
          } else {
            alert(data.message);
            setIdValid(false);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSignup = async () => {
    const userData = {
      account: id,
      password: password,
      name: name,
    };
    await fetch('http://43.201.197.131:8080/user/signup', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 201) {
            alert(data.message);
            navigate('/');
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='signUpForm'>
      <p className='pagetitle'>회원가입</p>
      <div className='signupContainer'>
        <div className='inputs'>
          <p>
            ID
            <input
              type='text'
              className='inputSignUp'
              onChange={(event) => setId(event.target.value)}
            />
          </p>
          {id === '' || id.length >= 8 ? (
            <></>
          ) : (
            <div className='warning'>ID는 8자 이상이어야 합니다.</div>
          )}
          <p>
            비밀번호
            <input
              type='password'
              className='inputSignUp'
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>
          {password === '' ||
          (password.length >= 8 && password.length <= 16) ? (
            <></>
          ) : (
            <div className='warning'>비밀번호는 8자~16자이어야 합니다.</div>
          )}
          <p>
            비밀번호 확인
            <input
              type='password'
              className='inputSignUp'
              onChange={(event) => setPassword2(event.target.value)}
            />
          </p>
          {password !== '' && password === password2 ? (
            <></>
          ) : (
            password !== '' &&
            password2 !== '' && (
              <div className='warning'>비밀번호가 일치하지 않습니다</div>
            )
          )}
          <p>
            이름
            <input
              type='text'
              className='inputSignUp'
              onChange={(event) => setName(event.target.value)}
            />
          </p>
        </div>
        <br />
        <br />
        <button className='valBt' onClick={handleValidation}>
          중복확인
        </button>
      </div>
      <button
        type='button'
        className='signUpBt2'
        onClick={handleSignup}
        disabled={!isIdValid}
      >
        회원가입
      </button>
    </div>
  );
}

export default SignUp;
