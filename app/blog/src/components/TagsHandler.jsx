import axios from "axios";
import React, { useEffect, useState } from "react";

const TagsHandler = () => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}tags`);
                setTags(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
    
        if (tags.length == 0){
            fetchTags();
        }
    }, [tags]);

    return (
        <div className="pb-5 hidden sm:block">
            {tags.map((item, index) => (
                <span key={index} className="bg-secondary dark:bg-gray-700 text-white dark:text-gray-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-600 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                    {item}
                </span>
            ))}
        </div>
    )
};

export default TagsHandler;