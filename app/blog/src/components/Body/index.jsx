import React from 'react'; 
import ArticlesListing from './ArticlesListing';

const BodyCore = ({ selectedTags = [] }) => {
    return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <ArticlesListing selectedTags={selectedTags} />
     </div>
    )
}

export default BodyCore;