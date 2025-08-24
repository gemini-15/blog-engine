import React from 'react';

const ArticleCont = ({ imageSrc, title, dateArticle, description, readTime }) => {
  return (
      <div className='transition-colors duration-300 hover:border-2 border-spacing-0 border-secondary dark:border-gray-500 p-1 rounded-lg bg-secondary dark:bg-gray-700 hover:shadow-lg'>
        <div className='h-48 sm:h-52 md:h-56 overflow-hidden shadow rounded-lg'>
        <img src={imageSrc} alt={title} className='w-full h-full object-cover hover:scale-125 ease-in duration-300'/>
        </div>
      <div className='flex flex-col h-full mt-4 text-white dark:text-gray-100 break-words p-2'>
        <h2 className="font-extrabold underline underline-offset-1 h-16 uppercase text-sm sm:text-base">{title}</h2>
        <p className='text-xs h-16 line-clamp-3'>{description}</p>
        <div className="grid grid-cols-2 gap-2 mt-auto pt-2 sm:pt-4">
            <span className="text-xs text-left">Read time: {readTime} </span>
            <span className="text-xs text-right">Published: {dateArticle}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCont;
