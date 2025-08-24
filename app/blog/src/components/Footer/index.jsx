import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaBluesky } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-secondary dark:bg-gray-800 p-4 sm:p-8 bottom-0 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
                <div className="text-xs font-thin text-center text-primary dark:text-gray-300 order-2 sm:order-1">
                You already know what year we are, why bother putting it here? <br /> (I hope you do!)
                </div>
                <div className="flex space-x-6 justify-center order-1 sm:order-2">
                    <a href="https://github.com/gemini-15" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"><FaGithub className="text-primary dark:text-gray-300" size={36}/></a>
                    <a href="https://www.linkedin.com/in/yass-99637a105/" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"><FaLinkedin className="text-primary dark:text-gray-300" size={36}/></a>
                    <a href="https://bsky.app/profile/yassinebargach.bsky.social" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"><FaBluesky className="text-primary dark:text-gray-300" size={36}/></a>
                    <a href="https://x.com/bargachyassine" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"><FaTwitter className="text-primary dark:text-gray-300" size={36}/></a>
                </div>
            </div>
        </div>
    )
};

export default Footer;