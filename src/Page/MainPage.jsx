import { getAuth, signOut } from 'firebase/auth';
import '../firebase';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

function MainPage() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(getAuth());
    navigate('/');
  };

  const scan = async () => {
    navigate('/camera');
  };

  return (
    <div>
      <div>main</div>
      <button onClick={logout}>logout</button>
      <FaCamera onClick={scan} />
    </div>
  );
}

export default MainPage;
