import React, {useState} from 'react';
import { NavLink as Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import DarkModeToggle from '../DarkModeToggle';
import Logo from '../../logo_gr1.svg';


const navLinks = [
	{
		name: "Articles",
		link: "/",
	},
	{
		name: "Whoami", 
		link: "/whoami",
	}
]



const Navbar = () => {
	// State that manages the navbar's display
	const [nav, setNav] = useState(false);

	// Toggle function to handle the navbar state
	const handleNav = () => {
		setNav(!nav)
	}

	return (
	<nav className="bg-white dark:bg-primary flex sticky h-auto top-0 z-50 justify-between items-center backdrop-blur w-full border-b border-gray-300 dark:border-gray-600 text-lg transition-colors duration-300 px-6">
		{/* Logo/Brand */}
		<div className="flex items-center">
			<Link to={"/"} className="flex items-center">
				<img src={Logo} alt="gr1m0ire.xyz" className="h-12 w-auto" />
			</Link>
		</div>

		{/* Desktop navigation */}
		<div className="hidden md:flex md:w-auto">
			<ul className='flex items-center space-x-8'>
				{navLinks.map((navLink, index) => (
				<li key={navLink.name}>
					<Link className="block px-4 py-0 border text-md border-secondary rounded text-secondary
					   bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 duration-300 hover:opacity-90 hover:bg-gray-200 dark:hover:bg-gray-600" 
					   to={`${navLink.link}`}>
						{navLink.name}
					</Link>
				</li>
				))}
				<li className="ml-4 py-0">
					<DarkModeToggle />
				</li>
			</ul>
		</div>

		{/* Mobile menu button */}
		<div onClick={handleNav} className='md:hidden flex items-center'>
			{nav ? <AiOutlineClose className='text-secondary' size={24} /> : <AiOutlineMenu className='text-secondary' size={24} />}
		</div>

		{/* Mobile navigation Menu */}
		{nav && (
			<div className='md:hidden fixed inset-0 z-40 bg-black bg-opacity-50' onClick={handleNav}>
				<div className='fixed right-0 top-0 h-full w-64 bg-white dark:bg-primary border-l border-gray-300 dark:border-gray-600 shadow-lg' onClick={(e) => e.stopPropagation()}>
					<div className='flex justify-end p-4'>
						<button onClick={handleNav} className='text-secondary hover:text-gray-600 dark:hover:text-gray-300'>
							<AiOutlineClose size={24} />
						</button>
					</div>
					<ul className='px-4 pb-4 space-y-3'>
						{navLinks.map(navLink => (
						<li key={navLink.name}>
							<Link 
								onClick={handleNav} 
								className="block w-full px-4 py-3 text-left border border-secondary rounded text-secondary
								   bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 duration-300 
								   hover:opacity-90 hover:bg-gray-200 dark:hover:bg-gray-600" 
								to={`${navLink.link}`}>
								{navLink.name}
							</Link>
						</li>
						))}
						<li className='pt-2'>
							<div className='px-4 py-2'>
								<DarkModeToggle />
							</div>
						</li>
					</ul>
				</div>
			</div>
		)}
	</nav>)
};

export default Navbar;