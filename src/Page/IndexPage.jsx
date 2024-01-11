import { useNavigate } from 'react-router-dom';

function IndexPage() {
  const navigate = useNavigate();
  return (
    <div className='bg-black text-white text-center h-full'>
      <div className='text-5xl pt-[66px] '>
        <span className='font-bold'>Welcome</span>
        <span className='font-thin'> to</span>
        <div className='font-bold'>Attd-app</div>
      </div>
      <div className='flex absolute w-[300vw] h-[300vw] left-1/2 -translate-x-1/2 justify-center'>
        <div className=' bg-white rounded-full w-full h-full flex flex-col items-center justify-center'>
          <div className='pb-[25px]'>
            <button
              className='w-[300px] h-[50px] text-sm bg-white rounded-[30px] text-black'
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>
          <div>
            <button
              className='w-[300px] h-[50px] text-sm bg-white rounded-[30px] text-black'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
