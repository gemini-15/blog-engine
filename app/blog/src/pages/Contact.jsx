import React, { useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function Contact() {
    const [buttonText, setButtonText] = useState('Copy');
 
    const handleClick = () => {
        navigator.clipboard.writeText('yassine.bargach@protonmail.com');

        setButtonText(buttonText === 'Copy' ? 'Copied' : 'Copy');
    };
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {

            document.title = "gr1m0ire.xyz | Whoami"; 
        }
        changeTitle();
    }); 


    return(
        <div className="grid md:grid-cols-2 grid-cols-1 pl-5 pt-20 mb-44 pb-24 space-y-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            
            <div className="pt-20 sm:pl-40 text-black dark:text-gray-100 underline decoration-secondary hover:decoration-secondary">
            <div className="flex">
                    <h1 className="text-black dark:text-gray-100 pb-5 font-extrabold text-2xl underline decoration-secondary hover:decoration-secondary">Contact</h1>
            </div>
                <div>
                    email : yassine.bargach@proton.me
                    <button type="button" className="text-white bg-secondary hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-600 ml-4 transition-colors duration-200" onClick={handleClick}>
                        {buttonText}
                    </button>
                </div>
                <div>
                    Linkedin at : <a href="https://www.linkedin.com/in/yass-99637a105/" className="text-secondary dark:text-blue-400 hover:underline transition-colors duration-200">https://www.linkedin.com/in/yass-99637a105/</a>
                </div>
                <div>
                    Github repo : <a href="https://github.com/gemini-15" className="text-secondary dark:text-blue-400 hover:underline transition-colors duration-200">https://github.com/gemini-15</a>
                </div>
            </div>

            <div>
                <div className="flex">
                    <h1 className="text-black dark:text-gray-100 pb-5 sm:pl-40 pt-20 font-extrabold text-2xl underline decoration-secondary hover:decoration-secondary">Whoami?</h1>
                </div>
                <div className="text-black dark:text-gray-100 pr-5 sm:pl-40 sm:pr-40">
                Hey there curious fella 🤓! <br /><br />
                Welcome to my personal blog. I've always wanted to do one.<br />
                Better late than never! <br /> <br />
                <br />

                Wait you wanna know things about me ? Well, I'm a AI Security engineer.<br />
                I've been working in AI security for three years now, since I started working for a startup trying to secure AI inference and training.<br />

                And in cybersecurity itself a little bit more.<br />
                I'm trying to post technicals things around my findings in here to be less confused.<br />
                But it doesn't work. <br />
                Might as well be confused together !<br />
                Hope you enjoy the articles !  <br /><br /><br />

                [ PS : The code for this blog is available here : <a className="text-secondary dark:text-blue-400 hover:underline transition-colors duration-200" href="https://github.com/gemini-15/blog-engine">https://github.com/gemini-15/blog-engine</a> ]
                </div>
            </div>

        </div>
    )
}