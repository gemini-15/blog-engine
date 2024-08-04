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
		<button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
			<span class="sr-only">Open main menu</span>
			<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
			</svg>
    	</button>

		<div className= "flex sm:flex-row sm:gap-4 gap-4 sm:w-auto items-center justify-center mx-auto w-full sm:min-h-[5vh] min-h-[5vh] sm:block md:w-auto" id="navbar-default">
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
							  hover:text-secondary hover:bg-gray-800 duration-300 opacity-70 p-3 hover:opacity-90" to={`${nav.link}`}>{nav.name}</Link>
						</li>
					))}

				</ul>
		</div>
	</nav>)
};

export default Navbar;