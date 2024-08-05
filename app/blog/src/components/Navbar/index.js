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
		<div className="flex m-2 mt-4 min-h-[5vh] p-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-secondary text-md">
						<Link to={"/"}>
						Ayzminy.blog
						</Link>
		</div>

		{/* Desktop navigation */}
		<div className= "hidden md:flex sm:flex-row sm:gap-4 gap-4 sm:w-auto items-center justify-center mx-auto w-full sm:min-h-[5vh] min-h-[5vh] sm:block md:w-auto" id="navbar-default">
				<ul className='flex m-2 p-0 mt-3 rounded-lg sm:flex-row space-x-8 sm:mt-0 border-0 dark:border-gray-700'>
					{navLinks.map((nav, index) => (
					<li key={nav.name}
						className="p-3">
							<Link className="sm:block hover:rounded-md sm:p-1 text-secondary hover:shadow-secondaryone border-secondary 
							  hover:text-secondary hover:bg-gray-800 duration-300 opacity-70 p-3 hover:opacity-90" to={`${nav.link}`}>{nav.name}</Link>
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
				? 'fixed right-0 top-0 h-full border-secondary ease-in-out duration-500 pr-3 mt-10 w-full text-center'
				: 'ease-in-out duration-500 fixed right-0 hidden'
			}
      	>

        	{/* Mobile Navigation Items */}
			{navLinks.map(nav => (
			<li
				key={nav.name}
				className='p-4 shadow-md duration-300 hover:text-black border-gray-600 backdrop-blur'
			>
				<Link className="sm:block hover:rounded sm:p-1 text-secondary hover:shadow-secondaryone border-secondary 
					hover:text-secondaryduration-300 opacity-70 p-3 hover:opacity-90" to={`${nav.link}`}>{nav.name}</Link>
			</li>
			))}
      </ul>
	</nav>)
};

export default Navbar;