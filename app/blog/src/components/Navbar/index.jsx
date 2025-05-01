import React, {useState} from 'react';
import { NavLink as Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const navLinks = [
	{
		name: "Articles",
		link: "/",
	},
	{
		name: "Notes",
		link: "/notes", 
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
	<nav className="flex fixed backdrop-blur w-full z-10 top-0 left-0 border-b border-gray-800">
		<div className="flex ml-4 mx-auto min-h-[5vh] p-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-secondary text-md pr-10 mt-3">
						<Link to={"/"}>
						gr1m0ire.xyz
						</Link>
		</div>

		{/* Desktop navigation */}
		<div className= "hidden md:flex sm:flex-row sm:gap-4 gap-4 sm:w-auto right-0 w-full sm:min-h-[5vh] min-h-[5vh] sm:block md:w-auto">
				<ul className='flex m-2 p-0 mt-5 rounded-lg sm:flex-row space-x-8 sm:mt-0 border-0 dark:border-gray-700 pr-10'>
					{navLinks.map((nav, index) => (
					<li key={nav.name}
						className="pt-3">
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
				? 'fixed right-0 top-0 h-full border-secondary ease-in-out duration-500 pr-3 pl-3 mt-10 w-full'
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