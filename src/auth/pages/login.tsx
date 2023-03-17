import { redirect, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/controllers/auth.controller';

const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (data: any) => {
		console.log(data);
		dispatch(loginUser(data));
		// alert(`Usuario logueado correctamente\n${data.email}`)
		navigate('/');
		return redirect('/');
	};

	return (
		<div className='bg-[#FFFBFF]'>
			<section className="bg-[#805600]/10 min-h-screen flex items-center justify-center">
				{/*Login container */}
				<div className='bg-[#FFFBFF] rounded-2xl'>
				<div className='bg-[#805600]/20 md:h-auto h-[70vh] flex items-center rounded-2xl shadow-xl shadow-black/40 max-w-3xl p-5'>
					{/*Login form */}
					<div className='md:w-1/2 px-8 transition-all ease-in-out duration-300'>
						<h2 className="font-bold text-3xl text-[#635137]">Bienvenido de vuelta</h2>
						<p className='text-sm mt-4 text-zinc-600'>Si ya eras un usuario, inicia sesión fácilmente</p>

						<form className="flex flex-col md:gap-5 gap-8" onSubmit={handleSubmit(onSubmit)}>
							<TextField 
							className='bg-indigo-400/10 rounded-2xl mt-8'
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: '16px',
								},
							}}
							{...register('email', { required: true })}
							type="email" size='medium' label="Email" variant="outlined" color='secondary' 
							/>
							<TextField 
							className='bg-indigo-400/10 rounded-2xl'
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: '16px',
								},
							}}
							{...register('password', { required: true })}
							type="password" size='medium' label="Password" variant="outlined" color='secondary' 
							/>
							{/* <input type='email' placeholder='Email' className='p-2 mt-8 rounded-xl border' /> */}
							{/* <input type='password' placeholder='Password' className='p-2 rounded-xl border' /> */}
							<Button 
							type='submit'
							className='bg-[#4F6441] hover:bg-[#dd7234] active:bg-[#D96B2B] font-semibold text-white py-2 rounded-xl'>
								inicia Sesión
							</Button>
						</form>
					</div>
					{/*Login image */}
					<div className='sm:block hidden w-1/2 p-5'>
						<img className='rounded-2xl shadow-md' src="/login.jpg" alt="login" />
					</div>
				</div>
				</div>

			</section>
		</div>
	);
};

export default Login;