import React, { useEffect } from "react";

export default function Projects() {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {
            document.title = "Ayzminy | Who's behind this awesomeness 🤙"; 
        }

        changeTitle();
    }); 

    return(
        <div className="grid grid-cols-1  w-full mb-40 pt-32">
            <div className="flex">
                <h1 className="text-white pl-5 sm:pl-40 pt-20 font-extrabold text-2xl underline decoration-indigo-500 hover:decoration-indigo-800">
                    Current projects
                </h1>
            </div>
        </div>
    )
};
