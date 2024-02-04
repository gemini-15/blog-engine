import React from 'react';



const ArticleCont = ({ imageSrc, title, dateArticle, description, readTime }) => {
  return (
    <div className='mx-auto p-auto h-52'>
      <div className='group transition-colors duration-1000 w-full h-full hover:border-2 border-spacing-0 border-secondary  p-1 rounded-lg bg-gray-800 opacity-70 hover:opacity-80'>
        <div className='h-[200px] overflow-hidden shadow rounded-lg'>
        <img src={imageSrc} alt={title} className='w-full rounded-lg object-contain scale-100 hover:scale-125  ease-in duration-300'/>
        </div>
      <div className='flex flex-col h-full mt-4 text-white break-all'>
        <h2 className="font-extrabold underline underline-offset-1 h-16">{title}</h2>
        <p className='text-xs h-16'>{description}</p>
      <div className='sm:pt-10 pt-3'>
        <div className="grid grid-cols-2">
            <span class="text-xs text-left">Read time: {readTime} </span>
            <span class="text-xs text-right">Published: {dateArticle}</span>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ArticleCont;
