import React, {useState} from 'react';
import { NavLink as Link } from 'react-router-dom';


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

	return (
	<nav className="fixed backdrop-blur w-full z-10 top-0 left-0 border-b border-gray-800">
		<div class="flex sm:flex-row items-center justify-center mx-auto w-full sm:min-h-[5vh] min-h-[5vh]">
			<div className= "sm:gap-4 gap-4 sm:block sm:w-auto items-center justify-center" id="navbar-default">
				<ul className='flex m-2 p-0 mt-3 rounded-lg sm:flex-row space-x-8 sm:mt-0 border-0 dark:border-gray-700'>
					<li className="p-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-secondary text-md">
						<Link to={"/"}>
						Ayzminy.blog
						</Link>
					</li>
					{navLinks.map((nav, index) => (
					<li key={nav.name}
						className="p-3">
							<Link className="sm:block hover:rounded-md sm:p-1 text-secondary hover:shadow-secondaryone border-secondary 
							  hover:text-secondary hover:bg-gray-800 duration-300 opacity-70 p-3 hover:opacity-90 " to={`${nav.link}`}>{nav.name}</Link>
						</li>
					))}

				</ul>
			</div>
		</div>
	</nav>
	)
};

export default Navbar;