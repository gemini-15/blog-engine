import React from 'react';

const ArticleCont = ({ imageSrc, title, dateArticle, description, readTime }) => {
  return (
      <div className='transition-colors duration-300 hover:border-2 border-spacing-0 border-secondary dark:border-gray-500 p-1 rounded-lg bg-secondary dark:bg-gray-700 hover:shadow-lg'>
        <div className='h-[200px] overflow-hidden shadow rounded-lg'>
        <img src={imageSrc} alt={title} className='aspect-3/2 object-cover hover:scale-125  ease-in duration-300'/>
        </div>
      <div className=' flex-col h-full mt-4 text-white dark:text-gray-100 break-all'>
        <h2 className="font-extrabold underline underline-offset-1 h-16 uppercase">{title}</h2>
        <p className='text-xs h-16'>{description}</p>
        <div className="grid grid-cols-2 sm:pt-10 pt-3">
            <span className="text-xs text-left">Read time: {readTime} </span>
            <span className="text-xs text-right">Published: {dateArticle}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCont;
