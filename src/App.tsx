import React, { useEffect } from 'react';
import logo from './logo.svg';
import '@/App.css';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@redux/slices/user.slice';
import { logoutUser } from './controllers/auth.controller';
import { useNavigate, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchUser } from './redux/thunks/user.thunk';
import { CircularProgress } from '@mui/material';
import NavBar from '@components/navbar';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth/login')
  }

  return (
    <div className="bg-[#FFFBFF]">
      <div className="bg-[#805600]/10 min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className='flex flex-row gap-10 justify-center flex-wrap w-[60vw]'>
            <div className='w-56 p-5 border border-[#817567] rounded-2xl shadow-md'>
              <h1 className="text-4xl font-bold">Examme</h1>
              <hr className='border border-[#817567] my-3' />
              <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </div>
            <div className='w-56 p-5'>
              <h1 className="text-4xl font-bold">Examme</h1>
              <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </div>
            <div className='w-56 p-5'>
              <h1 className="text-4xl font-bold">Examme</h1>
              <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </div>
            <div className='w-56 p-5'>
              <h1 className="text-4xl font-bold ">Examme</h1>
              <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
