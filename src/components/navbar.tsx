import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@redux/slices/user.slice';
import { IconButton } from '@mui/material';
import { logoutUser } from '@/controllers/auth.controller';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function NavBar() {
	const user = useSelector(selectUser)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/auth/login')
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" className="bg-[#946300]">
				<Toolbar>
					<Link to='/' className="flex gap-3 flex-grow items-center">
						<QuizIcon />
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Examme
						</Typography>
					</Link>
					<p className="text-white text-sm mr-10">Hola, <span className='text-lg font-semibold'>{user.userInfo.name}</span></p>
					<Button 
						onClick={handleLogout}
						className='bg-[#4F6441] hover:bg-[#596d4c] active:bg-[#4F6441] font-semibold text-white hidden sm:block py-2 rounded-xl mr-2'
						variant='contained'>
							Logout
					</Button>
					<IconButton
						onClick={handleLogout}
						className='bg-[#4F6441] hover:bg-[#596d4c] active:bg-[#4F6441] flex sm:hidden font-semibold text-white'
						size="large"
						aria-label="logout"
						sx={{ mr: 2 }}
					>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}