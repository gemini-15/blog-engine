import React, { useEffect, useState } from "react";
import BodyCore from "../components/Body";
import TagsHandler from "../components/TagsHandler";

const Articles = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {

            document.title = "gr1m0ire.xyz | Home";
        }

        changeTitle();
    }); 

    const handleTagsChange = (newTags) => {
        setSelectedTags(newTags);
    };

    return(
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-20 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <TagsHandler 
                onTagsChange={handleTagsChange}
                selectedTags={selectedTags}
            />
            <BodyCore selectedTags={selectedTags} />
        </div>
    )
};
export default Articles;