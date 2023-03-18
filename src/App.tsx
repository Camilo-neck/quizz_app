import React, { useEffect } from 'react';
import logo from './logo.svg';
import '@/App.css';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@redux/slices/user.slice';
import { logoutUser } from './controllers/auth.controller';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchUser } from './redux/thunks/user.thunk';
import { CircularProgress } from '@mui/material';
import NavBar from '@components/navbar';

const sections = [
  {
    title: 'Gestionar estudiatntes',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    image: '/students-option.jpg'
  },
  {
    title: 'Creación de preguntas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    image: '/exam-option.jpg'
  },
]

const SectionCard = ({ title, description, image }: {title: string; description: string, image: string}) => {

  return (
    <div className='w-72 flex flex-col p-5 border border-[#817567] rounded-2xl shadow-md'>
      <div className='mb-1 w-full flex justify-center items-center'>
        <img className='rounded-md' src={image} alt='students' />
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <hr className='border border-[#817567] my-3' />
      <p className="">{description}</p>
      <Link className='self-end' to='#'>
        <Button
        endIcon={<ChevronRightIcon />}
        className='mt-3 rounded-full bg-[#8D437F] hover:bg-[#8d5281] active:bg-[#8D437F] focus:outline-none focus:ring-2 focus:ring-[#8D437F] focus:ring-opacity-50'
        variant="contained">
          Ir
        </Button>
      </Link>
    </div>
  )
}

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFFBFF]">
      <div className="bg-[#805600]/10 min-h-screen">
        <NavBar />
        <div className="flex flex-col px-10 items-center justify-center w-full min-h-full gap-5 mt-5">
          <p className='text-4xl font-bold text-[#3D2E16] text-center'>Bienvenido a tu aplicación de exámenes</p>
          <p className='text-[#55442A] hidden'>¿Estás listo para poner a prueba tus conocimientos? ¡Empieza ahora!</p>
          <p className='text-[#55442A] '>Crea y gestiona tus exámenes online con facilidad y seguridad. ¡Empieza ahora!</p>
          <div className='flex flex-row gap-10 justify-center flex-wrap w-[90vw]'>
            {
              sections.map((section, index) => (
                <SectionCard key={section.title} title={section.title} 
                description={section.description} image={section.image} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
