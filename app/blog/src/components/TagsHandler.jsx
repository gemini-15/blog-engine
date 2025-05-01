import axios from "axios";
import React, { useEffect, useState } from "react";

function createInitialTags() {
    const initialTags = []
    initialTags.push("item 1")
    return initialTags
}

const TagsHandler = () => {
    const [tags, setTags] = useState(createInitialTags);
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
                <span class="bg-gray-800 text-gray-200 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-700">{item}</span>
            ))}
        </div>
    )
};

export default TagsHandler;