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
            {tags.map(item => (
                <span className="bg-secondary text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-gray-700">{item}</span>
            ))}
        </div>
    )
};

export default TagsHandler;