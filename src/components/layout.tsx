import NavBar from './navbar';

const Layout = ( {children}: {children: React.ReactElement | string} ) => {
	return (
		<div className="bg-[#FFFBFF]">
			<div className="bg-[#805600]/10 min-h-screen">
				<NavBar />
				{children}
			</div>
		</div>
	);
};

export default Layout;