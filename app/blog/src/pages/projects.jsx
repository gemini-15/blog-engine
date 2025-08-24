import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {
            document.title = "gr1m0ire.xyz | Who's behind this awesomeness 🤙"; 
        }

        changeTitle();
    }); 

    return(
        <div className="grid grid-cols-1 min-h-screen w-full mb-40 pt-32 flex-grow bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex">
                <h1 className="text-black dark:text-gray-100 pl-5 sm:pl-40 font-extrabold text-2xl underline decoration-indigo-500 hover:decoration-indigo-800">
                    Minutes and notes taking 
                </h1>

            </div>
            <div className="text-black dark:text-gray-100 pl-5 sm:pl-40 pr-5 sm:pr-40">
                    These are some notes that I've taken while discovering some projects. It contains mostly tips and tricks that I've added on github repos. 
                    If it can help someone... We never know ! 
                    <ProjectCard projectUrl="https://api.github.com/repos/gemini-15/binary-analysis-hardcore-learning" />
                    <ProjectCard projectUrl="https://api.github.com/repos/gemini-15/pentest-hardcore-learning" />

            </div>
            <div className="text-black dark:text-gray-100 pl-5 sm:pl-40 pr-5 sm:pr-40">
                    The source code of this blog can be found here : 
                    <ProjectCard projectUrl="https://api.github.com/repos/gemini-15/blog-engine" />

            </div>
        </div>
    )
};
