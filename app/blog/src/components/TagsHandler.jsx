import axios from "axios";
import React, { useEffect, useState } from "react";

const TagsHandler = ({ onTagsChange, selectedTags = [] }) => {
    const [tags, setTags] = useState([]);

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

    const handleTagClick = (tag) => {
        if (onTagsChange) {
            const newSelectedTags = selectedTags.includes(tag)
                ? selectedTags.filter(t => t !== tag)
                : [...selectedTags, tag];
            onTagsChange(newSelectedTags);
        }
    };

    return (
        <div className="pb-5">
            <div className="flex flex-wrap gap-2">
                {tags.map((item, index) => (
                    <span 
                        key={index} 
                        className={`text-xs font-medium px-2.5 py-1 rounded border transition-colors duration-200 cursor-pointer ${
                            selectedTags.includes(item)
                                ? "bg-primary text-white border-primary"
                                : "bg-secondary dark:bg-gray-700 text-white dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-600 dark:hover:bg-gray-600"
                        }`}
                        onClick={() => handleTagClick(item)}
                    >
                        {item}
                    </span>
                ))}
                {selectedTags.length > 0 && (
                    <button
                        onClick={() => onTagsChange([])}
                        className="text-xs font-medium px-2.5 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    )
};

export default TagsHandler;