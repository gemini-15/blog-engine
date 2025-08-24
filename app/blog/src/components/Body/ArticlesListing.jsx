import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import ArticleCont from "../articleContainer";

/**
 * Component that list the articles present on the database 
 * 
 */
function initialArticleListing() {
    const initialArticle = []
    initialArticle.push("item 1")
    return initialArticle
}

function ArticlesListing({ selectedTags = [] }) {
    const [articles, setArticles] = useState(initialArticleListing);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    let url_article_listing = process.env.REACT_APP_API_URL + 'articles';
    let url_tags_filter = process.env.REACT_APP_API_URL + 'tags';

    useEffect(() => {
        const fetchListArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                let response;
                if (selectedTags.length > 0) {
                    // Fetch articles filtered by tags
                    response = await axios.post(url_tags_filter, {
                        tags: selectedTags
                    });
                } else {
                    // Fetch all articles
                    response = await axios.get(url_article_listing);
                }
                setArticles(response.data);
            }
            catch (error) {
                 console.error(error);
                 setError('Failed to fetch articles. Something went awfully wrong.');
                 setArticles([]);
            }
            setLoading(false); 
        };
        fetchListArticles();
    }, [selectedTags, url_article_listing, url_tags_filter]);

    console.log(articles)
    return (
        <div>
            {loading &&  <div></div>}
            {!loading && (
            <div>
                {error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded border border-red-300 dark:border-red-700">
                        {error}
                    </div>
                )}
                {selectedTags.length > 0 && (
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing articles for tags: {selectedTags.join(', ')}
                    </div>
                )}
                {articles.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        {selectedTags.length > 0 
                            ? "No articles found for the selected tags."
                            : "No articles available."
                        }
                    </div>
                ) : (
                    <div className='grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-12'>
                        {articles.map((item, index) => (
                        <div key={index}>
                            <Link to={`articles/${item.file_name}`}>
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
            )}
        </div>
    )
}

export default ArticlesListing;