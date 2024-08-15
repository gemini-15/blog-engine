import React, { useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function Contact() {
    const [buttonText, setButtonText] = useState('Copy');
 
    const handleClick = () => {
        navigator.clipboard.writeText('ayzminy@protonmail.com');

        setButtonText(buttonText === 'Copy' ? 'Copied' : 'Copy');
    };
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {

            document.title = "Ayzminy | Whoami"; 
        }
        changeTitle();
    }); 


    return(
        <div className=" w-full h-full pt-32 mb-44 text-center space-y-6">
            <div className="text-white underline decoration-indigo-500 hover:decoration-indigo-800">
                email : ayzminy@protonmail.com
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ml-4" onClick={handleClick}>{buttonText}</button>

            </div>
            <div className="text-white underline decoration-indigo-500 hover:decoration-indigo-800">
                Linkedin at : <a href="https://www.linkedin.com/in/yass-99637a105/">https://www.linkedin.com/in/yass-99637a105/</a>
            </div>
            <div className="text-white underline decoration-indigo-500 hover:decoration-indigo-800">
                Github repo : <a href="https://github.com/gemini-15">https://github.com/gemini-15
            </a>

            </div>

            <div className="flex">
                <h1 className="text-white pl-5 sm:pl-40 pt-20 font-extrabold text-2xl underline decoration-indigo-500 hover:decoration-indigo-800">Whoami?</h1>
            </div>
            <div className="text-gray-500 pl-5 pr-5 sm:pl-40 sm:pr-40">
            Hey wait there curious fella 🤓! Stop trying to get information about me !<br />

            I'm just an engineer that works in infosec. I'm not shitty but I'm not the best either ! <br />
            People often ask me some random questions like...<br />
            <span>🔒 Are you a Cybersecurity Connoisseur 🖥️?</span> <br />
            Yes, indeed. I am.<br />
            <span>🧠 Can you hack phones and stuff?</span><br />

            I can do better. I can steal it from you if you get close enough.<br />
            
            🏄‍♂️ How are your skills in dealing with waves ? 🌊<br />
            Stop asking hurtful questions. 🤙<br />
            </div>
        </div>
    )
}