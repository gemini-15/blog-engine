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
	<nav className="bg-primary flex sticky h-auto top-0 z-50 justify-center space-x-4 backdrop-blur w-full border-b border-gray-800 text-lg">
		{/* <div className="mt-5 p-0 bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-secondary text-md pr-10">
						<Link to={"/"}>
						gr1m0ire.xyz
						</Link>
		</div> */}

		{/* Desktop navigation */}
		<div className= "md:flex md:w-auto">
				<ul className='flex justify-center rounded-lg sm:flex-row space-x-8 sm:mt-0 pt-4 pb-4'>
					<li className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-secondary text-md pr-10">
						<Link to={"/"}>
						gr1m0ire.xyz
						</Link>
					</li>
					{navLinks.map((nav, index) => (
					<li key={nav.name}
						className="">
							<Link className="sm:block pr-2 pl-2 border text-md border-secondary rounded sm:p-1 text-secondary
							   bg-primary duration-300 hover:opacity-90" to={`${nav.link}`}>  {nav.name}  </Link>
						</li>
					))}

				</ul>
		</div>

		{/* Mobile navigation */}
		{/* <div onClick={handleNav} className='fixed sm:hidden top-0 right-0 pr-3 pt-3'>
			{nav ? <AiOutlineClose className='text-secondary' size={20} /> : <AiOutlineMenu className='text-secondary' size={20} />}
		</div> */}

		{/* Mobile navigation Menu*/}
		{/* <ul
			className={
			nav
				? 'fixed right-0 top-0  border-secondary ease-in-out duration-500 pr-3 pl-3 mt-10 w-full'
				: 'ease-in-out duration-500 fixed right-0 hidden'
			}
      	>

        	{/* Mobile Navigation Items */}
			{/* {navLinks.map(nav => (
			<li
				key={nav.name}
				className='p-4 duration-300 border-[1px] m-[1px] border-gray-800 hover:text-white bg-secondary'
			>
				<Link onClick={handleNav} className="sm:block hover:rounded sm:p-1 text-white hover:shadow-amber-50 border-secondary 
					hover:text-secondary duration-300 opacity-70 p-3 hover:opacity-90" to={`${nav.link}`}>{nav.name}</Link>
			</li>
			))} 
      </ul> */}
	</nav>)
};

export default Navbar;