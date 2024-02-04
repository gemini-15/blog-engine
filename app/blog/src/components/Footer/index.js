import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="p-8 grid grid-cols-2 gap-36">
            <div className="text-xs  font-thin text-center">
            You already know which year we are, why bother putting it here? <br /> (I hope you do!)
            </div>
            <div className="flex space-x-6">
                <a href="https://github.com/gemini-15"><FaGithub className="text-primary" size={36}/></a>
                <a href="https://www.linkedin.com/in/yass-99637a105/"><FaLinkedin className="text-primary" size={36}/></a>
            </div>
        </div>
    )
};

export default Footer;