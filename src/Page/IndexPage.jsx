import { useNavigate } from 'react-router-dom';

function IndexPage() {
  const navigate = useNavigate();
  return (
    <div className='bg-black text-white text-center h-[100vh] w-full overflow-hidden flex flex-col justify-between'>
      <div className='text-5xl pt-[66px] z-10'>
        <span className='font-bold'>Welcome</span>
        <span className='font-thin'> to</span>
        <div className='font-bold'>Attd-app</div>
      </div>
      <div
        className='absolute rounded-full bg-gradient-to-b from-[#311B37] to-[#FFFFFF] w-[40vw] h-[40vw] left-1/2 -translate-x-1/2 top-[53%] z-50'
        style={{ border: 'solid 1px #FFFFFF80' }}
      ></div>
      <div className='flex justify-center relative overflow-hidden h-[38%]'>
        <div className='mt-[35%] z-50 flex flex-col gap-6'>
          <button
            className='w-[300px] h-[50px] text-sm bg-white rounded-full border-2 shadow-lg border-gray-400 text-black'
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
          <button
            className='w-[300px] h-[50px] text-sm bg-white rounded-full border-2 shadow-lg border-gray-400 text-black'
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
        <div className='absolute w-[300vw] h-[300vw] left-1/2 -translate-x-1/2 bg-white rounded-full flex flex-col items-center justify-center z-10' />
      </div>
      <div
        className='absolute w-[120vw] h-[120vw] -left-[40%] -top-[15%] rounded-full'
        style={{
          background: 'radial-gradient(#1A3044, #000000)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className='absolute w-[200vw] h-[200vw] left-[25%] top-[13%] rounded-full'
        style={{
          background: 'radial-gradient(#311B37, #000000)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
}

export default IndexPage;
