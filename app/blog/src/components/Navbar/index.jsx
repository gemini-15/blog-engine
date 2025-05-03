import React, {useState} from 'react';
import { NavLink as Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


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
	<nav className="bg-primary flex sticky h-20 top-0 z-50 justify-center space-x-4 backdrop-blur w-full border-b border-gray-800">
		<div className="mt-5 p-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-secondary text-md pr-10">
						<Link to={"/"}>
						gr1m0ire.xyz
						</Link>
		</div>

		{/* Desktop navigation */}
		<div className= "md:flex md:w-auto">
				<ul className='flex justify-center mt-5 rounded-lg sm:flex-row space-x-8 sm:mt-0 border-0 dark:border-gray-700'>
					{navLinks.map((nav, index) => (
					<li key={nav.name}
						className="pt-4">
							<Link className="sm:block hover:rounded-md sm:p-1 text-secondary hover:shadow-secondaryone border-secondary 
							  hover:text-secondary hover:bg-gray-800 duration-300 opacity-70 hover:opacity-90" to={`${nav.link}`}>{nav.name}</Link>
						</li>
					))}

				</ul>
		</div>

		{/* Mobile navigation */}
		<div onClick={handleNav} className='fixed sm:hidden top-0 right-0 pr-3 pt-3'>
			{nav ? <AiOutlineClose className='text-secondary' size={20} /> : <AiOutlineMenu className='text-secondary' size={20} />}
		</div>

		{/* Mobile navigation Menu*/}
		<ul
			className={
			nav
				? 'fixed right-0 top-0  border-secondary ease-in-out duration-500 pr-3 pl-3 mt-10 w-full'
				: 'ease-in-out duration-500 fixed right-0 hidden'
			}
      	>

        	{/* Mobile Navigation Items */}
			{navLinks.map(nav => (
			<li
				key={nav.name}
				className='p-4 duration-300 border-[1px] m-[1px] border-gray-800 hover:text-black bg-primary'
			>
				<Link onClick={handleNav} className="sm:block hover:rounded sm:p-1 text-secondary hover:shadow-secondaryone border-secondary 
					hover:text-secondary duration-300 opacity-70 p-3 hover:opacity-90" to={`${nav.link}`}>{nav.name}</Link>
			</li>
			))}
      </ul>
	</nav>)
};

export default Navbar;