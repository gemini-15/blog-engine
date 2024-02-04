import React, { useEffect, useState } from "react";
import BodyCore from "../components/Body";
import axios from "axios";


const Articles = () => {
    const [tags, setTags] = useState([]);



    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {

            document.title = "Ayzminy | Home";
        }

        changeTitle();

        const fetchTags = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}tags`);
                setTags(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (tags.length == 0) {
            fetchTags();
        }
    }, [tags]); 

    console.log(tags)
    return(
        <div className="pr-5 pl-5 pt-32 sm:pr-40 sm:pl-40">
            <div className="pb-5 hidden sm:block">
                {tags.map(item => (
                    <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">{item}</span>
                ))}

            </div>
            <BodyCore />
        </div>
    )
};
export default Articles;