import React, { useEffect, useState } from "react";

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
                Github repo : <a href="https://github.com/gemini-15">https://github.com/gemini-15</a>
            </div>
            <div className="flex">
                <h1 className="text-white pl-5 sm:pl-40 pt-20 font-extrabold text-2xl underline decoration-indigo-500 hover:decoration-indigo-800">Whoami [Solely written with chatGPT]</h1>
            </div>
            <div className="text-gray-500 pl-5 pr-5 sm:pl-40 sm:pr-40">
            Hi, my name's Yass, your friendly neighborhood cybersecurity player, and a whole lot more! 🤓<br />

            Born with a keyboard in one hand and a curious mind in the other, I've been riding the digital waves since I can remember. You can call me a true-blue internet explorer, both in terms of code and culture.<br />
            <span>🔒 Cybersecurity Connoisseur 🖥️</span> <br />

            First things first, I'm the guy you want on your side when it comes to locking down those ones and zeros. I've spent more time than I'd like to admit in the battle against cyber threats. From defending networks to poking holes in them (with permission, of course), I'm all about making the digital world a safer place. Hackers, take your best shot! 💻🛡️ <br />
            
            <span>🧠 Forever a Knowledge Junkie 📚</span><br />

            But hey, my love for tech doesn't stop at firewalls and encryption keys. I'm a certified knowledge junkie, diving into all kinds of subjects. From AI to astrophysics, there's always something new to learn. After all, curiosity never killed this cat!   <br />
            
            🏄‍♂️ Surfing: Where Gravity and I Have a Love-Hate Relationship 🌊<br />
            When I'm not at the keyboard, you'll find me attempting to master the art of surfing. I'm not exactly carving epic turns like a pro – more like carving a path to the sand. But hey, the ocean's my happy place, even when I'm belly flopping into it. Catching waves and catching some serene moments, that's the name of my game. 🤙<br />
            </div>
        </div>
    )
}