import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import ArticleCont from "../articleContainer";

/**
 * Component that list the articles present on the database 
 * 
 */

function ArticlesListing() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    let url_article_listing = process.env.REACT_APP_API_URL + 'articles';
    console.log(url_article_listing)

    useEffect(() => {
        const fetchListArticles = async () => {
            try {
                const response = await axios.get(url_article_listing);
                setArticles(response.data);
            }
            catch (error) {
                 console.error(error); // TODO: must be changed to something better
            }
            setLoading(false); 
        };
        fetchListArticles();
    }, []);


    console.log(articles)
    return (
        <div>
            {loading &&  <div></div>}
            {!loading && (
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3'>
                {articles.map(item => (
                <div className="w-full h-96">
                    <Link to={`articles/${item.uuid_article}`}>
                        <ArticleCont 
                            imageSrc={item.image_cont}
                            title={item.title}
                            description={item.chunk_content}
                            dateArticle={new Date(item.pub_date).toDateString()}
                            readTime={item.read_time}
                        />
                    </Link>
                </div>
                ))}
            </div>
            )}
        </div>
    )
}

export default ArticlesListing;