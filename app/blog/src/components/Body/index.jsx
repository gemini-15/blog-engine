import React from 'react'; 
import ArticlesListing from './ArticlesListing';

const BodyCore = () => {
    return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <ArticlesListing />
     </div>
    )
}

export default BodyCore;